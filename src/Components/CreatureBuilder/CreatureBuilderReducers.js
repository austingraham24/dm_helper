function editorReducer(state, action) {
  if (action.type === "CreatureBuilder_AutoSave") {
    return action.payload;
  }
  if (!state) {
    return null
  }
  return state;
}

export default {
  editorReducer: editorReducer
}