import CreatureStats from "../../Inf/CreatureStatChart.json";
import creatureSizes from "../../Inf/CreatureSize.json";
import CreatureClassificationArray from "../../Inf/CreatureClassification.json";
import ReferenceStatTable from "./ReferenceStatTable/ReferenceStatTable.js";

// *** exported consts *** //
const crKeys = calculateCRKeys();
// *** end exported consts *** //

// *** non-exported consts *** //
const modifierMultipliers = [{lowerBoundCR: 17, resistance: 1, immunity: 1.25}, {lowerBoundCR: 11, resistance: 1.25, immunity: 1.5}, {lowerBoundCR: 5, resistance: 1.5, immunity: 2}, {lowerBoundCR: 0, resistance: 2, immunity: 2}];
// *** end non-exported consts *** //

// *** exported functions *** //

//given a name (health), value (50), and a possible refernece CR (1/2), the method first checks if the referenceCR matches the cr for the given value
//if true, then returns the referenceCR back, otherwise search for the correct CR
function calculateCR(field, value, referenceCR = null) {
		//console.log(field,value);
		if (!value && value !== 0) {
			return 0;
		}

		let cr;
		if (referenceCR !== null && referenceCR !== undefined) {
			let matchesref = compareAgainstReferenceCR(field, value, referenceCR);
			if (!(matchesref === false)) {
				return matchesref;
			}
		}

		for (var index in crKeys) {
			let rating = crKeys[index];
			let dataValue = CreatureStats[rating][field];
			let result = crCompareValues(index, rating, dataValue, value);
			if (result || result === 0) {
				cr = result
				break;
			}
		}
		cr = cr !== undefined? cr : crKeys.slice(-1)[0];
		return (cr);
	}

function calculateFinalCR(dataObject) {
	var newState = dataObject;
	//console.log("new state:",newState);
	newState.offenses = calculateOverallOffensiveCR(newState.offenses);
	newState.defenses = calculateOverallDefensiveCR(newState.defenses);
	let defenseCRIndex = crKeys.indexOf(newState.defenses.defenseCR.toString());
	let offenseCRIndex = crKeys.indexOf(newState.offenses.offenseCR.toString());
	let difference = Math.abs(defenseCRIndex - offenseCRIndex);
	let CRIndex = defenseCRIndex < offenseCRIndex ? defenseCRIndex: offenseCRIndex;
	if (difference >= 2) {
		let adjustNum = 0
		adjustNum += Math.floor(difference/2);
		CRIndex += adjustNum;
	}
	let challengeRating = crKeys[CRIndex];
	newState.challengeRating = challengeRating;
	newState.proficiencyBonus = CreatureStats[challengeRating].proficiency || 0;
	newState.experience = CreatureStats[challengeRating].xp || 0;
	return newState;
}

//take into acount all defensive properties like armor, health, and modifiers
function calculateOverallDefensiveCR(dataObject) {
	let finalCR;
	let defenses = dataObject;
	defenses.effectiveHP = calculateEffectiveHP(dataObject);
	defenses.effectiveAC = calculateEffectiveAC(dataObject);
	let hpCR = calculateCR("hp", defenses.effectiveHP);
	let acCR = calculateCR("ac", defenses.effectiveAC || 0, hpCR);
	//console.log("HPCR:", hpCR, "ACCR:", acCR);
	if (hpCR === acCR) {
		finalCR = hpCR;
	}
	else {
		let hpIndex = crKeys.indexOf(hpCR.toString());
		let acIndex = crKeys.indexOf(acCR.toString());
		let difference = Math.abs(hpIndex - acIndex);
		//console.log(difference);
		if (difference == 1) {
			finalCR = eval(hpCR) < eval(acCR)? hpCR: acCR;
		}
		else {
			let averagedCRIndex = Math.floor((hpIndex + acIndex)/2);
			let averagedCR = crKeys[averagedCRIndex];
			finalCR = averagedCR;
		}
	}
	defenses["defenseCR"] = finalCR || 0;
	return defenses;
}

//take into account all offensive properties like modifiers, damage, and saving throw difficulty
function calculateOverallOffensiveCR(dataObject) {
	let offenses = dataObject;
	console.log(offenses);
	let finalOffenseCR = 0;

	//calculate the Challenge Ratings for each field
	let saveCR = calculateCR("saveDC", offenses.saveDC);
	let attackCR = calculateCR("attackBonus", offenses.attackBonus);
	let damageCR = calculateCR("dpr", offenses.dpr);
	//console.log("saveCR:",saveCR,"attackCR:",attackCR,"damageCR:",damageCR);
	//get the index for that CR; this is because the average of 2 and 1/8 isn't a real CR, but by using indexes we can get the proper CR
	let saveIndex = crKeys.indexOf(saveCR.toString());
	let attackIndex = crKeys.indexOf(attackCR.toString());
	let damageIndex = crKeys.indexOf(damageCR.toString());

	let averagedCRIndex = Math.floor((saveIndex + attackIndex + damageIndex)/3);
	finalOffenseCR = crKeys[averagedCRIndex];
	offenses.offenseCR = finalOffenseCR;
	return offenses;
}

//calculate "effective HP" -> hp plus any mods like immunities and resistances
function calculateEffectiveHP(dataObject) {
	//the input could be empty string ("") so reset it back to base 0
	if (dataObject.hp === "") {
		dataObject["hp"] = 0;
	}
	let baseHPCR = calculateCR("ac", dataObject.hp);
	let effectiveHP = dataObject.hp
	let immunitiesCount = dataObject.immunities.length;
	let resistancesCount = dataObject.resistances.length;
	if (immunitiesCount + resistancesCount > 2) {
		let multiplier = 1
		let key = resistancesCount > immunitiesCount ? "resistance" : "immunity";
		for (var index in modifierMultipliers) {
			if (baseHPCR >= modifierMultipliers[index].lowerBoundCR) {
				multiplier = modifierMultipliers[index][key];
				break;
			}
		}
		effectiveHP = Math.ceil(effectiveHP * multiplier);
	}
	return effectiveHP;
}

//calculate effective armor class, taking into account spells or traits that improve armor
function calculateEffectiveAC(dataObject) {
	let defenses = dataObject
	//the input could be empty string ("") so reset it back to base 0
	if (!defenses.ac) {
		defenses["ac"] = 0;
	}
	//console.log("effectiveAC:",dataObject.ac);
	let effectiveAC = defenses.ac
	return effectiveAC;
}

// *** end exported functions *** //

// *** helper/non-exported functions *** //

//correctly order challenge ratings -> 0, 1/8, 1/4, 1/2, 1, 2, etc
function calculateCRKeys() {
	//so since "1" is technically less than "1/2" we need to do some manual formatting for the special cases
	let keys = Object.keys(CreatureStats).sort();
	let sortedKeys = [keys[0], ...keys.slice(2,5).reverse(), keys[1], ...keys.slice(5)];
	return sortedKeys;
}

//compares the current value at a given field to a referenced cr by looking up that fields value at the reference
function compareAgainstReferenceCR(field, value, referenceCR) {
	let dataValue = CreatureStats[referenceCR][field]
	//isNaN checks for "0-13" or "50-75" values and splits the lower and upper bounds out
	if (isNaN(dataValue)) {
		let dataArray = dataValue.split("-").map((value) => {
			return parseInt(value);
		});
		if ((value >= dataArray[0]) && (value <= dataArray[1])) {
			return referenceCR;
		}
	}
	else {
		if (value == dataValue) {
			return referenceCR;
		}
	}
	return false
}

//for the given cr value, make checks to see if the value matches or is below/above the value at that cr's field
function crCompareValues(index, rating, crValue, value) {
	let cr = null;
	//console.log(index, rating, crValue, value);
	//isNaN checks for "0-13" or "50-75" values and splits the lower and upper bounds out
	if (isNaN(crValue)) {
		let dataArray = crValue.split("-").map((value) => {
			return parseInt(value);
		});
		//if the value is less than the value at cr 0 for some reason, then return 0
		if (index == 0) {
			if (value < dataArray[0]) {
				cr = 0;
			}
		}
		if ((value >= dataArray[0]) && (value <= dataArray[1])) {
			cr = rating;
		}
	}
	//only gets to here if the cr field value is a single entity like 17
	else {
		//if the value is less than the value at cr 0 for some reason, then return 0
		if (index == 0) {
			if (value < crValue) {
				cr = 0;
			}
		}
		if (value == crValue) {
			cr = rating;
		}
	}
	return cr;
}

// *** end helper functions *** //

export default {
	crKeys,
	calculateCR,
	calculateOverallDefensiveCR,
	calculateOverallOffensiveCR,
	calculateEffectiveHP,
	calculateEffectiveAC,
	calculateFinalCR
}