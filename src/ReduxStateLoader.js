//taken from
//https://stackoverflow.com/questions/37195590/how-can-i-persist-redux-state-tree-on-refresh
//user Leo's answer

export default class ReduxStateLoader {

  loadState() {
      try {
          let serializedState = localStorage.getItem("dm_helper:state");
          if (serializedState === null) {
              return this.initializeState();
          }

          return JSON.parse(serializedState);
      }
      catch (err) {
          console.log("Error",err);
          return this.initializeState();
      }
  }

  saveState(state) {
      try {
          let serializedState = JSON.stringify(state);
          localStorage.setItem("dm_helper:state", serializedState);

      }
      catch (err) {
      }
  }

  initializeState() {
      return {
            //state object
          }
      };
  }