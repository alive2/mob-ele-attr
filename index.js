// Read all files from mob_wz/*.xml
// File format:
// <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <imgdir name="0100100.img">
//     <imgdir name="attack1"></imgdir>
//     <imgdir name="info">
//         <int name="bodyAttack" value="1"/>
//         <int name="level" value="1"/>
//         <string name="elemAttr" value="F2I3S1"/>
//         <int name="maxHP" value="8"/>
//         <int name="maxMP" value="0"/>
//         <int name="speed" value="-65"/>
//         <int name="PADamage" value="12"/>
//         <int name="PDDamage" value="0"/>
//         <int name="MADamage" value="0"/>
//         <int name="MDDamage" value="0"/>
//         <int name="acc" value="20"/>
//         <int name="eva" value="0"/>
//         <int name="exp" value="3"/>
//         <int name="undead" value="0"/>
//         <int name="pushed" value="1"/>
//         <float name="fs" value="10.0"/>
//         <int name="summonType" value="1"/>
//         <int name="mobType" value="0"/>
//      </imgdir>
//      <imgdir name="regen"></imgdir>
//      <imgdir name="stand"></imgdir>
// </imgdir>
//
// Read the 'elemAttr' value if it exists and append it to a 'output.txt' file (create the file if it doesn't exist)
// The elemAttr will be in the info imgdir and there might be others

const convert = require("xml-js");
const fs = require("fs");
const { loadMobMap } = require("./mobs");
const { decodeElementalString } = require("./elements");

const WZ_DIR = "./mob_wz_new";

const mob_wz = fs.readdirSync(WZ_DIR);

const mobData = loadMobMap();

for (const file of mob_wz) {
  const xml = fs.readFileSync(`${WZ_DIR}/${file}`, "utf8");
  const json = convert.xml2json(xml, { compact: true, spaces: 4 });
  const mobId = file.split(".")[0];
  const obj = JSON.parse(json);
  try {
    if (obj.imgdir.imgdir) {
      let info;
      if (obj.imgdir.imgdir instanceof Array) {
        info = obj.imgdir.imgdir.find(
          (imgdir) => imgdir._attributes.name === "info"
        );
      } else {
        if (obj.imgdir.imgdir._attributes.name === "info") {
          info = obj.imgdir.imgdir;
        }
      }

      //   console.log("info", info);
      if (info && info.string) {
        let elemAttr;
        if (info.string instanceof Array) {
          elemAttr = info.string.find(
            (string) => string._attributes.name === "elemAttr"
          );
        } else {
          if (info.string._attributes.name === "elemAttr") {
            elemAttr = info.string;
          }
        }

        if (elemAttr && elemAttr._attributes.value) {
          const mobName = mobData.get(mobId);
          const elementAttributes = decodeElementalString(
            elemAttr._attributes.value
          );
          let str = `${mobName ? mobName + " " : ""}(${mobId}) - [${
            elemAttr._attributes.value
          }] `;
          for (const [key, value] of Object.entries(elementAttributes)) {
            str += `${key}: ${value} | `;
          }
          str = str.slice(0, -2) + "\n";
          fs.appendFileSync("output.txt", str);
        }
      }
    }
  } catch (err) {
    console.log("Error reading file: ", file);
    console.error(err);
    break;
  }
}

console.log("Done!");
