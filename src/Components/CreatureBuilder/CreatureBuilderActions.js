function autoSave(dataObject) {
  //return null
  //console.log("AutoSave: ",dataObject);
  return {
    type: "CreatureBuilder_AutoSave",
    payload: dataObject
  }
}

export default {
  autoSave: autoSave
}