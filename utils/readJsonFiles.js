import fs from "fs";
import path from "path";
global.appRoot = path.resolve(__dirname + "/../");

// ///////////////////////////// //
// Loop over a directory and extract all JSON files
// readJsonFiles('pathToJsonFIles')
// ///////////////////////////// //

const readJsonFiles = pathName => {
  const allFiles = fs.readdirSync(`${appRoot}/${pathName}`, err => {
    if (err) {
      return console.log("🍡 Oups... " + err.message);
    }
  });
  return allFiles.map(fileName => {
    const data = JSON.parse(
      fs.readFileSync(`${appRoot}/${pathName}/${fileName}`)
    );
    return data;
  });
};

export default readJsonFiles;
