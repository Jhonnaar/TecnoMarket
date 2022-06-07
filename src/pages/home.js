import Header from "../componentes/Header"
import Slide from "../componentes/Slide/index.js"
import Section from "../componentes/Section";
import Footer from "../componentes/Footer";
import "boxicons"
import { useEffect, useState } from "react";

export default function Home () {
    const [cartList, setCartList] = useState({items:[]})
    const list = (list) => {
        setCartList({...cartList,items:list.items})
    }
    useEffect(()=>{
      window.localStorage.setItem("cart",JSON.stringify(cartList))
    },[cartList])
    return (
      <div>
        <Header cartList={cartList}/>
        <Slide/>
        <Section bus={list}/>
        <Footer/>
      </div>
    );
}