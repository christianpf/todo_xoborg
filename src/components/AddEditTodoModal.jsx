import { useContext, useEffect, useId, useState } from "react";
import { ModalContext } from "../context/modal";
import { TodoContext } from "../context/todo";

import { FiX } from "react-icons/fi";

const AddEditTodoModal = () => {
  const { setIsModalOpen } = useContext(ModalContext);
  const { todoData, setTodoData, addTodo, updateTodo } = useContext(TodoContext);

  const [ newTodo, setNewTodo ] =  useState(todoData);


  const handleSubmit = (e) => {
    e.preventDefault();
    if(JSON.stringify(todoData) === "{}"){
      addTodo({
        id: Math.random().toString() + e.target.title.value,
        title: e.target.title.value,
        description: e.target.description.value,
        status: "pending",
      });
    }else {
      updateTodo(todoData.id, {
        id: todoData.id,
        title: e.target.title.value,
        description: e.target.description.value,
        status: todoData.status
      })
    }


    setIsModalOpen(false);
    setTodoData({});
  };

  return (
    <section className="absolute bottom-1/3 left-0 right-0 mx-auto bg-white rounded-xl border-2 border-black p-8 w-[95%] md:w-1/2">
      <button
        aria-label="Cerrar pestaña"
        className="absolute top-2 right-2 text-3xl hover:bg-gray-300 rounded-xl"
        onClick={() => setIsModalOpen(false)}
      >
        <FiX />
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col relative"
      >
        <div className="pt-8 flex flex-col gap-2">
          <label>Titulo de Tarea:</label>
          <input
            className="border-2 border-black p-2 rounded-lg"
            name="title"
            type="text"
            required
            placeholder="Introduzca título de la tarea..."
            value={newTodo?.title}
            onChange={(e) => setNewTodo({...todoData, title:e.target.value})}
          />
        </div>
        <div className="pt-8 flex flex-col gap-2">
          <label>Descripción de la Tarea</label>
          <textarea
            className="border-2 border-black p-2 rounded-lg"
            rows="5"
            name="description"
            type="text"
            required
            placeholder="Introduzca descripción de la tarea..."
            value={newTodo?.description}
            onChange={(e) => setNewTodo({...todoData, description:e.target.value})}
          />
        </div>

        <button
          className="bg-green-300 my-4 p-4 w-1/3 mx-auto rounded-xl cursor-pointer hover:bg-green-500 font-bold"
          type="submit"
          value={JSON.stringify(todoData) === "{}" ? `Añadir Tarea` : `Editar Tarea`}
        >
          {JSON.stringify(todoData) === "{}" ? `Añadir Tarea` : `Editar Tarea`}
        </button>
      </form>
    </section>
  );
};

export default AddEditTodoModal;
