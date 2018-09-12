function editorAutoSaveReducer(state, action) {
  if (action.type === "CreatureBuilder_AutoSave") {
    if (!state) {
      return {...action.payload};
    }
    else {
      return {...state, ...action.payload};
    }
  }
  if (action.type === "CreatureBuilder_Clear") {
    console.log("Clear Autosave")
    return null;
  }
  if (!state) {
    return null
  }
  return state;
}

function editorSaveReducer(state, action) {
  if (action.type === "CreatureBuilder_Save" || action.type === "CreatureBuilder_Edit") {
    return action.payload;
  }
  if (action.type === "CreatureBuilder_Clear") {
    console.log("Clear ActiveCreature")
    return null;
  }
  if (!state) {
    return null
  }
  return state;
}

function creatureListReducer (state, action) {
  if (action.type === "CreatureBuilder_Save") {
    var updatedArray = [...state];
    console.log(action.payload);
    if (action.payload.listIndex || action.payload.listIndex === 0) {
      updatedArray.splice(action.payload.listIndex, 1, action.payload)
    }
    else {
      updatedArray.push(action.payload);
    }
    return updatedArray;
  }
  if (action.type === "CreatureBuilder_Delete") {
    var updatedArray = [...state];
    updatedArray.splice(action.payload, 1);
    return updatedArray;
  }
  if (!state) {
    return [];
  }
  return [...state];
}

// function creatureEditReducer (state, action) {
//   if (action.type === "CreatureBuilder_Edit") {
//     return {...action}
//   }
//   if (!state) {
//     return null;
//   }
//   return null;
// }

export default {
  editorReducer: editorAutoSaveReducer,
  editorSaveReducer: editorSaveReducer,
  creatureListReducer: creatureListReducer
}