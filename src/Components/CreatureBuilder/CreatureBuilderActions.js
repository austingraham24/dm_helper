function autoSave(dataObject) {
  return {
    type: "CreatureBuilder_AutoSave",
    payload: dataObject
  }
}

function clear() {
  console.log("Clear!");
  return {
    type: "CreatureBuilder_Clear",
    payload: null
  }
}

function save(dataObject) {
  console.log("Save then Clear");
  return function(dispatch, getState) {
    dispatch(saveCreature(dataObject));
    dispatch(clear());
  }
}

function saveCreature(dataObject) {
  return {
    type: "CreatureBuilder_Save",
    payload: dataObject
  }
}

function edit(dataObject, index) {
  console.log("Edit! :",dataObject, index);
  return {
    type: "CreatureBuilder_Edit",
    payload: {...dataObject, listIndex: index}
  }
}

function deleteCreature(index) {
  return {
    type: "CreatureBuilder_Delete",
    payload: index
  }
}

export default {
  autoSave: autoSave,
  clear: clear,
  save: save,
  edit: edit,
  deleteCreature: deleteCreature
}