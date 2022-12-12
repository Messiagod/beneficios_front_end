import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/api";


export function CestaMensal() {
    const [divRes, setDivRes] = useState(false)
    const [divResTrue, setDivResTrue] = useState(false)
    const [divResFalse, setDivResFalse] = useState(false)
    const [userType, setUserType] = useState("usu_ti")

    const [id, setId] = useState('');
    const [barCode, setBarCode] = useState('')

    const [res, setRes] = useState('')
    const [resModal, setResModal] = useState('')
    const [modal, setModal] = useState('')
    const [qtd, setQtd] = useState('')

    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [submitQtd, setSubmitQtd] = useState('');
    const [tab, setTab] = useState(1)

    /* CONSULTA DE CESTAS */
    const handleSubmit = async e => {
        e.preventDefault();
        await api.post("/cestaMensal/getQtd", {
            id,
            barCode,
        }).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                setRes(res.data)
                setDivRes(true)
            }
        }).catch((err) => {
            if (err) {
                console.log(err)
                alert("Não localizado")
            }
        })
    }

    /* ENVIO DE CESTAS */
    const handleBox = async e => {
        e.preventDefault()
        const response = await api.post("/cestaMensal/removeQtd", {
            id,
            barCode,
            qtd,
            userType
        }).then(res => {
            if (res.status === 200) {
                console.log(res)
                setResModal(res.data)
                setModal(true)
            }
        }).catch((err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    /* GERAR RELATÓRIO */
    const reportSubmit = async e => {
        e.preventDefault()
        await api.post("/cestaMensal/getReport", {
            initialDate,
            finalDate
        }).then(res => {
            if (res.status === 200) {
                const download = res.data.fileName
                console.log(res.data.fileName)
                window.open(`http://brampwsapp002:3050/cestaMensal/getReport/${download}`)
            }
        }).catch((err) => {
            {
                if (err) {
                    console.log(err)
                }
            }
        })
    }

    return (
        <div className="w-full flex flex-col">
            {/* NAVEGAÇÃO */}
            <ul className="flex items-center mt-3">
                <li className="inline-flex items-center">
                    <Link to={"/Home"} className="text-gray-600 hover:text-blue-500">
                        <svg className="w-8 h-auto fill-current mx-2 text-gray-600" viewBox="0 0 24 24" ><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                    </Link>
                    <span className="mx-4 h-auto text-3xl font-bold">/</span>
                </li>
                <li className="inline-flex items-center">
                    <span className="flex items-center text-gray-800 text-2xl font-semibold underline">
                        Cesta Mensal
                    </span>
                </li>
            </ul>
            {/* widgets */}
            <ul className="flex items-center m-3 mt-5 gap-5 border-b-2 text-xl text-gray-400 font-semibold">
                <li className="cursor-pointer">
                    <span onClick={() => setTab(1)} className={tab !== 1 ? "text-gray-400" : "text-blue-700"}>Retirada</span>
                    <div className="bg-blue-700 w-full h-1" hidden={tab !== 1}></div>
                </li>
                <li className="cursor-pointer">
                    <span onClick={() => setTab(2)} className={tab !== 2 ? "text-gray-400" : "text-blue-700"}>Relatório</span>
                    <div className="bg-blue-700 w-full h-1" hidden={tab !== 2}></div>
                </li>
            </ul>


            {/* Retirada da Cesta */}
            {tab === 1 ?
                <>
                    {divRes ?
                        <>


                            {/* Modal  */}
                            {modal ? <div>
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                <div className="fixed inset-0 z-10 overflow-y-auto">
                                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-400 sm:mx-0 sm:h-10 sm:w-10">
                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                            width="48" height="48"
                                                            viewBox="0 0 48 48">
                                                            <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
                                                        </svg>
                                                    </div>
                                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                        <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Cestas retiradas com sucesso</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <a className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700  sm:ml-3 sm:w-auto sm:text-sm" onClick={() => window.location.reload()}>Nova retirada</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                : null}
                            <div className="text-gray-600 h-full">
                                <span className="text-xl m-3 font-bold">{res.nome_funcionario}</span>
                                <form className="flex flex-col h-full gap-2 m-2" onSubmit={handleBox}>
                                    <div className="bg-gray-100 h-1/4 flex flex-col justify-center items-center border rounded-lg shadow-lg">
                                        <span className="text-lg font-semibold">Cestas Disponiveis:</span>
                                        <span className="text-2xl">{res.qtd_disponivel}</span>
                                        <input type="number" max={res.qtd_disponivel} placeholder="Qtd" required className="w-1/4 rounded-md shadow-lg border text-gray-700 border-blue-600 outline-none" onChange={e => setQtd(e.target.value)} />
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="h-10 mt-3 rounded-md border w-full bg-red-400 text-white" onClick={() => window.location.reload()}>
                                            Voltar
                                        </button>
                                        <button className="h-10 mt-3 rounded-md border w-full bg-blue-600 text-white" type="submit">
                                            Retirar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                        :
                        <div className="h-3/6 m-5 border rounded-lg flex flex-col">
                            <span className="m-5 text-gray-800 text-2xl font-semibold">
                                Retirada de Cesta
                            </span>
                            <div className="h-full m-5">
                                <form className="flex flex-col gap-2  m-2" onSubmit={handleSubmit}>
                                    <input type="text" placeholder="Mátricula" className="bg-white h-10 rounded-md shadow-lg p-4 border text-gray-700 border-blue-600 outline-none" onChange={e => setId(e.target.value)} />
                                    <input type="text" placeholder="Código de Barras" className="bg-white h-10 rounded-md shadow-lg p-4 border text-gray-700 border-blue-600 outline-none" onChange={e => setBarCode(e.target.value)} />
                                    <div className='bg-blue-600 text-white shadow-lg  mt-5 text-center rounded-md'>
                                        <button className="h-10 rounded-md" type="submit">
                                            Consultar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </> :
                <>
                    {/* Gerar Relatório */}
                    <div className="h-3/6 m-5 border rounded-lg flex flex-col">
                        <span className="m-5 text-gray-800 text-2xl font-semibold">
                            Relatório de entrega
                        </span>
                        <div className="h-full m-5">
                            <form className="flex flex-col gap-2 m-2" onSubmit={reportSubmit}>
                                <span className="text-gray-600 font-semibold">
                                    Data Inicial:
                                </span>
                                <input type="date" className="bg-white h-10 rounded-md shadow-lg p-4 border border-blue-600 outline-none" onChange={e => setInitialDate(e.target.value)} />
                                <span className="text-gray-600 font-semibold">
                                    Data Final:
                                </span>
                                <input type="date" className="bg-white h-10 rounded-md shadow-lg p-4 border border-blue-600 outline-none" onChange={e => setFinalDate(e.target.value)} />
                                <div className='bg-blue-600 text-white shadow-lg  mt-5 text-center rounded-md'>
                                    <button className="h-10 rounded-md" type="submit">
                                        Extrair
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>}
        </div>
    )
}