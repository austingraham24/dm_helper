function autoSave(dataObject) {
  //return null
  //console.log("AutoSave: ",dataObject);
  return {
    type: "CreatureBuilder_AutoSave",
    payload: dataObject
  }
}

function clear() {
  return {
    type: "CreatureBuilder_Clear",
    payload: null
  }
}

export default {
  autoSave: autoSave,
  clear: clear
}