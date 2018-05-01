//imports
import statsMods from "../../../Inf/StatMods.json";

//exported consts
const defaultStatState = {
    Strength: {"value":null,"mod":null},
    Wisdom: {"value":null,"mod":null},
    Dexterity: {"value":null,"mod":null},
    Constitution: {"value":null,"mod":null},
    Intelligence: {"value":null,"mod":null},
    Charisma: {"value":null,"mod":null},
    statProficiencies: {
        "Strength": {"Saving Throw":false, "Athletics":false}, 
        "Dexterity": {"Saving Throw":false, "Acrobatics":false, 
        "Slight of Hand":false, "Stealth":false}, 
        "Constitution": {"Saving Throw":false}, 
        "Intelligence": {"Saving Throw":false, "Arcana":false, "History":false, "Investigation":false, "Investigation":false, "Nature":false, "Religion":false}, 
        "Wisdom": {"Saving Throw":false, "Animal Handling": false, "Insight":false, "Medicine":false, "Perception":false, "Survival":false}, 
        "Charisma": {"Saving Throw":false, "Deception":false, "Intimidation":false, "Performance":false, "Persuasion":false}
    }
}

const statKeys = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
const shortKeys = ["STR", "DXT", "CONST", "INT", "WIS", "CHAR"];

//exported functions
function calcStatMod(value){
    var mod = null;
    if (value) {
        for (var index in statsMods) {
            if (value <= statsMods[index].score) {
                mod = statsMods[index].mod;
                break;
            }
        }
    }
    return mod;
}

function getModForStat(statObject) {
    if (!statObject.mod && statObject.mod != 0) {
        return null;
    }
    let mod = statObject.mod;
    return mod >= 0 ? "+"+mod : mod;
}

function getShortStatKey(stat) {
    let index = statKeys.indexOf(stat);
    return shortKeys[index];
}

//helper functions

export default {
    defaultStatState,
    statKeys,
    calcStatMod,
    getModForStat,
    getShortStatKey
}