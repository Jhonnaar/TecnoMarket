import React, { useState } from "react";
import Logo from "../assets/logo/logo_small.png"
import { Link, useNavigate } from "react-router-dom";

export default function Login () {
    const [datos, setDatos] = useState({
        user:"",
        password:""
    })
    const [mensaje, setMensaje] = useState("")
    const navigate = useNavigate()

    const login = () => {
        let data = window.localStorage.getItem("users")
        if (datos.user && datos.password) {
            if (data) {
                data = JSON.parse(data)
                if (data.find(e=>e.user==datos.user)) {
                    const e = data.find(e=>e.password==datos.password)
                    if (e) {
                        window.localStorage.setItem("token",JSON.stringify({user:e.user,seller:e.seller,isAdmin:e.isAdmin}))
                        navigate("/")
                    } else {
                        setMensaje("Contraseña incorrecta")
                        setDatos({...datos, password:""})
                    }
                } else {
                    setMensaje("Usuario incorrecto")
                    setDatos({...datos, user:"", password:""})
                }
            } else {
                setMensaje("Usuario incorrecto")
                setDatos({...datos, user:"", password:""})
            }
        } else {
            setMensaje("Debe rellenar todos los campos")
        }
    }
    return(
        <div className="h-screen bg-stone-700 relative">
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 bg-stone-50 h-60">
                    <div className="col-span-1 md:col-start-2 mt-5"><Link to="/"><img className="mx-auto" src={Logo} alt="" ></img></Link></div>
                </div>
                <div className="col-span-1 m-10 md:m-0 md:col-start-2 md:col-span-1">
                    <div className="w-full h-[30rem] bg-yellow-200 -mt-24 p-16 grid grid-cols-1 gap-4 rounded-xl">
                        <span className="text-red-500 font-xs text-center">{mensaje}</span>
                        <div className="col-span-1 text-stone-700 font-bold text-center"><h1>Usuario</h1></div>
                        <input onChange={e=>setDatos({...datos,user:e.target.value})} value={datos.user} name="user" className="col-span-1 -mt-5 rounded-xl max-w-md mx-auto" type="text"></input>
                        <div className="col-span-1 text-stone-700 font-bold text-center"><h1>Contraseña</h1></div>
                        <input onChange={e=>setDatos({...datos,password:e.target.value})} value={datos.password} name="password" className="col-span-1 -mt-5 rounded-xl max-w-2xl mx-auto" type="password"></input>
                        <button onClick={login} className="col-span-1 rounded-xl bg-stone-700 text-stone-50 text-center font-bold mt-8 mx-auto pl-3 pr-3">Ingresar</button>
                        <Link to="/register" className="col-span-1 text-stone-700 text-center font-bold mx-auto pl-3 pr-3">Crear Cuenta</Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}