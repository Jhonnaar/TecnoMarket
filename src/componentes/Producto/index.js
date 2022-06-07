import { useNavigate } from "react-router-dom"

export default function Producto (props) {
    const navigate = useNavigate()
    const add = () => {
        props.bus(props.id)
    }
    const subtract = () => {
        let data = window.localStorage.getItem("cart")
        if (data) {
            data = JSON.parse(data)
            const newData = {
                items:[]
            }
            for (let i = 0; i < data.items.length; i++) {
                if (i!=props.id) {
                    newData.items.push(data.items[i])
                }
            }
            window.localStorage.setItem("cart",JSON.stringify(newData))
            navigate("/cart")
        }
    }
    const enableSubtract = () => {
        if (props.enableButton) {
            return "hidden"
        } else {
            return ""
        }
    }
    const enableAdd = () => {
        if (props.enableButton) {
            return ""
        } else {
            return "hidden"
        }
    }
    return (
        <div className="rounded-lg bg-stone-50 grid grid-cols-3 gap-1 p-1 h-full" >
            <div className="m-auto rounded-lg col-span-2 grid grid-cols-1">
                <div className="col-span-1">
                    <img src={props.url}></img>
                </div>
                <div className="col-span-1 m-auto" >
                    <span className="text-xs text-center text-stone-700">{props.description}</span>
                </div>
            </div>
            <div className="m-4 mx-auto rounded-lg col-span-1 border-2 border-stone-700 grid grid-cols-1">
                <span className="text-center text-stone-400 text-xs">{props.seller}</span>
                <span className="text-center text-stone-700 text-sm font-bold ">{props.name}</span>
                <span className="text-center text-stone-700 text-sm mb-2">${props.price}</span>
                <span className="text-[10px] m-auto"><box-icon name="store-alt"></box-icon>Recoge en la tienda</span>
                <span className="text-[10px] m-auto"><box-icon name="mail-send"></box-icon>Envío gratis</span>
                <div className={enableAdd()}><button onClick={add} className="m-1 text-xs bg-stone-700 text-stone-50 text-center rounded-lg">Agregar al carrito</button></div>
                <div className={enableSubtract()}><button onClick={subtract} className="m-1 text-xs bg-stone-700 text-stone-50 text-center rounded-lg">Quitar del carrito</button></div>
            </div>
        </div>
    )
}