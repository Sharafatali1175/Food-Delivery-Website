import React, { createContext, useContext, useState } from 'react';
import { food_items } from '../food';

 export const dataContext = createContext();
const UserContext = ({children}) => {
       let [cate ,setCate] = useState(food_items);
       let [input , setInput] = useState("");
       let [showCart ,setShowCart] = useState(false)
       let data = { 
        input,
        setInput,
        cate,
        setCate,
        showCart,
        setShowCart
       }
  return (
    <div>
      <dataContext.Provider value={data}>
        {children}
      </dataContext.Provider>
    </div>
  )
}

export default UserContext
