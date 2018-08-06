function editorReducer(state, action) {
  if (action.type === "CreatureBuilder_AutoSave") {
    return action.payload;
  }
  if (action.type === "CreatureBuilder_Clear") {
    return null;
  }
  if (!state) {
    return null
  }
  return state;
}

export default {
  editorReducer: editorReducer
}