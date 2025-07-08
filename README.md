# i18n-cleanup

🧹 A Node.js CLI tool to remove **duplicate translation keys** from localized i18n JSON files by comparing them to a base (typically `en`) translation file. This helps maintain **clean**, **minimal**, and **efficient** locale files for global applications.

---

## 🔧 Why Use This?

When building multilingual apps, your localized files (`en_CA`, `en_GB`, etc.) often copy keys from the default locale (`en`). Over time, this leads to bloated, redundant translation files.

`i18n-cleanup` compares each locale file to the source, and **removes any key-value pairs that are exactly the same** — so your locale files only include overrides or unique content.

---

## ✨ Features

- ✅ Remove duplicate keys in localized translation files
- ✅ Deeply compare nested JSON structures
- ✅ Support for single and batch cleanup modes
- ✅ Designed for scalable i18n folder structures
- ✅ Works on Windows, macOS, and Linux
- ✅ Lightweight and zero-dependency core logic

---

## 📦 Installation

### 🔹 Global (recommended for CLI use)
```bash
npm install -g i18n-cleanup


## Examples
Single file mode:
  i18n-cleanup --source-file en/app.json --target-files en_CA/app.json

Batch mode:
  i18n-cleanup --list '[{"\"sourceFile"\": "\"file_full_path\"", "\"targetFiles"\": "\"file_full_path"\"}]'
