import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component{
    render(){
        return(
            <footer className="grid grid-cols-3 bg-yellow-200 p-3">
                <span className="col-start-1 text-center font-bold text-stone-700 mb-2">Contáctanos</span>
                <span className="col-start-2 text-center font-bold text-stone-700 mb-2">Síguenos</span>
                <span className="col-start-3 text-center font-bold text-stone-700 mb-2">Créditos</span>
                <span className="col-start-1 text-center text-stone-700 mx-auto">tmarket@gmail.com</span>
                <div className="col-start-2 mx-auto"><Link to="/"><box-icon type='logo' name='facebook-square'></box-icon>Facebook</Link></div>
                <span className="col-start-3 text-center text-stone-700">Jhon Natera</span>
                <span className="col-start-1 text-center text-stone-700 mx-auto">605-4332</span>
                <div className="col-start-2 mx-auto"><Link to="/"><box-icon type='logo' name='instagram'></box-icon>Instagram</Link></div>
                <span className="col-start-1 text-center text-stone-700 mx-auto">310-989-3329</span>
                <div className="col-start-2 mx-auto"><Link to="/"><box-icon type='logo' name='twitter'></box-icon>Twitter</Link></div>
                

            </footer>
        )
    }
}
export default Footer