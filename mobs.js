// <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <imgdir name="Mob.img">
//     <imgdir name="100100">
//         <string name="name" value="Snail"/>
//     </imgdir>
//     <imgdir name="100101">
//         <string name="name" value="Blue Snail"/>
//     </imgdir>
// </imgdir>
//
// Load all mob names from the Mob.img.xml file and return a map of mobId to mobName

const convert = require("xml-js");
const fs = require("fs");

function loadMobMap() {
  const mobMap = new Map();
  const xml = fs.readFileSync("./Mob.img.xml", "utf8");
  const json = convert.xml2json(xml, { compact: true, spaces: 4 });
  const obj = JSON.parse(json);
  const imgdir = obj.imgdir.imgdir;
  for (const mob of imgdir) {
    const mobId = mob._attributes.name;
    const mobName = mob.string._attributes.value;
    mobMap.set(mobId, mobName);
  }
  return mobMap;
}

exports.loadMobMap = loadMobMap;
