import React, { useContext, useEffect } from 'react'
import { MdFastfood } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { dataContext } from '../context/UserContext';
import { food_items } from '../food';
import { useSelector } from 'react-redux'

const Nav = () => {
    let {input, setInput, cate,setCate, showCart, setShowCart} = useContext(dataContext);
     useEffect(()=>{
        let newList = food_items.filter((item)=>item.food_name.includes(input) || item.food_name.toLowerCase().includes(input)); setCate(newList)}
     ,[input])

   let items = useSelector(state=>state.cart)
    console.log(items)



  return (
    <div className='w-full h-[100px] flex justify-between items-center px-5 md:px-8'>
    <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-2xl 
    shadow hover:shadow-lg transition-shadow duration-300'>
        <MdFastfood className='w-[30px] h-[30px] text-yellow-500 cursor-pointer' />
    </div>

    <form className='w-[55%] h-[40px] bg-white flex items-center px-5 gap-5 md:w-[75%]
    rounded-md shadow hover:shadow-lg transition-shadow duration-300' onSubmit={(e)=>e.preventDefault()}>
      <IoIosSearch className='w-[20px] h-[20px] text-green-500'/>
      <input type='text' placeholder='Search Items...' className='w-[70%] outline-none text-[16px] md:text-[20px]' onChange={(e)=>setInput(e.target.value)} value={input}/>
    </form>

     <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-2xl
     shadow hover:shadow-lg transition-shadow duration-300 relative' onClick={()=> setShowCart(true)}>
     <span className='absolute top-0 right-2 text-blue-500 font-bold text-[18px]'> {items.length} </span>
        <LuShoppingBag className='w-[30px] h-[30px] text-blue-500 cursor-pointer'/>
    </div>
      
    </div>
  )
}

export default Nav
