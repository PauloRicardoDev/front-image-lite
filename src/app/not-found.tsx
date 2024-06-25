'use client'

import {Template} from "@/components";

export default function notFoundPage(){
    return(
        <Template>
            <section className="flex justify-center flex-col items-center gap-8 my-8">
                <img className="w-96" src="/assets/page-not-found.png" alt="not found"/>
                <span className="text-xs">Page Not Found!</span>
                <p className="text-indigo-200 font-extrabold">Click no passarinho na parte superior da tela para voltar!</p>
            </section>
        </Template>
    )
}