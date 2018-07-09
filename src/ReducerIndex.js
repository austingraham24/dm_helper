import { combineReducers } from "redux";
import CreatureReducers from "./Components/CreatureBuilder/CreatureBuilderReducers";

const rootReducer = combineReducers({
  editCreatureLastSave: CreatureReducers.editorReducer
});

export default rootReducer;