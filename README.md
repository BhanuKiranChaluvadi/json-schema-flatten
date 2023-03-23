# json-schema-flatten
Simple code to flatten JSON schema


## run

```bash
git clone https://github.com/BhanuKiranChaluvadi/json-schema-flatten.git
npm install
node flatten-schema.js input-schema.json output-schema.json
```

## create an executable
```bash
# install dependent packages
npm install json-schema-ref-parser
npm install -g pkg
# Next, modify your flatten-schema.js file to include a shebang line at the beginning:
pkg -t node18-linux-x64,node18-macos-x64,node18-win-x64
./flatten-schema.js input-schema.json output-schema.json
```


## Sample node 
```bash
mkdir json-schema-flatten
cd json-schema-flatten
npm init -y
npm install json-schema-ref-parser
# inorder to add the dependency to package.json
npm install json-schema-ref-parser --save
touch flatten-schema.js
```

```js
// flatten-schema.js
const fs = require('fs');
const RefParser = require('json-schema-ref-parser');

async function flattenSchema(inputFile, outputFile) {
  try {
    const schema = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
    const flattenedSchema = await RefParser.dereference(schema);
    fs.writeFileSync(outputFile, JSON.stringify(flattenedSchema, null, 2));
    console.log(`Flattened schema saved to ${outputFile}`);
  } catch (error) {
    console.error('Error flattening schema:', error.message);
  }
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error('Usage: node flatten-schema.js <input-schema> <output-schema>');
  process.exit(1);
}

flattenSchema(inputFile, outputFile);

```


```bash
node flatten-schema.js input-schema.json output-schema.json
```