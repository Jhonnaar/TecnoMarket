import React, { useState, useEffect } from "react"
import Logo from "../../assets/logo/logo_small.png"
import { Link, useNavigate } from "react-router-dom"

export default function Header (props)  {
    const [menuState, setMenuState] = useState(false)
    const [clasState, setClasState] = useState("")
    const [articlesShow, setArticleShow] = useState("hidden")
    const navigate = useNavigate()
    const hidden = (is) => {
        let data = window.localStorage.getItem("token")
        if (is) {
            if (data) {
                return "mr-auto font-bold text-stone-700"
            } else {
                return "mr-auto font-bold text-stone-700 hidden"
            }
        } else {
            if (data) {
                return "mt-5 font-bold text-stone-700 hidden"
            } else {
                return "mt-5 font-bold text-stone-700"
            }
        }
    }
    useEffect(()=>{
        let data = window.localStorage.getItem("token")
        if (data) {
            data = JSON.parse(data)
            if (data.isAdmin || data.seller) {
                setArticleShow("")
            }else{
                setArticleShow("hidden")
            }
        }
        if (menuState) {
            setClasState("col-span-1 col-start-1 md:col-span-3 md:col-start-5 grid grid-cols-3 bg-stone-50 mx-auto md:mx-0 md:ml-auto float-right")
        } else {
            setClasState("hidden")
        }
    },[menuState])
    
    const logout = () => {
        window.localStorage.removeItem("token")
        setMenuState(false)
        navigate("/")
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-7 bg-stone-50 p-3 md:gap-x-6">
            <div className="col-span-2 m-1">
                <Link to="/"><img className="" src={Logo} alt="" ></img></Link>
            </div>
            <div className="col-span-3 p-4">
                <div className="grid grid-cols-8 border-2 border-stone-700">
                    <div className="col-span-7 text-stone-700 font-normal ml-3 mt-1">Busca</div>
                    <div className="col-span-1 mx-auto mt-1"><a href="#"><box-icon name="search-alt-2"></box-icon></a></div>
                </div>
            </div>
            <div className="col-span-2 grid grid-cols-3">
                <div className="col-span-1 mx-auto p-5">
                    <Link className={hidden(false)} to="/login">Ingresar</Link>
                </div>
                <div className="col-span-1 mx-auto p-5">
                    <Link className={hidden(false)} to="/register">Registrarse</Link>
                    <button onClick={()=>setMenuState(!menuState)} className={hidden(true)}><box-icon name="menu"></box-icon></button>
                </div>
                <div className="col-span-1 p-5">
                    <div className="float-right -mr-2">
                        <Link to="/cart"><box-icon name="cart-alt"></box-icon></Link>
                        <span className="align-top text-xs text-center font-bold text-stone-700 bg-yellow-200 rounded-full">{props.cartList.items.length}</span>
                    </div>
                </div>
            </div>
            <div className={clasState}>
                <Link className="font-bold text-stone-700" to="#">Perfil</Link>
                <Link className={"font-bold text-stone-700 "+articlesShow} to="/articles">Artículos</Link>
                <button onClick={logout} className="font-bold text-stone-700">Cerrar sesion</button>
            </div>
        </div>
    )
}