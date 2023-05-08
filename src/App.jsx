import { useState, useContext } from 'react'
import Header from '@/components/Header'
import TodoList from '@/components/TodoList'
import './App.css'
import { TodoContext, TodoProvider } from './context/todo'
import { ModalContext } from './context/modal'
import AddEditTodoModal from './components/AddEditTodoModal'


function App() {
  const { isModalOpen } = useContext(ModalContext);

  return (
    <TodoProvider>
      {isModalOpen ? 
        <>
          <div className='filter blur'>
          <Header />
          <TodoList />
          </div>
          <AddEditTodoModal />
        </>
        :
        <>
          <Header />
          <TodoList />
        </>
      }



    </TodoProvider>
  )
}

export default App
