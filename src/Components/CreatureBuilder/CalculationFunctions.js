import CreatureStats from "../../Inf/CreatureStatChart.json";
import creatureSizes from "../../Inf/CreatureSize.json";
import CreatureClassificationArray from "../../Inf/CreatureClassification.json";
import ReferenceStatTable from "./ReferenceStatTable/ReferenceStatTable.js";

const crKeys = calculateCRKeys();

function calculateCRKeys() {
	let keys = Object.keys(CreatureStats).sort();
	let sortedKeys = [keys[0], ...keys.slice(2,5).reverse(), keys[1], ...keys.slice(5)];
	return sortedKeys;
}

function compareAgainstReferenceCR(field, value, referenceCR) {
	let dataValue = CreatureStats[referenceCR][field]
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

		return 0
	}
}

function calculateCR(field, value, referenceCR = null) {
		console.log(field,value);
		if (!value && value !== 0) {
			return 0;
		}

		let cr;
		if (referenceCR !== null && referenceCR !== undefined) {
			return compareAgainstReferenceCR(field, value, referenceCR);
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
		return (cr !== undefined? cr : crKeys.slice(-1)[0]);
	}

function crCompareValues(index, rating, crValue, value) {
	let cr = null;
	console.log(index, rating, crValue, value);
	if (isNaN(crValue)) {
		let dataArray = crValue.split("-").map((value) => {
			return parseInt(value);
		});
		if (index == 0) {
			if (value < dataArray[0]) {
				cr = 0;
			}
		}
		if ((value >= dataArray[0]) && (value <= dataArray[1])) {
			cr = rating;
		}
	}

	else {
		if (index == 0) {
			if (value < crValue) {
				cr = 0;
			}
		}
		if (value === crValue) {
			cr = rating;
		}
	}
	return cr;
}

export default {
	crKeys,
	calculateCR
}