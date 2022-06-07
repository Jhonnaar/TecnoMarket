import Producto from "../componentes/Producto"
import Header from "../componentes/Header"
import Footer from "../componentes/Footer"
import { useNavigate } from "react-router-dom"

export default function Cart (){
    let productsList = window.localStorage.getItem("products")
    let cartList = window.localStorage.getItem("cart")
    const navigate = useNavigate()
    const productos = () => {
        if (productsList) {
            productsList = JSON.parse(productsList)
            if (cartList) {
                cartList = JSON.parse(cartList)
                const products = []
                for (let i = 0; i < cartList.items.length; i++) {
                    productsList.map((e,index)=>{
                        if (index==cartList.items[i]) {
                            products.push(<div key={i} className="col-span-1"><Producto enableButton={false} id={i} seller={e.seller} name={e.name} price={e.price} description={e.description} url={e.url} /></div>)
                        }
                    })
                }
                return products
            }
            
        }
        return <></>
    }
    const pay = () => {
        if (window.localStorage.getItem("token")) {
            window.localStorage.removeItem("cart")
            navigate("/")
        } else {
            navigate("/article")
        }
    }
    return(
        <div>
            <Header cartList={window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")):{items:[]}}/>
            <div className="grid grid-cols-1 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 p-6 bg-stone-700 gap-2">
                {productos()}
                <div className="mx-auto col-span-1 lg:col-span-5 sm:col-span-2 md:col-span-3"><button onClick={pay} className="md:col-span-2 m-auto bg-yellow-200 px-8 py-2 text-center text-stone-700 font-bold rounded-xl">Pagar</button></div>
            </div>
            <Footer/>
        </div>
    )
}