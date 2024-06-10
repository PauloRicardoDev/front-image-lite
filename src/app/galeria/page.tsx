"use client"
import {ImageCard, Template} from "@/components";
import {useState} from "react";

export default function GaleriaPage(){

    const image1 = 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/311121507/original/199fe384ac4c4b2db0978d8b2f00acb67bdc17d3/make-pixel-art-background-pixel-scenery-and-landscape.jpg'
    const image2 = 'https://mainleaf.com/wp-content/uploads/2023/06/pixel-art-paisagem-2-1024x577.png'
    const nomeImage1 = 'Castelo - Dia (Pixel Art)'
    const nomeImage2 = 'Castelo - Por do Sol (Pixel Art)'

    const [codigoImage, setCodigoImage] = useState<Number>();
    const [urlImage, setUrlImage] = useState<String>(image2);
    const [nomeImage, setNomeImage] = useState<String>(nomeImage1)
    function mudarImage(){
        if (codigoImage == 1){
            setCodigoImage(2)
            setUrlImage(image1)
            setNomeImage(nomeImage2)
        }else {
            setCodigoImage(1)
            setUrlImage(image2)
            setNomeImage(nomeImage1)
        }
    }

    // @ts-ignore
    return(
        <Template>
            <h1 className="font-bold ">Galeria</h1>

            <button onClick={mudarImage} className="p-4 mt-3 bg-gradient-to-r from-indigo-800 to-indigo-250 bg-opacity-50  text-white rounded-full">Click para mudar imagem!</button>

            <section className="grid grid-cols-3 gap-5">
                <ImageCard
                    src={urlImage}
                    nome={nomeImage}
                    tamanho='4MB'
                    dataUpload='01/01/2024'
                />

                <ImageCard
                    src={urlImage}
                    nome={nomeImage}
                    tamanho='4MB'
                    dataUpload='01/01/2024'
                />

                <ImageCard
                    src={urlImage}
                    nome={nomeImage}
                    tamanho='4MB'
                    dataUpload='01/01/2024'
                />


            </section>
        </Template>
    )
}