const DefaultState = {
  //form specific state vars
  templateCR: null,
  lockedFields: [],
  //creature specific state vars
  type: "",
  name: "",
  size: null,
  classification: null,
  alignment: "none",
  experience: null,
  proficiencyBonus: 0,
  calculatedPB: 0,
  calculatedXP: 0,
  challengeRating: 0,
  calculatedCR: 0,
  defenses: {
    defenseCR: 0,
    hp: 0,
    ac: 0,
    effectiveHP: 0,
    effectiveAC: 0,
    hitDice: null,
    immunities: [],
    resistances: [],
    vulnerabilities: []
  },
  offenses: {
    offenseCR: 0,
    saveDC: 0,
    attackBonus: 0,
    dpr: 0,
    actions: []//[{ name: "Breath", desc: "Breathe fire upon everything! Mwuahahahaha!", damage: [{ dmgType: "Fire", flatDamage: "50" }] }]
  },
  stats: {},
  languages: [{ value: "Common", "understandsOnly": false }],
  proficiencies: {},
  movement: [],
  abilities: []
}

export default {
  ...DefaultState
}