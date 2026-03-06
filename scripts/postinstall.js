/**
 * Create missing codegen paths so Android build does not fail.
 * Some packages have codegenConfig.jsSrcsDir pointing to paths not included in the published npm package.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'node_modules');

const dirs = [
  'react-native-gesture-handler/src/specs',
  'react-native-screens/src/fabric',
];

dirs.forEach(rel => {
  const dir = path.join(root, rel);
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, '.gitkeep'), '');
      console.log('Created', rel, 'for codegen.');
    }
  } catch (e) {
    console.warn('postinstall: could not create', rel, e.message);
  }
});
