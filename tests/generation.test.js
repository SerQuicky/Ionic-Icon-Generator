 const path = require('path');
const fs = require('fs');
const rimraf = require("rimraf");
const sharp = require('sharp');

const main = require('../index.js');
const DIR_RESOURCE = path.resolve(__dirname, '../test_resources/');
const DIR_ANDROID_ICON = path.resolve(__dirname, '../test_resources/android/icon');
const DIR_ANDROID_SPLASH = path.resolve(__dirname, '../test_resources/android/splash');


describe('testing important functions', () => {
  test('resource folder(s) created', () => {
    expect(fs.existsSync(DIR_RESOURCE)).toBe(true);
    expect(fs.existsSync(DIR_ANDROID_ICON)).toBe(true);
    expect(fs.existsSync(DIR_ANDROID_SPLASH)).toBe(true);
  });
  
  test('sharp function works', () => {
    sharp("tests/test_logo.jpg")
    .resize(512, 512)
    .toBuffer()
    .then( data => { 
      sharp(data).toFile("test_resources/generated_test_file_512x512.png", (err, info) => {
        expect(fs.existsSync("test_resources/generated_test_file_512x512.png")).toBe(true);
        
        // Remove the test_resource folder in sync
        rimraf.sync("test_resources");
      })});
  });
});


beforeAll(() => {
  main.generateDirectories("test_resources");
});