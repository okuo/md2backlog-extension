// manifest.json のバリデーションテスト
// Chrome Web Store / Edge Add-ons Store の要件をチェック

const fs = require('fs');
const path = require('path');

// manifest.json を読み込み
const manifestPath = path.join(__dirname, '../src/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log('=== Manifest Validation Tests ===\n');

let testsPassed = 0;
let testsFailed = 0;

// テスト関数
function test(description, assertion) {
    try {
        if (assertion()) {
            console.log(`✅ ${description}`);
            testsPassed++;
        } else {
            console.log(`❌ ${description}`);
            testsFailed++;
        }
    } catch (error) {
        console.log(`❌ ${description} - Error: ${error.message}`);
        testsFailed++;
    }
}

// 1. Description フィールドの文字数チェック (上限132文字)
test('Description length <= 132 characters', () => {
    const length = manifest.description.length;
    console.log(`   Current length: ${length} characters`);
    return length <= 132;
});

// 2. Name フィールドの文字数チェック (推奨: 45文字以内)
test('Name length <= 45 characters (recommended)', () => {
    const length = manifest.name.length;
    console.log(`   Current length: ${length} characters`);
    return length <= 45;
});

// 3. Version フォーマットチェック
test('Version format is valid (X.Y.Z)', () => {
    const versionPattern = /^\d+\.\d+\.\d+$/;
    const isValid = versionPattern.test(manifest.version);
    console.log(`   Current version: ${manifest.version}`);
    return isValid;
});

// 4. Manifest version チェック
test('Manifest version is 3', () => {
    return manifest.manifest_version === 3;
});

// 5. 必須フィールドの存在チェック
test('Required fields exist', () => {
    const requiredFields = ['manifest_version', 'name', 'version', 'description'];
    const missing = requiredFields.filter(field => !manifest[field]);
    if (missing.length > 0) {
        console.log(`   Missing fields: ${missing.join(', ')}`);
        return false;
    }
    return true;
});

// 6. Icons の存在チェック
test('Icons are defined', () => {
    const requiredSizes = ['16', '32', '48', '128'];
    const missing = requiredSizes.filter(size => !manifest.icons || !manifest.icons[size]);
    if (missing.length > 0) {
        console.log(`   Missing icon sizes: ${missing.join(', ')}`);
        return false;
    }
    return true;
});

// 7. Permissions のチェック
test('Permissions are defined', () => {
    return Array.isArray(manifest.permissions) && manifest.permissions.length > 0;
});

// 8. Homepage URL の形式チェック
test('Homepage URL is valid', () => {
    if (!manifest.homepage_url) return true; // Optional field
    const urlPattern = /^https?:\/\/.+/;
    const isValid = urlPattern.test(manifest.homepage_url);
    console.log(`   Current URL: ${manifest.homepage_url}`);
    return isValid;
});

// 9. Short name の文字数チェック (推奨: 12文字以内)
test('Short name length <= 12 characters (recommended)', () => {
    if (!manifest.short_name) return true; // Optional field
    const length = manifest.short_name.length;
    console.log(`   Current length: ${length} characters`);
    return length <= 12;
});

// 10. Action (popup) の設定チェック
test('Action/Popup is configured', () => {
    return manifest.action && manifest.action.default_popup;
});

// 結果サマリー
console.log('\n=== Test Summary ===');
console.log(`Total: ${testsPassed + testsFailed}`);
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);

if (testsFailed > 0) {
    console.log('\n⚠️  Some validation tests failed. Please fix the issues before submission.');
    process.exit(1);
} else {
    console.log('\n✅ All validation tests passed!');
    process.exit(0);
}
