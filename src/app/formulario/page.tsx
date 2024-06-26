"use client"

import {Button, FieldError, InputPrimary, RenderIf, Template, useNotification, AuthenticatedPage} from "@/components";
import {useImageService} from "@/resources/image/image.service";
import { IoMdClose, IoMdSave, IoIosArrowRoundBack } from "react-icons/io";
import React, {useState} from "react";
import {useFormik} from "formik";
import {FormProps, formScheme, formValidationScheme} from './formScheme'
import Link from "next/link";
// import {StaticImageData} from 'next/image';
// import banner from '/src/assets/banner.png'; // Caminho absoluto

export default function FormularioPage(){

    const [loading, setLoading] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<string>();
    const service = useImageService();
    const notification = useNotification();
    // const logoUrl: string = (banner as StaticImageData).src;

    const formik = useFormik<FormProps>({
        initialValues: formScheme,
        onSubmit: handleSubmit,
        validationSchema: formValidationScheme
    })


    function handleSubmit(dados: FormProps){
        setLoading(true);
        const formData = new FormData();
        formData.append('name', String(dados.name));
        // @ts-ignore
        formData.append('file', dados.file);
        formData.append('tags', String(dados.tags));

        service.salvar(formData);

        formik.resetForm();
        setImagePreview('')
        setLoading(false);

        notification.notify('Imagem salva com sucesso!', 'success');
    }

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files){
            const file = event.target.files[0]
            formik.setFieldValue("file", file)
            const imageURL = URL.createObjectURL(file)
            setImagePreview(imageURL)
        }
    }

    function clear(){
        formik.resetForm();
        setImagePreview('')
    }

    return (
       <AuthenticatedPage>
           <Template loading={loading}>
               <section className="flex flex-col justify-center container mx-auto p-10 text-white">

                   <Link href="galeria">
                       <section className="mb-10 w-48 flex flex-row justify-start gap-1 items-center
                         bg-gradient-to-r from-neutral-800 to-neutral-800 rounded-lg p-3
                        transition duration-300 ease-in-out
                        hover:from-indigo-700 hover:to-indigo-700 hover:bg-opacity-70"
                       >
                           <IoIosArrowRoundBack className="font-bold text-3xl" />
                           <h1 className="font-bold text-1xl">Voltar / Galeria</h1>
                       </section>
                   </Link>


                   <section className="mb-10">
                       <h1 className="font-bold text-3xl">Nova Imagem</h1>
                       <p className="text-xs mt-3">* Preencha os campos com atenção!</p>
                   </section>

                   <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-5 bg-neutral-800 rounded-lg p-10">

                       <InputPrimary
                           onChange={formik.handleChange}
                           id={"name"}
                           label={"Informe uma nome para imagem: "}
                           placeholder={"Ex: Casa na ..."}
                           value={formik.values.name}
                       />

                       <FieldError error={formik.errors.name} />

                       <InputPrimary
                           onChange={formik.handleChange}
                           id={"tags"}
                           label={"Informe os nomes das tags separadas por vírgula: "}
                           placeholder={"Ex: Casa, Praia, Verão ..."}
                           value={formik.values.tags}
                       />

                       <FieldError error={formik.errors.tags} />

                       <div>
                           <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-neutral-400">Image:
                               *</label>
                           <div
                               className="mt-2 flex justify-center rounded-lg border border-dashed border-neutral-500 px-6 py-10">

                               <div className="text-center">
                                   <RenderIf condition={!imagePreview}>
                                       <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true" data-slot="icon">
                                           <path
                                               fillRule="evenodd"
                                               d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                               clipRule="evenodd"
                                           />
                                       </svg>
                                   </RenderIf>
                                   <div className="mt-4 flex text-sm leading-6 text-gray-600 items-center mb-5">
                                       <label
                                           className="relative cursor-pointer rounded-md bg-neutral-600 p-2
                                            font-semibold text-neutral-400
                                            bg-gradient-to-r from-neutral-700 to-neutral-700
                                            transition duration-300 ease-in-out
                                            hover:from-indigo-700 hover:to-indigo-700 hover:bg-opacity-70"
                                       >
                                           <RenderIf condition={!imagePreview}>
                                               <span>Upload a file</span>
                                           </RenderIf>

                                           <RenderIf condition={!!imagePreview}>
                                               <img src={imagePreview}/>
                                           </RenderIf>
                                           <input
                                               onChange={onFileUpload}
                                               id="file"
                                               name="file-upload"
                                               type="file" className="sr-only"
                                           />
                                       </label>

                                       <RenderIf condition={!imagePreview}>
                                           <p className="pl-1">or drag and drop</p>
                                       </RenderIf>

                                   </div>
                                   <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                               </div>

                           </div>
                       </div>

                       <FieldError error={formik.errors.file} />

                       <div className="flex flex-row justify-start gap-5">
                           <Button
                               label={"Salvar"}
                               type={"submit"}
                               style={"w-28 bg-gradient-to-r from-neutral-700 to-neutral-700 transition duration-300 ease-in-out p-3 rounded-lg hover:from-indigo-700 hover:to-indigo-700 hover:bg-opacity-70"}
                           >
                               <IoMdSave/>
                           </Button>

                           <Button
                               onClick={clear}
                               label={"Cancelar"}
                               type={"button"}
                               style={"w-32 bg-gradient-to-r from-neutral-700 to-neutral-700 transition duration-300 ease-in-out p-3 rounded-lg hover:from-rose-700 hover:to-rose-700 hover:bg-opacity-70"}
                           >
                               <IoMdClose/>
                           </Button>
                       </div>
                   </form>
               </section>
           </Template>
       </AuthenticatedPage>
    )
}