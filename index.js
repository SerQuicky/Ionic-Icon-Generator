// Library imports
// --------------------------------------------------------------
const sharp = require('sharp');
const fs = require('fs');

// Parameter inputs
// --------------------------------------------------------------
const parameters = process.argv.slice(2);
const image = parameters[0];
const type = parameters[1];
const ending = parameters[2] !== undefined ? parameters[2] : "png";
const platform = parameters[3];

// Android and Ios icon/splash sizes and names
// --------------------------------------------------------------

const androidElementsIcons = [
    {name: "drawable-hdpi-icon", width: 72, height: 72},
    {name: "drawable-ldpi-icon", width: 36, height: 36},
    {name: "drawable-mdpi-icon", width: 48, height: 48},
    {name: "drawable-xhdpi-icon", width: 96, height: 96},
    {name: "drawable-xxhdpi-icon", width: 144, height: 144},
    {name: "drawable-xxxhdpi-icon", width: 192, height: 192}
];

const androidElementsSplash = [
  {name: "drawable-land-hdpi-screen", width: 800, height: 400},
  {name: "drawable-land-ldpi-screen", width: 320, height: 240},
  {name: "drawable-land-mdpi-screen", width: 480, height: 320},
  {name: "drawable-land-xhdpi-screen", width: 1280, height: 720},
  {name: "drawable-land-xxhdpi-screen", width: 1600, height: 960},
  {name: "drawable-land-xxxhdpi-screen", width: 1900, height: 1280},
  {name: "drawable-port-hdpi-screen", width: 480, height: 800},
  {name: "drawable-port-ldpi-screen", width: 240, height: 320},
  {name: "drawable-port-mdpi-screen", width: 320, height: 480},
  {name: "drawable-port-xhdpi-screen", width: 720, height: 1280},
  {name: "drawable-port-xxhdpi-screen", width: 960, height: 1600},
  {name: "drawable-port-xxxhdpi-screen", width: 1280, height: 1920}
];

const iosElementsIcons = [
  {name: "icon", width: 57, height: 57},
  {name: "icon@2x", width: 114, height: 114},
  {name: "icon-20", width: 20, height: 20},
  {name: "icon-20@2x", width: 40, height: 40},
  {name: "icon-20@3x", width: 60, height: 60},
  {name: "icon-24@2x", width: 48, height: 48},
  {name: "icon-27.5@2x", width: 55, height: 55},
  {name: "icon-29", width: 29, height: 29},
  {name: "icon-29@2x", width: 58, height: 58},
  {name: "icon-29@3x", width: 87, height: 87},
  {name: "icon-40", width: 40, height: 40},
  {name: "icon-40@2x", width: 80, height: 80},
  {name: "icon-40@3x", width: 120, height: 120},
  {name: "icon-44@2x", width: 88, height: 88},
  {name: "icon-50", width: 50, height: 50},
  {name: "icon-50@2x", width: 100, height: 100},
  {name: "icon-60", width: 60, height: 60},
  {name: "icon-60@2x", width: 120, height: 120},
  {name: "icon-60@3x", width: 180, height: 180},
  {name: "icon-72", width: 72, height: 72},
  {name: "icon-72@2x", width: 144, height: 144},
  {name: "icon-76", width: 76, height: 76},
  {name: "icon-76@2x", width: 152, height: 152},
  {name: "icon-83.5@2x", width: 167, height: 167},
  {name: "icon-86@2x", width: 172, height: 172},
  {name: "icon-98@2x", width: 196, height: 196},
  {name: "icon-1024", width: 1024, height: 1024},
  {name: "icon-small", width: 29, height: 29},
  {name: "icon-small@2x", width: 58, height: 58},
  {name: "icon-small@3x", width: 87, height: 87}
];

const iosElementsSplash = [
  {name: "Default@2x~iphone", width: 640, height: 960},
  {name: "Default@2x~universal~anyany", width: 2732, height: 2732},
  {name: "Default~iphone", width: 320, height: 480},
  {name: "Default-568h@2x~iphone", width: 640, height: 1136},
  {name: "Default-667h", width: 750, height: 1334},
  {name: "Default-736h", width: 1242, height: 2208},
  {name: "Default-2436h", width: 1125, height: 2436},
  {name: "Default-Landscape@~ipadpro", width: 2732, height: 2048},
  {name: "Default-Landscape@2x~ipad", width: 2048, height: 1536},
  {name: "Default-Landscape~ipad", width: 1024, height: 768},
  {name: "Default-Landscape-736h", width: 2208, height: 1242},
  {name: "Default-Landscape-2436h", width: 2436, height: 1125},
  {name: "Default-Portrait@~ipadpro", width: 2048, height: 2732},
  {name: "Default-Portrait@2x~ipad", width: 1536, height: 2048},
  {name: "Default-Portrait~ipad", width: 768, height: 1024},
];


// executed functions for the generation
// --------------------------------------------------------------

if(image !== undefined && type !== undefined) {
  generateDirectories();
  evaluatePlatform(platform);
} else {
  throw "Error: The base-image or the generation-type is undefined!";
}


// ---------------------------------------------------------------------------------------------------------------------------------------


// generate the directory structure (resources/[platform]/icon&splash)
// -------------------------------------------------------------------------
function generateDirectories() {
  createDirectory('./resources');
  createDirectory('./resources/android');
  createDirectory('./resources/ios');
  createDirectory('./resources/android/icon');
  createDirectory('./resources/android/splash');
  createDirectory('./resources/ios/icon');
  createDirectory('./resources/ios/splash');
}

function createDirectory(path) {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
}

// evaluate the platform parameter and create the images
// -------------------------------------------------------------------------

function evaluatePlatform(platform) {
  switch(platform){
    case undefined:
      generateAndroidElements('./resources/android/');
      generateIOSElements('./resources/ios/');
      break;
    case "android":
      generateAndroidElements('./resources/android/');
      break;
    case "ios":
      generateIOSElements('./resources/ios/');
      break; 
    default:
        throw "Error: Unexpected platform was defined, to build both ios and android let the parameter empty!";
  }
}


// image generation
// -------------------------------------------------------------------------

function generateAndroidElements(path) {
  genericGeneration(androidElementsIcons, androidElementsSplash, path);
}

function generateIOSElements(path) {
  genericGeneration(iosElementsIcons, iosElementsSplash, path);
}

function genericGeneration(iconList, splashList, path) {
  const arry = type === "icon" ? iconList : splashList;
  path += type === "icon" ? "icon/" : "splash/";
  arry.forEach(el => generateImage(image, path, el.name, el.width, el.height, ending));
}

function generateImage(baseImage, path, name, width, height, ending){
  sharp(baseImage)
  .resize(width, height)
  .toBuffer()
  .then( data => { sharp(data).toFile(path + name + '.' + ending, (err, info) => { console.log("File generated: " + path + name + '.' + ending)})})
  .catch( err => { console.log(err) });
}
