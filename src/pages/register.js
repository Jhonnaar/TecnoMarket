import Logo from "../assets/logo/logo_small.png"
import {useNavigate, Link} from "react-router-dom"
import { useState, useEffect } from "react";

export default function Register () {
    const [datos, setDatos] = useState({
        user:'',
        name:'',
        password:'',
        cpassword:'',
        email:'',
        seller:false,
        isAdmin:false
    })
    useEffect(()=>{
        if (datos.email) {
            if (datos.email.split("@")[1]) {
                if (datos.email.split("@")[1].split(".")) {
                    const admin = datos.email.split("@")[1].split(".")[0]=="admin"
                    setDatos({...datos,isAdmin:admin})
                }
            }
        }
    },[datos.email])
    const [mensaje, setMensaje] = useState("")
    const navigate = useNavigate()
    
    const isAll = () => {
        if (datos.user && datos.name && datos.password && datos.cpassword && datos.email) {
            return true
        } else {
            return false
        }
    }
    const isEmail = () => {
        const expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        const is = expReg.test(datos.email)
        if (is) {
            return true
        } else {
            return false
        }
    }

    const regis = (event) => {
        let data = window.localStorage.getItem("users")
        if (isAll()) {
            if (datos.password===datos.cpassword) {
                if (isEmail()) {
                    if (data) {
                        data = JSON.parse(data)
                        if (data.find(e=>{return e.user==datos.user})) {
                            setMensaje("Este nombre de usuario ya se encuentra registrado")
                        } else {
                            if (data.find(e=>{return e.email==datos.email})) {
                                setMensaje("Este correo electrónico ya se encuentra registrado")
                            } else {
                                var {cpassword , ...newDatos} = datos
                                data.push(newDatos)
                                window.localStorage.setItem('users',JSON.stringify(data))
                                window.localStorage.setItem('token',JSON.stringify({user:newDatos.user,seller:newDatos.seller,isAdmin:newDatos.isAdmin}))
                                navigate("/")
                            }
                        }
                    } else {
                        var {cpassword , ...newDatos} = datos
                        window.localStorage.setItem('users',JSON.stringify([newDatos]))
                        window.localStorage.setItem('token',JSON.stringify({user:newDatos.user,seller:newDatos.seller,isAdmin:newDatos.isAdmin}))
                        navigate("/")
                    }
                } else {
                    setMensaje("Correo electrónico inválido")
                }
            } else {
                setMensaje("La contraseña no coincide")
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
                    <div className="w-full min-h-[32rem] bg-yellow-200 -mt-24 p-16 grid grid-cols-1 gap-4 rounded-xl">
                        <span className="text-red-500 font-xs text-center">{mensaje}</span>
                        <div className="col-span-1 text-stone-700 font-bold text-center mb-2"><h1>Nombre de Usuario</h1></div>
                        <input onChange={e=>setDatos({...datos,user:e.target.value})} value={datos.user} name="user" className="col-span-1 -mt-5 rounded-xl max-w-md mx-auto" type="text"></input>
                        <div className="col-span-1 text-stone-700 font-bold text-center mb-2"><h1>Nombre Completo</h1></div>
                        <input onChange={e=>setDatos({...datos,name:e.target.value})} value={datos.name} name="name" className="col-span-1 -mt-5 rounded-xl max-w-2xl mx-auto" type="text"></input>
                        <div className="col-span-1 text-stone-700 font-bold text-center mb-2"><h1>Contraseña</h1></div>
                        <input onChange={e=>setDatos({...datos,password:e.target.value})} value={datos.password} name="password" className="col-span-1 -mt-5 rounded-xl max-w-2xl mx-auto" type="password"></input>
                        <div className="col-span-1 text-stone-700 font-bold text-center mb-2"><h1>Confirmar Contraseña</h1></div>
                        <input onChange={e=>setDatos({...datos,cpassword:e.target.value})} value={datos.cpassword} name="cpassword" className="col-span-1 -mt-5 rounded-xl max-w-2xl mx-auto" type="password"></input>
                        <div className="col-span-1 text-stone-700 font-bold text-center mb-2"><h1>Correo Electrónico</h1></div>
                        <input onChange={e=>setDatos({...datos,email:e.target.value})} value={datos.email} name="email" className="col-span-1 -mt-5 rounded-xl max-w-2xl mx-auto" type="email"></input>
                        <button onClick={regis} className="col-span-1 rounded-xl bg-stone-700 text-stone-50 text-center font-bold mt-8 mx-auto pl-3 pr-3">Crear Cuenta</button>
                        <Link to="/login" className="col-span-1 text-stone-700 text-center font-bold mx-auto pl-3 pr-3">Ingresar</Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}