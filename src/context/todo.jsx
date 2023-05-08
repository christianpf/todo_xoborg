import { useReducer, createContext, useState } from "react";
import { todoReducer, todoInitialState } from "@/reducers/todo.js";

export const TodoContext = createContext();

const useTodoReducer = () => {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState);

  const addTodo = (todo) =>
    dispatch({
      type: "ADD_TODO",
      payload: todo,
    });

  const deleteTodo = (todo) =>
    dispatch({
      type: "DELETE_TODO",
      payload: todo,
    });

  const updateTodo = (id, todo) =>
    dispatch({
      type: "UPDATE_TODO",
      payload: {id, todo},
    });

  const completeTodo = (todo) =>
    dispatch({
      type: "COMPLETE_TODO",
      payload: todo,
    });

  return { state, addTodo, deleteTodo, updateTodo, completeTodo };
};

export const TodoProvider = ({ children }) => {
  const { state, addTodo, deleteTodo, updateTodo, completeTodo  } =
    useTodoReducer();
  

  const [ todoData, setTodoData ] = useState({})

  return (
    <TodoContext.Provider
      value={{
        todos: state,
        addTodo,
        deleteTodo,
        updateTodo,
        completeTodo,
        todoData,
        setTodoData
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
