import * as Yup from 'yup'

export interface LoginForm{
    name?: string;
    email: string;
    password: string;
    passwordMatch?: string;
}

export const formScheme: LoginForm = {email: '', name: '', password: '', passwordMatch: ''}

export const validationScheme = Yup.object().shape({
    email: Yup.string().trim().required('Campo obrigatório').email('Email inválido'),
    password: Yup.string().required('Campo obrigatório').min(8,'A senha deve ter no mínimo 8 caracteres'),
    passwordMatch: Yup.string().oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
})