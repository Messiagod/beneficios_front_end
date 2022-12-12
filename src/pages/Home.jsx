import { Link } from "react-router-dom"
import Natal from "../assets/sino-de-natal.png"
import Cesta from "../assets/open-box.png"
import React, {useContext} from "react"
import { AuthContext } from "../Contexts/AuthContext"

export function Home() {
    const {user, data, teste, teste2} = useContext(AuthContext)

    return (        
        <div className="w-full flex flex-col">
            <div className="flex items-center">
                <h1 className="m-8 text-3xl font-bold text-black">Bem - Vindo</h1>
            </div>

            <div className="m-10 flex flex-col sm:flex-row gap-5 h-full">
                {/* CESTA MENSAL */}
                <Link to={"/CestaMensal"} className="sm:h-2/5 sm:w-2/5 rounded border border-gray-400 flex text-black shadow-xl hover:bg-slate-200 hover:transition-colors">
                    <div className="bg-blue-200 border w-1/5 flex items-center justify-center">
                        <img src={Cesta} alt="" className="sm:w-3/5"/>
                    </div>
                    <div className="w-4/5 flex flex-col">
                        <span className="m-5 font-bold text-2xl">Cesta Mensal</span>
                        <span className="m-5">Entrega da cesta de produtos mensal.</span>
                    </div>
                </Link>
                {/* CESTA NATAL */}
                <Link to={"/CestaNatal"} className="sm:h-2/5 sm:w-2/5 rounded border border-gray-400 flex text-black shadow-xl hover:bg-slate-200 hover:transition-colors">
                    <div className="bg-red-200 border w-1/5 flex items-center justify-center">
                        <img src={Natal} alt="" className="sm:w-3/5"/>
                    </div>
                    <div className="w-4/5 flex flex-col">
                        <span className="m-5 font-bold text-2xl">Kit Natal</span>
                        <span className="m-5">Entrega do kit congelado/criança de natal.</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

