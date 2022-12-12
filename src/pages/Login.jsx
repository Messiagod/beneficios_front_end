import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../config/api'
import React from "react"


export function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)

    const navigate = useNavigate();

    const handleLogin = async e => {
        e.preventDefault();
        await api.post("/auth",{
            login,
            password,
        }
        ).then((res) => {
            console.log(res.data)
            console.log("Entrou")
            navigate("/Home")
        }).catch((err) => {
            if(err){
                console.log("Usuario Incorreto")
                setLoginError(true)
            } else {console.log("back off")}
        })
        

        
    }


    return (
        <div className="w-full flex flex-col">
            <div className="flex justify-center h-4/5">
                <div className="text-black  bg-gray-100 rounded-2xl w-4/5 h-3/4 mt-20 md:w-1/4 :h-3/4 ">
                    <div className="flex flex-col gap-5 items-center mt-8 ">
                        <span className='w-20'>
                            <img src="https://www.aberje.com.br/wp-content/uploads/2020/12/LOGO-Ype-PNG-1.png" />
                        </span>
                        <span className='text-gray-700 font-bold text-2xl'>Beneficios Ypê</span>
                        <form className='flex flex-col gap-6' onSubmit={handleLogin}>
                            <input 
                            type="text" 
                            placeholder="Usuário" 
                            className="bg-white h-10 rounded-md shadow-lg p-4 border border-gray-200 focus:border focus:border-blue-500 "
                            required
                            onChange={e => setLogin(e.target.value)}
                            />
                            <input 
                            type="text" 
                            placeholder="Senha" 
                            className="bg-white h-10 rounded-md shadow-lg p-4 border border-gray-200"
                            required
                            onChange={e => setPassword(e.target.value)}
                            />
                            <div className='bg-blue-600 text-white shadow-lg  text-center rounded-md h-10'>
                                <button className="h-10 rounded-md" type='submit'>
                                    Entrar
                                </button>
                            </div>
                            {loginError ?
                                <span className='text-red-600 text-xl'>
                                Acesso negado.
                            </span> 
                            :
                            null}
                        </form>
                    </div>
                </div>
            </div>
           {/*  <div className="bg-blue-500 w-full h-1/5">
            </div> */}
        </div>
    )
}
