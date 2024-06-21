import React from "react"
import {IoIosAnalytics, IoIosImage} from "react-icons/io";
import { MdCopyright } from "react-icons/md";
import {ToastContainer} from "react-toastify";

interface TemplateProps{
    children: React.ReactNode
    loading?: boolean;
}

export const Template : React.FC<TemplateProps> = ({children, loading = false}: TemplateProps) => {
    return (
        <main>
            <Header/>
            <section className={`${loading ? 'animate-pulse': ''} w-full `}>
                {children}
                <RenderIf condition={loading}>
                    <section className="text-center">
                        <Loading/>
                    </section>
                </RenderIf>
            </section>
            <Footer/>

            <ToastContainer
                position="top-right"
                autoClose={8000}
                hideProgressBar={false}
                draggable={true}
                closeOnClick={true}
                pauseOnHover={true}
                theme={"dark"}
            />
        </main>
    )
}

export const Template_galery : React.FC<TemplateProps> = ({children, loading = false}: TemplateProps) => {
    return (
        <main>
            <section className={`${loading ? 'animate-pulse' : ''} w-full `}>
                {children}
                <RenderIf condition={loading}>
                    <section className="text-center">
                        <Loading/>
                    </section>
                </RenderIf>
            </section>
            <Footer/>
        </main>
    )
}

const Header: React.FC = () => {
    return (
        <header className=" bg-gradient-to-r from-neutral-800 to-indigo-250 bg-opacity-50 text-white p-6">
            <section className="flex justify-start items-center gap-2">
                <IoIosAnalytics className="text-5xl text-indigo-800" />
                <h1 className="text-1xl">Image Lite App</h1>
            </section>
        </header>
    )
}

export const Header_galery: React.FC = () => {
    return (
        // bg-gradient-to-r from-indigo-800 to-indigo-250 bg-opacity-50
        <header className="text-white p-6">
            <section className="flex flex-row gap-1 items-center mb-14">
                <IoIosImage className="text-white text-2xl"/>
                <h1 className="font-bold text-2xl">Galeria </h1>
            </section>
        </header>
    )
}

const Footer: React.FC = () => {
    return(
        <footer className="mt-10 p-10  text-xs font-semibold grid grid-cols-1 gap-3 border-t-2 border-neutral-800">
            <h1 className="text-gray-700 font-medium">Version: 0.1 - Image Lite App</h1>
            <span className="text-gray-700 font-medium">Desenvolvido por: Paulo Ricardo Chagas</span>
            <div className="flex flex-row justify-start items-center gap-2 text-gray-700 font-medium">
                <MdCopyright />
                <span>Todos os diretos reservados</span>
            </div>
        </footer>
    )
}

interface RenderIfProps {
    condition?: boolean;
    children: React.ReactNode;
}

export const RenderIf: React.FC<RenderIfProps> = ({condition = true, children}) => {
    if (condition) {
        return children;
    }
    return false;
}

const Loading: React.FC = () => {
    return (
        <div role="status" className="flex flex-row gap-3 justify-center items-center p-44">
            <svg aria-hidden="true"
                 className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"/>
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"/>
            </svg>
        </div>
    )
}