import { useState } from "react";
import Header from "../componentes/Header"
import Footer from "../componentes/Footer";
import { useNavigate } from "react-router-dom";

export default function Articles () {
    const [productState, setProductState] = useState({
        seller:JSON.parse(window.localStorage.getItem("token")).user,
        name:"",
        price:"",
        description:"",
        url:""
    })
    const [mensaje, setMensaje] = useState("")
    const navigate = useNavigate()
    const set = () => {
        if (productState.name && productState.price && productState.description && productState.url) {
            let data = window.localStorage.getItem("products")
            if (data) {
                data = JSON.parse(data)
                data.push(productState)
                window.localStorage.setItem("products",JSON.stringify(data))
                navigate("/")
            } else {
                window.localStorage.setItem("products",JSON.stringify([productState]))
                navigate("/")
            }
        } else {
            setMensaje("Debe rellenar todos los campos")
        }
    }
    return (
        <div>
            <Header cartList={window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")):{items:[]}}/>
            <div className="bg-stone-700 grid grid-cols-1 md:grid-cols-2 py-16 gap-4">
                <div className="col-span-1 md:col-span-2 mx-auto mb-10">
                    <span className="text-center text-3xl font-bold text-stone-50">Agregar Producto</span>
                </div>
                <div className="col-span-1 md:col-span-2 mx-auto mb-2">
                    <span className="text-center text-red-500">{mensaje}</span>
                </div>
                <div className="col-span-1 border-4 border-stone-50 border-dashed h-[12rem] w-[12rem] sm:h-[24rem] sm:w-[24rem] m-auto p-2">
                    <img className="object-cover h-[10.5rem] w-[10.5rem] sm:h-[22.5rem] sm:w-[22.5rem]" src={productState.url}></img>
                </div>
                <div className="col-span-1 grid grid-cols-1 gap-6 m-auto">
                    <span className="text-center text-stone-50 font-bold -mb-4">Vendedor</span>
                    <input type="text" readOnly value={productState.seller} className="mx-auto text-center font-bold h-8 rounded-md border-2 border-stone-50" name="seller"></input>
                    <input type="text" onChange={e=>setProductState({...productState,name:e.target.value})} value={productState.name} className="mx-auto text-center h-8 rounded-md border-2 border-stone-50" name="name" placeholder="Nombre del producto"></input>
                    <input type="number" onChange={e=>setProductState({...productState,price:e.target.value})} value={productState.price} className="mx-auto text-center h-8 rounded-md border-2 border-stone-50" name="price" placeholder="Precio"></input>
                    <input type="text" onChange={e=>setProductState({...productState,description:e.target.value})} value={productState.description} className="mx-auto text-center h-24 rounded-md border-2 border-stone-50" name="description" placeholder="Descripción"></input>
                </div>
                <div className="col-span-1 m-auto pl-7">
                <input type="url" onChange={e=>setProductState({...productState,url:e.target.value})} value={productState.url} className="mx-auto text-center h-8 rounded-md border-2 border-stone-50" name="url" placeholder="Url de la imagen"></input>
                <button onClick={()=>setProductState({...productState,url:""})} className="ml-2" ><box-icon name='eraser' type='solid' color='#fff9f9' ></box-icon></button>
                </div>
                <button onClick={set} className="col-span-1 md:col-span-2 m-auto bg-yellow-200 px-8 py-2 text-center text-stone-700 font-bold rounded-xl">Agregar</button>
            </div>
            <Footer/>
        </div>
    )
}