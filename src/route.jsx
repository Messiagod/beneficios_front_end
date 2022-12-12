import { Route, Routes } from "react-router-dom";
import { CestaMensal } from "./pages/CestaMensal";
import { CestaNatal } from "./pages/CestaNatal";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export function RouteComponent(){
    return(
        <Routes>
            <Route path="/*" element={<Login/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/CestaMensal" element={<CestaMensal/>}/>
            <Route path="/CestaNatal" element={<CestaNatal/>}/>
        </Routes>
    )
}