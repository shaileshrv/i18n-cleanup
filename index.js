const fs = require('fs');
const path = require('path');

function readJson(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        console.log('Error reading file: ' + filePath);
        return {};
    }
}

function writeJson(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function mergeUniqueKeys(json1, json2) {
    const merged = { ...json1 };
    for (const key in json2) {
        if (json2.hasOwnProperty(key)) {
            if (
                typeof json2[key] === 'object' &&
                typeof merged[key] === 'object' &&
                !Array.isArray(json2[key]) &&
                !Array.isArray(merged[key])
            ) {
                merged[key] = mergeUniqueKeys(merged[key], json2[key]);
            } else if (!merged.hasOwnProperty(key)) {
                merged[key] = json2[key];
            }
        }
    }
    return merged;
}

function removeDuplicates(json1, json2) {
    function deepEqual(obj1, obj2) {
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 === obj2;
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) return false;
        return keys1.every(key => keys2.includes(key) && deepEqual(obj1[key], obj2[key]));
    }

    function removeDuplicatesRecursive(json1, json2) {
        for (let key in json2) {
            if (json1.hasOwnProperty(key) && deepEqual(json1[key], json2[key])) {
                delete json2[key];
            } else if (
                typeof json2[key] === 'object' &&
                json2[key] !== null &&
                typeof json1[key] === 'object' &&
                json1[key] !== null
            ) {
                removeDuplicatesRecursive(json1[key], json2[key]);
            }
        }
    }

    const clone = JSON.parse(JSON.stringify(json2));
    removeDuplicatesRecursive(json1, clone);
    return clone;
}

function fileCleanup(sourcefile, targetFile) {
    const sourceJson = readJson(sourcefile);
    const targetJson = readJson(targetFile);

    const newSourceJson = mergeUniqueKeys(sourceJson, targetJson);
    writeJson(sourcefile, newSourceJson)

    const newDestJson = removeDuplicates(newSourceJson, targetJson);
    writeJson(targetFile, newDestJson)
    
    console.log('✔ File processed.');
}

function processI18nFiles(fileList) {
    for (let {sourceFile, targetFiles} of fileList) {
        if (!sourceFile || !targetFiles) {
            console.warn(`⚠️ Skipping invalid group: missing sourceFile or targetFiles`);
            return;
        }
        fileCleanup(sourceFile, targetFiles)
    }
    console.log('✔ All files processed.');
}

module.exports = {
    fileCleanup,
    processI18nFiles
};
