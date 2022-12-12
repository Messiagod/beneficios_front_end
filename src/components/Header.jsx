import LogoYpe from "./LogoYpe";

export function Header(){
    return (

        <header className="w-full py-3 flex items-center justify-center bg-white border-b border-gray-200">
            <a href="/">
            <LogoYpe/>
            </a>
        </header>
    )
}