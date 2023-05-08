import React, { useContext } from "react";
import { TodoContext } from "../context/todo";
import { ModalContext } from "../context/modal";

import { FiCheckCircle, FiEdit, FiTrash } from "react-icons/fi";

const ActionButton = ({ children, onClick, style, aria }) => {
  return (
    <button
      aria-label={aria}
      className={`text-3xl hover:text-gray-700 text-center flex flex-col items-center ${style}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const SingleTodo = ({ todo }) => {
  const { setTodoData, deleteTodo, completeTodo } = useContext(TodoContext);
  const { setIsModalOpen } = useContext(ModalContext);

  return (
    <li className="border-b-2 border-gray-400 p-4 flex justify-between items-center gap-8 w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between md:w-5/6">
        <div className="w-full">
          <button onClick={() => {
            setIsModalOpen(true);
            setTodoData(todo);
          }} 
          className="font-bold text-2xl">{todo.title}</button>
          <p className="text-md pt-2 text-gray-700 w-[10ch] truncate">
            {todo.description}
          </p>
        </div>
        {todo.status === "pending" && (
          <p className="text-red-400 font-bold">Pendiente</p>
        )}
        {todo.status === "done" && (
          <p className="text-green-600 font-bold">Completada</p>
        )}
      </div>
      <div className="flex justify-between gap-8 items-center  flex-grow">
        <ActionButton
          aria="Editar Tarea"
          style="hover:text-gray-700"
          onClick={() => {
            setTodoData(todo);
            setIsModalOpen(true);
          }}
        >
          <p className="text-sm text-center">Editar</p>
          <FiEdit />
        </ActionButton>
        <ActionButton
          aria="Borrar Tarea"
          style="text-3xl hover:text-red-600"
          onClick={() => deleteTodo(todo)}
        >
          <p className="text-sm text-center">Borrar</p>
          <FiTrash />
        </ActionButton>
        {todo.status !== "done" && (
          <ActionButton
            aria="Marcar Como Completado"
            style="text-3xl hover:text-green-600"
            onClick={() => completeTodo(todo)}
          >
            <p className="text-sm text-center">Completar</p>
            <FiCheckCircle />
          </ActionButton>
        )}
      </div>
    </li>
  );
};

const TodoList = () => {
  const { todos, setTodoData } = useContext(TodoContext);
  const { setIsModalOpen } = useContext(ModalContext);

  const addNewTodo = () => {
    setTodoData({});
    setIsModalOpen(true);
  };

  return (
    <main className={`w-[95%]  lg:w-4/5 min-w-[350px] mx-auto pb-24`}>
      <ul className="bg-white rounded-xl border-2 border-gray-700">
        {todos
          ?.filter((t) => t.status === "pending")
          .map((todo, index) => {
            return <SingleTodo todo={todo} key={index} />;
          })}
        <li className="text-5xl text-center py-4 font-bold">
          <button
            className="rounded-full border-2 px-4 border-black text-black bg-green-500 hover:bg-green-300 hover:scale-105 transition-all"
            onClick={addNewTodo}
          >
            +
          </button>
          <h3 className="text-xl pt-4">Añadir Tarea</h3>
        </li>
      </ul>

      <ul className=" bg-white rounded-xl border-2 border-gray-700 mt-8">
        <li>
          <h3 className="text-center p-4 text-xl font-bold border-b-4">
            Tareas Completadas
          </h3>
        </li>
        {todos
          ?.filter((t) => t.status === "done")
          .map((todo, index) => {
            return <SingleTodo todo={todo} key={index} />;
          })}
      </ul>
    </main>
  );
};

export default TodoList;
