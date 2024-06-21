import * as Yup from 'yup'

export interface FormProps{
    name?: string;
    tags?: string;
    file?: string | Blob;
}

export const formScheme: FormProps = {name: '', tags: '', file: ''}

export const formValidationScheme = Yup.object().shape({
    name: Yup.string()
        .trim()
        .required('Campo obrigatório!')
        .max(50, "O nome ultrapassa o limite de 50 caracteres"),

    tags: Yup.string()
        .trim()
        .required('Campo obrigatório!')
        .max(50, "O Valor digitado ultrapassa o limite de 50 caracteres"),

    file: Yup.mixed<Blob>().required('Selecione uma imagem para upload')
        .test('size', 'O tamanho da imagem não pode ser maior que 10MB', (file) => {
            return file.size < 10000000;
        })
        .test('type', 'Formatos aceitos: JPEG, PNG, GIF', (file) => {
            return file.type === 'image/jpeg' || file.type === 'image/png'  || file.type === 'image/gif'
        } )
})