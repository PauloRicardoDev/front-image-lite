"use client"

import {ImageCard, Template, Button} from "@/components";
import { IoIosImage, IoIosAdd, IoIosSearch } from "react-icons/io";
import {useImageService} from "@/resources/image/image.service";
import React, {useState} from "react";
import {Image} from "@/resources/image/image.resource";
import Link from "next/link";
import './page_galery.css'
import { Box, TextField } from '@mui/material';
import {Header_galery, Template_galery} from "@/components/Template";

export default function GaleriaPage(){

    const userService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [extension, setExtension] = useState<string>('');
    const [msgAlert, setMsgAlert] = useState<string>('As imagens aparecerão abaixo...');
    const [loading, setLoading] = useState<boolean>(false);

    async function seachImages(){
        setLoading(true);
        const result = await userService.buscar(query, extension);
        setImages(result)
        setLoading(false);
        setMsgAlert("")
        console.log(result)
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

    return <Template_galery loading={loading}>


        <section className="banner w-full container_filter">

            <Header_galery/>

            <section className="container mx-auto mt-8">

                <div className="items-center mb-14 gap-10 flex flex-col justify-between">
                    <h1 className="font-bold text-4xl text-center">Por favor, utilize o filtro para buscar imagens.</h1>
                    <span className="observation">Filtre por formatos, tags ou nome da imagem.</span>
                </div>

                <section className="container_filter-box flex flex-row justify-between bg-neutral-800 rounded-lg p-5">
                    <div className="container_filter-box-search space-x-4 flex flex-row items-center justify-start">
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': {
                                    width: {
                                        xs: '100%', // 100% largura para telas pequenas
                                        sm: '300px', // 300px largura para telas médias
                                        md: '400px', // 400px largura para telas grandes
                                        lg: '350px', // 500px largura para telas extra grandes
                                    },
                                },
                                '& .MuiInputBase-input': {color: '#ffffff'},
                                '& .MuiInputLabel-root': {color: '#818181'},
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#818181', borderRadius: '7px'
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#818181',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#5e5e5e',
                                },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                required
                                id="outlined-required"
                                label="Busque por imagem"
                                // size="small"
                                defaultValue=""
                                onChange={event => setQuery(event.target.value)}
                            />
                        </Box>

                        <button className="w-40 rounded-lg text-white p-4
                        bg-gradient-to-r from-neutral-700 to-neutral-700
                        transition duration-300 ease-in-out
                        hover:from-indigo-700 hover:to-indigo-700 hover:bg-opacity-70">
                            <select onChange={event => setExtension(event.target.value)}
                                    className="text-white w-full border-none outline-none bg-transparent">
                                <option className="bg-neutral-700" value="">All formats</option>
                                <option className="bg-neutral-700" value="PNG">PNG</option>
                                <option className="bg-neutral-700" value="JPEG">JPEG</option>
                                <option className="bg-neutral-700" value="GIF">GIF</option>
                            </select>
                        </button>

                        <Button
                            onClick={seachImages}
                            style='bg-gradient-to-r from-neutral-700 to-neutral-700
                            transition duration-300 ease-in-out  p-5 rounded-lg
                            hover:from-indigo-700 hover:to-indigo-700 hover:bg-opacity-70'
                            // label='Search'
                            title='Click para buscar imagem/imagens'
                        >
                            <IoIosSearch/>
                        </Button>

                    </div>

                    <Link href="/formulario" className="container_filter-box-add">
                        <Button
                            style='bg-gradient-to-r from-neutral-700 to-neutral-700
                            transition duration-300 ease-in-out p-5 rounded-lg
                            hover:from-indigo-700 hover:to-indigo-700 hover:bg-opacity-70'
                            // label='Add new'
                            title='Click para adicionar imagem'
                        >
                            <IoIosAdd/>
                        </Button>
                    </Link>
                </section>

            </section>
        </section>

        <section className={`${msgAlert != '' && loading != true ? 'p-44' : 'hidden'}`}>
            <h1 className="text-2xl text-neutral-700 text-center">{msgAlert}</h1>
        </section>

        <section className="container_cards my-14 grid grid-cols-3 gap-5 container mx-auto">
            { renderImageCards() }
        </section>
    </Template_galery>
}