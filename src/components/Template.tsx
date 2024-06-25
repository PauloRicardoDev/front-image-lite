'use client'

import React from "react"
import { IoIosPower } from "react-icons/io";
import { MdCopyright } from "react-icons/md";
import {ToastContainer} from "react-toastify";
import Link from "next/link";
import {Button} from "@/components/button";
import {useAuth} from "@/resources";
import {useRouter} from "next/navigation";

interface TemplateProps{
    children: React.ReactNode
    loading?: boolean;
}

export const Template : React.FC<TemplateProps> = ({children, loading = false}: TemplateProps) => {

    return (
        <main>
            <Header/>
            <section className={`${loading ? 'animate-pulse': ''} w-full`}>
                {children}
                <RenderIf condition={loading}>
                    <section className="text-center">
                        <Loading/>
                    </section>
                </RenderIf>
                <ToastContainer
                    position="top-right"
                    autoClose={8000}
                    hideProgressBar={false}
                    draggable={true}
                    closeOnClick={true}
                    pauseOnHover={true}
                    theme={"dark"}
                />
            </section>
            <Footer/>
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

    const auth = useAuth();
    const username = auth.getUserSession();
    const router = useRouter();

    function logout(){
        auth.invalidateSession();
        router.push("/login")
    }

    return (
        <header className=" text-white p-6 flex justify-between flex-row">
            <section className="flex justify-start items-center gap-2">
                <Link href="/galeria">
                    <img src="/assets/logo.png" className="w-10"/>
                </Link>
                <h1 className="text-1xl">Image Lite App</h1>
            </section>

            <RenderIf condition={!!username}>
                <section className="flex justify-start items-center gap-5">
                    <h1>Olá, {username?.name}</h1>
                    <Button type={"button"} onClick={logout}>
                        <IoIosPower className="text-2xl"/>
                    </Button>
                </section>
            </RenderIf>
        </header>
    )
}

export const Header_galery: React.FC = () => {

    const auth = useAuth();
    const username = auth.getUserSession();
    const router = useRouter();

    function logout(){
        auth.invalidateSession();
        router.push("/login")
    }

    return (
        <header className=" text-white p-6 flex justify-between flex-row">
            <section className="flex flex-row gap-2 items-center">
                <Link href="/galeria">
                    <img src="/assets/logo.png" className="w-10"/>
                </Link>
                <h1 className="font-bold text-2xl">Galeria</h1>
            </section>

            <RenderIf condition={!!username}>
                <section className="flex justify-start items-center gap-5">
                    <h1>Olá, {username?.name}</h1>
                    <Button type={"button"} onClick={logout}
                            title={'Click para sair'}
                            style={" bg-gradient-to-r from-neutral-700 to-neutral-700 transition duration-300" +
                                " ease-in-out p-3 rounded-full hover:from-rose-700 hover:to-rose-700 hover:bg-opacity-70"}
                    >
                        <IoIosPower className="text-2xl"/>
                    </Button>
                </section>
            </RenderIf>
        </header>
    )
}

const Footer: React.FC = () => {
    return (
        <footer className="p-7 text-xs font-semibold grid grid-cols-1 gap-3">
            <h1 className="text-neutral-600 font-medium">Version: 0.1 - Image Lite App</h1>
            <span className="text-neutral-600 font-medium">Desenvolvido por: Paulo Ricardo Chagas</span>
            <div className="text-neutral-600 flex flex-row justify-start items-center gap-2 font-medium">
                <MdCopyright />
                <span className="text-neutral-600">Todos os diretos reservados</span>
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