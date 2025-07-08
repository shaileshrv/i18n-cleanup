#!/usr/bin/env node

const {
    fileCleanup,
    processI18nFiles
} = require('./index');


// Parse CLI arguments
const args = process.argv.slice(2);
const argMap = {};
for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
        const key = args[i].replace('--', '');
        argMap[key] = args[i + 1];
        i++;
    }
}

// Entry logic
if (argMap['list']) {
    let fileGroups;
    try {
        console.log(argMap['list'])
        fileGroups = JSON.parse(argMap['list']);
    } catch (err) {
        console.error('❌ Invalid JSON passed to --list');
        process.exit(1);
    }
    processI18nFiles(fileGroups);
} else if (argMap['source-file'] && argMap['target-files']) {
    console.log(argMap['source-file'] , argMap['target-files'])
    fileCleanup(argMap['source-file'], argMap['target-files']);

} else {
    console.error(`
❌ Invalid usage.
Note: Avoid using space and special chars in paths

✅ Examples:

Single file mode:
  i18n-cleanup --source-file en/app.json --target-files en_CA/app.json

Batch mode:
  i18n-cleanup --list '[{"\"sourceFile"\": "\"file_full_path\"", "\"targetFiles"\": "\"file_full_path"\"}]'
`);
    process.exit(1);
}