export const todoInitialState =
  JSON.parse(window.localStorage.getItem("todos")) || [];

export const TODO_ACTIONS = {
  ADD_TODO: "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  DELETE_TODO: "DELETE_TODO",
  COMPLETE_TODO: "COMPLETE_TODO",
};

export const updateTodoLocalStorage = (state) => {
  localStorage.setItem("todos", JSON.stringify(state));
};

const UPDATE_BY_ACTION = {
  [TODO_ACTIONS.ADD_TODO]: (state, action) => {
    const newState = [...state, {...action.payload}];
    updateTodoLocalStorage(newState);
    return newState;
  },

  [TODO_ACTIONS.DELETE_TODO]: (state, action) => {
    
    const {id} = action.payload;
    const newState = state.filter(todo => todo.id !== id)
    updateTodoLocalStorage(newState);
    return newState;
  
  },
  [TODO_ACTIONS.UPDATE_TODO]: (state, action) => {
    const index = state.findIndex(todo => todo.id === action.payload.id);
    if(index >= 0) {
      const newState = structuredClone(state);
      newState[index] = action.payload.todo;
            
      updateTodoLocalStorage(newState);
      return newState;
    }

  },
  [TODO_ACTIONS.COMPLETE_TODO]: (state, action) => {
    const { id } = action.payload;

    const index = state.findIndex(todo => todo.id === id);

    if (index >= 0){
      const newState = structuredClone(state)
      newState[index].status = "done";  
      
      updateTodoLocalStorage(newState);
      return newState;
    }

  }
}


export const todoReducer = (state, action) => {
  const {type: actionType} = action;
  
  const updateState = UPDATE_BY_ACTION[actionType]

  return updateState ? updateState(state, action) : state;
};
