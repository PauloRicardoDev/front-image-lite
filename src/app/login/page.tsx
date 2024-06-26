'use client'

import {Button, FieldError, InputPrimary, RenderIf, Template, useNotification} from "@/components";
import {useAuth} from "@/resources";
import React, {useState} from "react";
import {useFormik} from "formik";
import {formScheme, LoginForm, validationScheme} from './formScheme'
import './page_login.css'
import {useRouter} from 'next/navigation';
import {AccessToken, Credentials, User} from "@/resources/user/user.resources";


export default function Login(){

    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);
    const notification = useNotification()
    const router = useRouter()
    const auth = useAuth()

    const formik = useFormik<LoginForm>({
        initialValues: formScheme,
        validationSchema: validationScheme,
        onSubmit:onSubmit
    })

    async function onSubmit(values: LoginForm){
        if (!newUserState){
            const credentials: Credentials = {
                email: values.email,
                password: values.password
            }

            try {
               const accessToken: AccessToken = await auth.authenticate(credentials);
               auth.initSession(accessToken);
               router.push('/galeria');
            }catch (error: any){
                const messege = error?.message;
                notification.notify(messege, 'error');
            }
        }
        else {
            const user : User = {
                email: values.email,
                name: values.name,
                password: values.password,
            }

            try {
                await auth.save(user);
                notification.notify("Usuário salvo com sucesso", "success");
                formik.resetForm()
                setNewUserState(false);
            }catch (error: any){
                const messege = error?.message;
                notification.notify(messege, 'error');
            }
        }
    }

    return(
        <main className="container_principal-banner">
            <Template loading={loading}>
                <div className="flex justify-center items-center">
                    <section className="grid grid-cols-1 gap-5 items-center my-20">

                        <h1 className="font-extrabold text-4xl text-white">{ newUserState ? 'Nova Conta' : 'Login'}</h1>
                        <h2 className="text-white">{ newUserState ? 'Preencha os campos abaixo!' : 'Entre em sua conta!'}</h2>

                        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-5 items-center">
                            <RenderIf condition={newUserState}>
                                <InputPrimary
                                    id={'name'}
                                    label={'Informe nome usuário'}
                                    placeholder={'Ex: Fulano de...'}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />

                                <FieldError error={formik.errors.name}/>
                            </RenderIf>


                            <InputPrimary
                                id={'email'}
                                label={'Informe email'}
                                placeholder={'Ex: email@e...'}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />

                            <FieldError error={formik.errors.email}/>

                            <InputPrimary
                                id={'password'}
                                label={'Informe senha'}
                                placeholder={'Ex: EDd121...'}
                                type={'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />

                            <FieldError error={formik.errors.password}/>

                            <RenderIf condition={newUserState}>
                                <InputPrimary
                                    id={'passwordMatch'}
                                    label={'Confirme senha'}
                                    placeholder={'Ex: EDd121...'}
                                    type={'password'}
                                    value={formik.values.passwordMatch}
                                    onChange={formik.handleChange}
                                />

                                <FieldError error={formik.errors.passwordMatch}/>
                            </RenderIf>

                            <hr className="border-0 h-0.5 bg-neutral-600"/>

                            <RenderIf condition={newUserState}>
                                <section className="flex justify-between items-center gap-36">
                                    <Button style={"w-full rounded-lg text-white p-4 " +
                                        "bg-gradient-to-r from-neutral-700 to-neutral-700" +
                                        " transition duration-300 ease-in-out hover:from-indigo-700" +
                                        " hover:to-indigo-700 hover:bg-opacity-70"}
                                            type={"submit"}
                                            label={"Save"}
                                    />

                                    <Button style={"w-full rounded-lg text-white p-4 " +
                                        "bg-gradient-to-r from-neutral-800 to-neutral-800 " +
                                        "transition duration-300 ease-in-out p-3 " +
                                        "rounded-lg hover:from-rose-700 hover:to-rose-700 hover:bg-opacity-70"}
                                            type={"button"}
                                            label={"Cancelar"}
                                            onClick={event => setNewUserState(false)}
                                    />
                                </section>
                            </RenderIf>

                            <RenderIf condition={!newUserState}>
                                <section className="flex justify-between flex-col items-center gap-5">
                                    <Button style={"w-full rounded-lg text-white p-4 " +
                                        "bg-gradient-to-r from-neutral-700 to-neutral-700" +
                                        " transition duration-300 ease-in-out hover:from-indigo-700" +
                                        " hover:to-indigo-700 hover:bg-opacity-70"}
                                            type={"submit"}
                                            label={"Entrar"}
                                    />

                                    <Button style={"w-full rounded-lg text-white p-4 " +
                                        "bg-gradient-to-r from-neutral-800 to-neutral-800 " +
                                        " transition duration-300 ease-in-out hover:from-indigo-700" +
                                        " hover:to-indigo-700 hover:bg-opacity-70"}
                                            type={"button"}
                                            label={"Criar Conta"}
                                            onClick={event => setNewUserState(true)}
                                    />
                                </section>
                            </RenderIf>


                        </form>
                    </section>
                </div>
            </Template>
        </main>
    )
}