'use client'

import Tooltip from '@mui/material/Tooltip';
import { IoIosCloudDownload } from "react-icons/io";

interface ImageCardProps{
    src?: string;
    nome?: string;
    tamanho?: number;
    dataUpload?: string
    extension?: string
}


export const ImageCard: React.FC<ImageCardProps> = ( {src, nome, tamanho, dataUpload, extension } : ImageCardProps) => {

    function download(){
        window.open(src, "_blank")
    }

    return (
        <section>
            <Tooltip title="Click sobre as imagem para fazer download" placement="top">
                <div className="card relative bg-neutral-800 rounded-md
                    transition-transform ease-in duration-300
                    transform hover:shadow-lg hover:-translate-y-2 hover:100">

                    <section className="relative">
                        <div onClick={download}  className="absolute top-0 left-0 z-40 backdrop-blur bg-neutral-800/30
                            rounded-full text-white p-3 m-4 cursor-pointer">
                            <IoIosCloudDownload className="text-2xl text-neutral-400" />
                        </div>
                        <img onClick={download} className="cursor-pointer h-56 w-full object-cover rounded-md" src={src}
                             alt="imagem"/>
                    </section>


                    <section className="py-4">
                        <div className="m-4">
                            <h3 className="text-xl font-semibold mb-2 text-gray-600">{nome}</h3>
                            <p className="text-xs text-indigo-400">Extensão - {extension}</p>
                            <p className="text-xs my-2 text-indigo-400">Tamanho - {formatBytes(tamanho)}</p>
                            <p className="text-xs text-indigo-400">Data de Upload - {dataUpload}</p>
                        </div>
                    </section>
                </div>
            </Tooltip>
        </section>

    )
}

function formatBytes(bytes: number = 0, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}