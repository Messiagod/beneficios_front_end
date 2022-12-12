import { useState } from "react";
import { Link } from "react-router-dom";
import api from '../config/api'
import sucessLoad from '../assets/sucessGif.gif'

export function CestaNatal() {

    const [tab, setTab] = useState(1)
    const [file, setFile] = useState()
    const [upload, setUpload] = useState(true)
    const [divUploadSucess, setDivUploadSucess] = useState(false)
    const [id, setId] = useState('')
    const [barCode, setBarCode] = useState('')
    const [companyName, setCompanyName] = useState('QUIMICA AMPARO')

    const [modal, setModal] = useState(false)
    const [resModal, setResModal] = useState('')
    const [respostas, setRespostas] = useState('')

    const [name, setName] = useState('')
    const [kitPanetoneQtd, setKitPanetone] = useState('')
    const [kitCriancaQtd, setKitCrianca] = useState('')
    const [kitCongeladoQtd, setKitCongelado] = useState('')
    const [retirada, setRetirada] = useState(true)
    const [userType, setUserType] = useState("usu_ti")

    const [initialDate, setInitialDate] = useState('')
    const [finalDate, setFinalDate] = useState('')

    /* GERAR RELATÓRIO */
    const reportSubmit = async e => {
        e.preventDefault()
        await api.post("/cestaNatal/getReport", {
            initialDate,
            finalDate
        }).then(res => {
            if (res.status === 200) {
                const download = res.data.fileName
                console.log(res.data.fileName)
                window.open(`http://brampwsapp002:3050/cestaNatal/getReport/${download}`)
            }
        }).catch((err) => {
            {
                if (err) {
                    console.log(err)
                    alert("Arquivo não contem dados")
                }
            }
        })
    }

    /* SUBIR ARQUIVO */
    const uploadFile = async e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', file);

        await api.post("/cestaNatal/upload", formData)
            .then((response) => {
                console.log(response)
                setUpload(false)
            }).catch((err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("back off")
                }
            })
    }

    /* CONSULTA DE KITS */
    const handleSubmit = async e => {
        e.preventDefault();
        await api.post("/cestaNatal/getQtd", {
            id,
            barCode,
            companyName
        }).then(res => {
            if (res.status === 200) {
                console.log(res)
                setRetirada(false)
                setRespostas(res.data)
            }
        }).catch((err) => {
            if (err) {
                console.log(err)
                alert("Não Localizado")
            }
        })
    }

    /* ENVIO DE KITS */
    const handleBox = async e => {
        e.preventDefault();
        const response = await api.post("/cestaNatal/removeQtd", {
            id,
            barCode,
            userType,
            kitPanetoneQtd,
            kitCongeladoQtd,
            kitCriancaQtd
        }).then(res => {
            if (res.status === 200) {
                setResModal(res.data)
                setModal(true)
                console.log(res.data)
            }
        }).catch((err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    const downloadArquivo = `http://brampwsapp002:3050/modelo/beneficiariosCestaNatal`

    return (
        <div className="w-full flex flex-col">
            {/* NAVEGAÇÃO */}
            <ul className="flex items-center m-5">
                <li className="inline-flex items-center">
                    <Link to={"/Home"} className="text-gray-600 hover:text-blue-500">
                        <svg className="w-8 h-auto fill-current mx-2 text-gray-600" viewBox="0 0 24 24" ><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                    </Link>
                    <span className="mx-4 h-auto text-3xl font-bold">/</span>
                </li>
                <li className="inline-flex items-center">
                    <span className="flex items-center text-gray-800 text-2xl font-semibold underline">
                        Kit de Natal
                    </span>
                </li>
            </ul>
            {/* widgets */}
            <ul className="flex items-center m-3 mt-5 gap-5 border-b-2 text-xl text-gray-400 font-semibold">
                <li className="cursor-pointer">
                    <span onClick={() => setTab(1)} className={tab === 1 ? "text-blue-700" : "text-gray-400"}>Retirada</span>
                    <div className="bg-blue-700 w-full h-1" hidden={tab !== 1}></div>
                </li>
                <li className="cursor-pointer">
                    <span onClick={() => setTab(2)} className={tab === 2 ? "text-blue-700" : "text-gray-400"}>Relatório</span>
                    <div className="bg-blue-700 w-full h-1" hidden={tab !== 2}></div>
                </li>
                <li className="cursor-pointer">
                    <span onClick={() => setTab(3)} className={tab === 3 ? "text-blue-700" : "text-gray-400"}>Carga</span>
                    <div className="bg-blue-700 w-full h-1" hidden={tab !== 3}></div>
                </li>
            </ul>
            {/* Cesta de Natal */}
            {tab === 1 ?
                <div className="h-full mx-2 border rounded-lg flex flex-col">
                    {retirada ? <>
                        <span className="m-5 text-gray-800 text-2xl font-semibold">
                            Retirada de Kit Natal
                        </span>
                        <div className="h-full m-5">
                            <form className="flex flex-col gap-2  m-2" onSubmit={handleSubmit}>
                                <input type="text" placeholder="Mátricula" className="bg-white h-10 rounded-md shadow-lg p-4 border text-gray-700 border-blue-600 outline-none" onChange={e => setId(e.target.value)} />
                                <input type="text" placeholder="Código de Barras" className="bg-white h-10 rounded-md shadow-lg p-4 border text-gray-700 border-blue-600 outline-none" onChange={e => setBarCode(e.target.value)} />
                                <div className='bg-blue-600 text-gray-600 shadow-lg  mt-5 text-center rounded-md'>
                                    <button className="h-10 rounded-md text-white" type="submit">
                                        Consultar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </> :
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
                                                        <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Items retirados com sucesso</h3>
                                                        <div className="mt-2 flex flex-col gap-2 text-left">
                                                            <span hidden={resModal.retorno_retirada_kit_congelado !== "1"} className="text-sm text-gray-500">Kit Congelado</span>
                                                            <span hidden={resModal.retorno_retirada_kit_panetone !== "1"} className="text-sm text-gray-500">Kit Panetone</span>
                                                            <span hidden={resModal.retorno_retirada_kit_crianca !== "1"} className="text-sm text-gray-500">Kit Criança</span>
                                                        </div>
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
                                <span className="text-xl m-3 font-bold">{respostas.nome_funcionario}</span>
                                <form className="flex flex-col h-full gap-2 m-2" onSubmit={handleBox}>
                                    <div className="bg-gray-100 h-1/4 flex flex-col justify-center items-center border rounded-lg shadow-lg">
                                        <span className="text-lg font-semibold">Kit Congelado</span>
                                        <span className="text-2xl">{respostas.qtd_kit_congelado}</span>
{/*                                         <input type="number" max={respostas.qtd_kit_congelado} required placeholder="Qtd" className="w-1/4 rounded-md shadow-lg border text-gray-700 border-blue-600 outline-none" onChange={e => setKitCongelado(e.target.value)} />
 */}                                    </div>
                                    <div className="bg-gray-100 h-1/4 flex flex-col justify-center items-center border rounded-lg shadow-lg">
                                        <span className="text-lg font-semibold">Kit Panetone</span>
                                        <span className="text-2xl">{respostas.qtd_kit_panetone}</span>
{/*                                         <input type="number" max={respostas.qtd_kit_panetone} required placeholder="Qtd" className="w-1/4 rounded-md shadow-lg border text-gray-700 border-blue-600 outline-none" onChange={e => setKitPanetone(e.target.value)} />                                    

 */}  </div>                                  <div className="bg-gray-100 h-1/4 flex flex-col justify-center items-center border rounded-lg shadow-lg">
                                        <span className="text-lg font-semibold">Kit Criança</span>
                                        <span className="text-2xl">{respostas.qtd_kit_crianca}</span>
{/*                                         <input type="number" max={respostas.qtd_kit_crianca} required placeholder="Qtd" className="w-1/4 rounded-md shadow-lg border text-gray-700 border-blue-600 outline-none" onChange={e => setKitCrianca(e.target.value)} />
 */}                                    </div>
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
                        </>}
                </div> :
                tab === 2 ?
                    /* RELATÓRIO */
                    <div className="h-3/6 m-5 border rounded-lg flex flex-col">
                        <span className="m-5 text-gray-800 text-2xl font-semibold">
                            Relatório de entrega
                        </span>
                        <div className="h-full m-5">
                            <form className="flex flex-col gap-2 m-2 text-gray-500" onSubmit={reportSubmit}>
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
                    </div> :
                    /* CARGA DE DADOS */
                    <>
                        {upload ? <> <form onSubmit={uploadFile} className='flex flex-col gap-2 m-3 '>
                            <div class="flex justify-center items-center w-auto">
                                <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-100 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer  hover:bg-gray-200">
                                    <div class="flex flex-col justify-center items-center pt-5 pb-6">
                                        <svg aria-hidden="true" class="mb-3 w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p class="mb-2 text-sm text-white-500 text-gray-600"><span class="font-semibold">Clique aqui para inserir o arquivo </span></p>
                                        <span className="text-xs rounded py-[0.125rem] px-2 text-gray-600 border border-gray-600 font-bold mt-10">
                                            SOMENTE ARQUIVOS COM EXTENSÃO CSV
                                        </span>
                                    </div>
                                    <input id="dropzone-file" type="file" class="hidden " accept='.csv' onChange={e => setFile(e.target.files[0])} />
                                </label>
                            </div>
                            {file ? <button type='submit' className='w-28 h-14 p-3 mt-10 text-sm bg-blue-600   rounded font-bold uppercase gap-2  hover:bg-blue-700 transition-colors'>
                                Enviar dados
                            </button> : null}
                        </form>
                            <a href={downloadArquivo} className='rounded overflow-hidden flex flex-col items-stretch gap-6 text-gray-600 font-medium m-5 '>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    width="144" height="144"
                                    viewBox="0 0 48 48">
                                    <rect width="16" height="9" x="28" y="15" fill="#21a366"></rect><path fill="#185c37" d="M44,24H12v16c0,1.105,0.895,2,2,2h28c1.105,0,2-0.895,2-2V24z"></path><rect width="16" height="9" x="28" y="24" fill="#107c42"></rect><rect width="16" height="9" x="12" y="15" fill="#3fa071"></rect><path fill="#33c481" d="M42,6H28v9h16V8C44,6.895,43.105,6,42,6z"></path><path fill="#21a366" d="M14,6h14v9H12V8C12,6.895,12.895,6,14,6z"></path><path d="M22.319,13H12v24h10.319C24.352,37,26,35.352,26,33.319V16.681C26,14.648,24.352,13,22.319,13z" opacity=".05"></path><path d="M22.213,36H12V13.333h10.213c1.724,0,3.121,1.397,3.121,3.121v16.425	C25.333,34.603,23.936,36,22.213,36z" opacity=".07"></path><path d="M22.106,35H12V13.667h10.106c1.414,0,2.56,1.146,2.56,2.56V32.44C24.667,33.854,23.52,35,22.106,35z" opacity=".09"></path><linearGradient id="flEJnwg7q~uKUdkX0KCyBa_UECmBSgBOvPT_gr1" x1="4.725" x2="23.055" y1="14.725" y2="33.055" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#18884f"></stop><stop offset="1" stop-color="#0b6731"></stop></linearGradient><path fill="url(#flEJnwg7q~uKUdkX0KCyBa_UECmBSgBOvPT_gr1)" d="M22,34H6c-1.105,0-2-0.895-2-2V16c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v16	C24,33.105,23.105,34,22,34z"></path><path fill="#fff" d="M9.807,19h2.386l1.936,3.754L16.175,19h2.229l-3.071,5l3.141,5h-2.351l-2.11-3.93L11.912,29H9.526	l3.193-5.018L9.807,19z"></path>
                                </svg>
                                <div className="flex flex-col">
                                    <span>
                                        Planilha Modelo
                                    </span>
                                    <span>
                                        Clique Aqui para baixar
                                    </span>
                                </div>
                            </a>
                        </> :
                            <div className="rounded border border-gray-500 p-4 m-4">
                                <h1 className='mt-5 mb-5 text-green-400 text-4xl'>Base Atualizada com sucesso !!</h1>
                                <div className=' flex justify-center'>
                                    <div className='w-64 flex justify-center'>
                                        <img src={sucessLoad} alt="loading..." />
                                    </div>
                                </div>

                            </div>}

                        {/* DIV SUCESSO */}
                        {/*   {divUploadSucess ?
                            <div className="rounded border border-gray-500 p-4 m-4">
                                <h1 className='mt-5 mb-5 text-green-400 text-4xl'>Base Atualizada com sucesso !!</h1>
                                <div className=' flex justify-center'>
                                    <div className='w-64 flex justify-center'>
                                        <img src={sucessLoad} alt="loading..." />
                                    </div>
                                </div>
                            </div>
                            :
                            null
                         */}
                    </>}

        </div>
    )
}