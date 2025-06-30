import React, { useContext, useState } from 'react'
import Nav from '../Components/Nav'
import { categories } from '../Category'
import Cards from '../Components/Cards'
import { food_items } from '../food'
import { dataContext } from '../context/UserContext'
import { RxCross2 } from "react-icons/rx";
import Card2 from '../Components/Card2'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


const Home = () => {
    let {cate , setCate,input, showCart, setShowCart} = useContext(dataContext)
    function filter(category){
        if(category === "All"){
            setCate(food_items)
        }else{
         let newList = food_items.filter((item)=>(item.food_category === category))
         setCate(newList);
        }
    }

   let items = useSelector(state=>state.cart)
   let subtotal = items.reduce((total,item)=>total+item.qty*item.price,0)
   let deliveryFee = 20;
   let taxes = subtotal * 0.5/100;
   let total = Math.floor(subtotal + deliveryFee + taxes);


  return (
    <>
      <div className='bg-slate-200 w-full min-h-screen'>
        <Nav/>
        {!input ?  <div className='flex flex-wrap justify-center items-center gap-3 w-[100%]'>
            {categories.map((item)=>{ 
         return <div className='w-[120px] h-[110px] bg-white flex flex-col justify-center items-center gap-2 font-semibold text-gray-600 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 hover:bg-green-100 cursor-pointer'
         onClick={()=>filter(item.name)}>       
                {item.icon}
                 {item.name}
         </div>
         
            })}
        </div> : null }
    
       <div className='w-full flex flex-wrap gap-4 px-5 justify-center items-center pt-8 '> 
       
        {cate.length>1?<>{cate.map((items)=>(
            <Cards 
            name={items.food_name}
            image={items.food_image}
            price={items.price}
            id={items.id}
            type={items.food_type}

            />))}</>:<div className='text-center text-2xl text-green-500 font-semibold mt-5'> no dish found </div>}
       </div>
       <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl p-6 trasition-all duration-500 ${showCart ? "translate-x-0 overflow-auto" : "translate-x-full"}
       `}>
          <header className='w-[100%] flex justify-between items-center'>
           <span className='text-green-400 text-[18px] font-semibold'> Order items</span>
           <RxCross2 className='w-[20px] h-[20px] text-green-400 text-[18px] font-semibold
           cursor-pointer hover:text-gray-600'onClick={()=>setShowCart(false)} />
          </header>

         {items.length>0? <>
          <div className='w-full mt-8 flex flex-col gap-8'>
            {items.map((item)=>(
             <Card2 name={item.name} price={item.price} image={item.image} id={item.id} 
             qty={item.qty}/>
            ))}
          </div>

        <div className='w-full border-t-2 border-gray-400 mt-7 flex flex-col gap-4 p-8 border-b-2'>
          <div className='w-full flex justify-between items-center'>
               <span className='text-md text-gray-600 font-semibold'> Subtotal </span>
                <span className='text-green-400 font-semibold text-md'> Rs {subtotal}/- </span>
          </div>
         
         <div className='w-full flex justify-between items-center'>
               <span className='text-md text-gray-600 font-semibold'> Delivery Fee </span>
                <span className='text-green-400 font-semibold text-md'> Rs {deliveryFee}/- </span>
          </div>

          <div className='w-full flex justify-between items-center'>
               <span className='text-md text-gray-600 font-semibold'> Taxes </span>
                <span className='text-green-400 font-semibold text-md'> Rs {taxes}/- </span>
          </div>
        </div>
           <div>
            <div className='w-full flex justify-between items-center p-9'>
               <span className='text-xl text-gray-600 font-semibold'> Total </span>
                <span className='text-green-400 font-semibold text-xl'> Rs {total}/- </span>
          </div>
           <div className='flex justify-center items-center'><button  className='w-[70%] p-3 bg-green-400 rounded-lg text-white hover:bg-green-300  transition-all cursor-pointer ' onClick={()=>{toast.success("Order Placed..")}}> Place Order </button></div>
           </div>
           </>: <div className='text-center text-2xl text-green-500 font-semibold mt-5'> Empty Cart </div>} 
         
       </div>
      </div>
    </>
  )
}

export default Home
