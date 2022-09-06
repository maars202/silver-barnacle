import React, { createContext, useContext, useState, FC, ReactNode,} from "react";
// import React, { FC, ReactNode, useMemo } from 'react';
import { TodoContextType, ITodo, NFT } from './@types/todo';

const StateContext = createContext(null);
export const TodoContext = React.createContext<TodoContextType | null>(null);

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false
}

// 1. add all the values that are going to be used in the value attribute of the StateContext.Provider:
// 2. add the children to that this context provider can be used to wrap existing divs to hydrate the values in :
export const TodoProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [currNFT, setnft] = React.useState<NFT | null>(null);

    const savenft = (newnft: NFT) => {
        // const newTodo: ITodo = {
        //   id: Math.random(), // not really unique - but fine for this example
        //   title: todo.title,
        //   description: todo.description,
        //   status: false,
        // };
        setnft(newnft);
      };


    const [todos, setTodos] = React.useState<ITodo[]>([
        {
          id: 1,
          title: 'post 1',
          description: 'this is a description',
          status: false,
        },
        {
          id: 2,
          title: 'post 2',
          description: 'this is a description',
          status: true,
        },
      ]);

      const saveTodo = (todo: ITodo) => {
        const newTodo: ITodo = {
          id: Math.random(), // not really unique - but fine for this example
          title: todo.title,
          description: todo.description,
          status: false,
        };
        setTodos([...todos, newTodo]);
      };

      const updateTodo = (id: number) => {
        todos.filter((todo: ITodo) => {
          if (todo.id === id) {
            todo.status = true;
            setTodos([...todos]);
          }
        });
      };

    return (
        <TodoContext.Provider
        value={{todos, saveTodo, updateTodo, currNFT, setnft, savenft}}>
            {children}
        </TodoContext.Provider>
    )
}


export default TodoProvider;

// export const useStateContext = () => useContext(StateContext); 