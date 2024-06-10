import React from "react";

interface TemplateProps{
    children : React.ReactNode
}

export const Template : React.FC<TemplateProps> = (props : TemplateProps) => {
    return (
        <main>
            <Header/>
                <main className="container mx-auto mt-8 px-1">
                    {props.children}
                </main>
            <Footer/>
        </main>
    )
}

const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-indigo-800 to-indigo-250 bg-opacity-50  text-white py-5">
            <h1 className="text-1xl font-bold ml-5">Image Lite App</h1>
        </header>
    )
}

const Footer: React.FC = () => {
    return (
        // fixed bottom-0
        <footer className="bg-indigo-800 bg-opacity-5 text-white py-4 w-full">
            <h1 className="ml-5 text-xs text-indigo-900">
                Image Lite App | Desenvolvido por: Paulo Ricardo Chagas- 2024
            </h1>
        </footer>
    )
}