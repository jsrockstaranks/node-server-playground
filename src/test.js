const fs = require("fs")

try {
  const arrayOfFiles = fs.readdirSync(__dirname);
  console.log(arrayOfFiles)
} catch(e) {
  console.log(e)
}