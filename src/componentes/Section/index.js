import { useEffect, useState } from "react";
import Producto from "../Producto";

export default function Section (props) {
    const [page, setPage] = useState(0)
    const [cartList, setCartList] = useState(window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")) : {items:[]})
    let data = window.localStorage.getItem("products")
    const cont = (id) => {
        let items = cartList.items
        items.push(id)
        setCartList({...cartList,items:items})
    }
    useEffect(()=>{
        props.bus(cartList)
    },[cartList])
    const productos = () => {
        if (data) {
            data = JSON.parse(data)
            const products = []
            let i = page * 10
            let n = data.length>i+10 ? i+10 : data.length
            for (i; i < n; i++) {
                products.push(<div key={i} className="col-span-1"><Producto enableButton={true} id={i} seller={data[i].seller} name={data[i].name} price={data[i].price} description={data[i].description} url={data[i].url} bus={cont} /></div>)
            }
            return products
        }
        return <></>
    }
    const left = () => {
        const change = page-1<0 ? Math.ceil(data.length/10)-1 : page-1
        setPage(change)
    }
    const right = () => {
        const change = page+1>Math.ceil(data.length/10)-1 ? 0 : page+1
        setPage(change)
    }
    return(
        <div className="grid grid-cols-1 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 p-6 bg-stone-700 gap-2">
            <div className="col-span-1 lg:col-span-5 sm:col-span-2 md:col-span-3 grid grid-cols-3 h-8">
                <button onClick={left} className="col-start-1"><box-icon name="chevron-left" color="#ffffff" ></box-icon></button>
                <p className="col-start-2 text-center text-stone-50 font-bold">{page+1}</p>
                <button onClick={right} className="col-start-3"><box-icon name="chevron-right" color="#ffffff" ></box-icon></button>
            </div>
            {productos()}
            
        </div>
    )
}