"use client"
import {ImageCard, Template} from "@/components";
import {useImageService} from "@/resources/image/image.service";
import {useState} from "react";
import {Image} from "@/resources/image/image.resource";
import Link from "next/link";

export default function GaleriaPage(){

    const userService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [extension, setExtension] = useState<string>('');
    const [msgAlert, setMsgAlert] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function seachImages(){
        setLoading(true);
        const result = await userService.buscar(query, extension);
        setImages(result)
        if (result.length !== 0) {
            setMsgAlert("INFO: Click sobre as imagem para fazer download da imagem desejada!");
        } else {
            setMsgAlert(""); // Clear the message if no images are found
        }
        setLoading(false);
    }

    function renderImageCard(image: Image){
        return (
            <ImageCard
                key={image.url}
                src={image.url}
                nome={image.name}
                tamanho={image.size}
                dataUpload={image.uploadDate}
                extension={image.extension}
            />
        )
    }

    function renderImageCards(){
        return images.map(renderImageCard)
    }

    return <Template loading={loading}>
        <h1 className="font-bold text-4xl">Galeria</h1>

        <section className="flex flex-col items-center justify-center py-20 bg-neutral-800 my-4 rounded-lg">
            <div className="flex space-x-4">
                <input onChange={event => setQuery(event.target.value)}
                       className="border-2 border-indigo-800 px-3 py-2
                       rounded-lg text-white bg-transparent" type="text"/>

                <button className="w-32 rounded-lg text-white bg-neutral-700 p-2">
                    <select onChange={event => setExtension(event.target.value)}
                           className="text-white bg-neutral-700 w-full" >
                        <option value="">All formats</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                        <option value="GIF">GIF</option>
                    </select>
                </button>
                <button onClick={seachImages} title="Click para buscar imagem/imagens"
                        className="w-32 px-3 py-2 bg-gradient-to-r from-indigo-800 to-indigo-900
                    text-white rounded-lg transition duration-300 ease-in-out
                    hover:from-indigo-700 hover:to-indigo-700 hover:bg-opacity-70">
                    Search
                </button>
                <Link href="/formulario">
                    <button title="Click para adicionar imagem"
                        className="w-32 px-3 py-2 bg-gradient-to-r from-rose-700 to-rose-800
                        text-white rounded-lg transition duration-300 ease-in-out
                        hover:from-rose-600 hover:to-rose-600 hover:bg-opacity-70">
                        Add new
                    </button>
                </Link>
            </div>
        </section>

        <section className="">
            <h1 className="text-xs text-indigo-200">{msgAlert}</h1>
        </section>

        <section className="grid grid-cols-3 gap-5">
            {
                renderImageCards()
            }
        </section>
    </Template>
}