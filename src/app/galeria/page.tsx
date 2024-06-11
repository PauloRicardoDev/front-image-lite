"use client"
import {ImageCard, Template} from "@/components";
import {useImageService} from "@/resources/image/image.service";
import {useState} from "react";
import {Image} from "@/resources/image/image.resource";

export default function GaleriaPage(){

    const userService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [extension, setExtension] = useState<string>('');

    async function seachImages(){
        const result = await userService.buscar();
        setImages(result)
        // console.table(result);
        console.log(query);
    }

    function renderImageCard(image: Image){
        return (
            <ImageCard
                src={image.url}
                nome={image.name}
                tamanho={image.size}
                dataUpload={image.uploadDate}
            />
        )
    }

    function renderImageCards(){
        return images.map(renderImageCard)
    }

    return <Template>
        <h1 className="font-bold ">Galeria</h1>

        <section className="flex flex-col items-center justify-center my-5">
            <div className="flex space-x-4">
                <input onChange={event => setQuery(event.target.value)}
                       className="border-2 border-indigo-800 px-3 py-2
                       rounded-lg text-white bg-transparent" type="text"/>

                <select className="px-3 py-2 rounded-lg text-white bg-neutral-800">
                    <option>All formats</option>
                </select>
                <button onClick={seachImages} className="px-3 py-2 bg-gradient-to-r from-indigo-800 to-indigo-900
                 bg-opacity-50 text-white rounded-lg">
                    Search
                </button>
                <button className="px-3 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500
                bg-opacity-50 text-white rounded-lg">
                    Add new
                </button>
            </div>
        </section>

        <section className="grid grid-cols-3 gap-5">
            {
                renderImageCards()
            }
        </section>
    </Template>
}