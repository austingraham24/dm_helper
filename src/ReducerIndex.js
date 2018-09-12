import { combineReducers } from "redux";
import CreatureReducers from "./Components/CreatureBuilder/CreatureBuilderReducers";
//redux state

  // editCreatureLastSave: CreatureData
  // creatureList: [Creatures]
  // activeCreature: the last viewed/edited creature



const rootReducer = combineReducers({
  editCreatureLastSave: CreatureReducers.editorReducer,
  activeCreature: CreatureReducers.editorSaveReducer,
  creatureList: CreatureReducers.creatureListReducer
});

export default rootReducer;