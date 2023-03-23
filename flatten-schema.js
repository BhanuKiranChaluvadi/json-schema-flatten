#!/usr/bin/env node
// flatten-schema-resolve-remove.js
// this resolve $ref and also remove $def in your final ouput

const fs = require('fs');
const RefParser = require('json-schema-ref-parser');

async function flattenSchema(inputFile, outputFile) {
  try {
    const schema = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
    const flattenedSchema = await RefParser.dereference(schema);

    // Remove the $defs section if it exists
    if (flattenedSchema.$defs) {
      delete flattenedSchema.$defs;
    }

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
