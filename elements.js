// public enum Element {
//     NEUTRAL(0), PHYSICAL(1), FIRE(2, true), ICE(3, true), LIGHTING(4), POISON(5), HOLY(6, true), DARKNESS(7);

//     private final int value;
//     private boolean special = false;

//     Element(int v) {
//         this.value = v;
//     }

//     Element(int v, boolean special) {
//         this.value = v;
//         this.special = special;
//     }

//     public boolean isSpecial() {
//         return special;
//     }

//     public static Element getFromChar(char c) {
//         switch (Character.toUpperCase(c)) {
//             case 'F':
//                 return FIRE;
//             case 'I':
//                 return ICE;
//             case 'L':
//                 return LIGHTING;
//             case 'S':
//                 return POISON;
//             case 'H':
//                 return HOLY;
//             case 'D':
//                 return DARKNESS;
//             case 'P':
//                 return NEUTRAL;
//         }
//         throw new IllegalArgumentException("unknown elemnt char " + c);
//     }

//     public int getValue() {
//         return value;
//     }
// }

// to javascript

const element = {
  NEUTRAL: 0,
  PHYSICAL: 1,
  FIRE: 2,
  ICE: 3,
  LIGHTING: 4,
  POISON: 5,
  HOLY: 6,
  DARKNESS: 7,
};

function getFromChar(c) {
  switch (c.toUpperCase()) {
    case "F":
      return element.FIRE;
    case "I":
      return element.ICE;
    case "L":
      return element.LIGHTING;
    case "S":
      return element.POISON;
    case "H":
      return element.HOLY;
    case "D":
      return element.DARKNESS;
    case "P":
      return element.NEUTRAL;
  }
  throw new Error("unknown element char " + c);
}

function elementToString(e) {
  switch (e) {
    case element.FIRE:
      return "Fire";
    case element.ICE:
      return "Ice";
    case element.LIGHTING:
      return "Lighting";
    case element.POISON:
      return "Poison";
    case element.HOLY:
      return "Holy";
    case element.DARKNESS:
      return "Darkness";
    case element.NEUTRAL:
      return "Neutral";
  }
  throw new Error("unknown element " + e);
}

// public enum ElementalEffectiveness {
//     NORMAL, IMMUNE, STRONG, WEAK, NEUTRAL;

//     public static ElementalEffectiveness getByNumber(int num) {
//         switch (num) {
//             case 1:
//                 return IMMUNE;
//             case 2:
//                 return STRONG;
//             case 3:
//                 return WEAK;
//             case 4:
//                 return NEUTRAL;
//             default:
//                 throw new IllegalArgumentException("Unkown effectiveness: " + num);
//         }
//     }
// }

// to javascript

const elementalEffectiveness = {
  NORMAL: 0,
  IMMUNE: 1,
  STRONG: 2,
  WEAK: 3,
  NEUTRAL: 4,
};

function getByNumber(num) {
  switch (num) {
    case 1:
      return elementalEffectiveness.IMMUNE;
    case 2:
      return elementalEffectiveness.STRONG;
    case 3:
      return elementalEffectiveness.WEAK;
    case 4:
      return elementalEffectiveness.NEUTRAL;
    default:
      throw new Error("Unkown effectiveness: " + num);
  }
}

function effectivenessToString(e) {
  switch (e) {
    case elementalEffectiveness.IMMUNE:
      return "Immune";
    case elementalEffectiveness.STRONG:
      return "Strong";
    case elementalEffectiveness.WEAK:
      return "Weak";
    case elementalEffectiveness.NEUTRAL:
      return "Neutral";
  }
  throw new Error("unknown effectiveness " + e);
}

// private static void decodeElementalString(MonsterStats stats, String elemAttr) {
//     for (int i = 0; i < elemAttr.length(); i += 2) {
//         stats.setEffectiveness(Element.getFromChar(elemAttr.charAt(i)), ElementalEffectiveness.getByNumber(Integer.parseInt(String.valueOf(elemAttr.charAt(i + 1)))));
//     }
// }

// to javascript

/**
 *
 * @param {Record<string, string>} elemAttr
 */
function decodeElementalString(elemAttr) {
  const elementAttributes = {};
  for (let i = 0; i < elemAttr.length; i += 2) {
    elementAttributes[elementToString(getFromChar(elemAttr[i]))] =
      effectivenessToString(getByNumber(parseInt(elemAttr[i + 1])));
  }
  return elementAttributes;
}

exports.element = element;
exports.getFromChar = getFromChar;
exports.elementToString = elementToString;
exports.elementalEffectiveness = elementalEffectiveness;
exports.getByNumber = getByNumber;
exports.effectivenessToString = effectivenessToString;
exports.decodeElementalString = decodeElementalString;
