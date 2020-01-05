const path = require('path');
const fs = require('fs');
//var cmd = require('node-cmd');
// lösche das PACKAGE noch!!1
const main = require('../index.js');
const DIR_BASE = path.resolve(__dirname, '../resources');

const DIR_RESOURCE = path.resolve(__dirname, '../resources');
const DIR_ANDROID_ICON = path.resolve(__dirname, '../resources/android/icon/drawable--icon.png');
const DIR_IOS_ICON = path.resolve(__dirname, '../resources/icon');
const DIR_ANDROID_SPLASH = './resources/android/splash/drawable-land-hdpi-screen.png';
const DIR_IOS_SPLASH = './resources/ios/splash/Default-568h@2x~iphone.png';

test('resource folder created', () => {
  main.generateDirectories();
  expect(fs.existsSync(DIR_RESOURCE)).toBe(true);
});

test('generate android icons', () => {
  (async () => {
    await main.evaluatePlatform("test_logo.jpg", "icon", "png", "android");
  })
  expect(fs.existsSync(DIR_ANDROID_ICON)).toBe(true);
});

/* test('generate android splash', () => {
  main.evaluatePlatform("test_logo.jpg", "splash", "png", "android");
  expect(fs.existsSync(DIR_ANDROID_SPLASH)).toBe(true);
}); */

/* test('generate ios icons', () => {
  main.evaluatePlatform("test_logo.jpg", "icon", "png", "ios");
  expect(fs.existsSync(DIR_IOS_ICON)).toBe(true);
}); */

/* test('generate ios splash', () => {
  main.evaluatePlatform("test_logo.jpg", "splash", "png", "ios");
  expect(fs.existsSync(DIR_IOS_SPLASH)).toBe(true);
}); */

/* afterAll(() => {
  fs.rmdir(DIR_RESOURCE, { recursive: true }, (err, data) => {
    if(err) console.log('error', err);
  });
}); */