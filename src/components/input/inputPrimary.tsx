import React from "react"
import { TextField } from '@mui/material';

interface inputPrimaryProps {
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    id?: string;
    value?: string;
}

// Previne o comportamento padrão de submit do formulário
const handleSubmit = (event: any) => {
    event.preventDefault();
};

export const InputPrimary: React.FC<inputPrimaryProps> = ({...props}) => {
    return (
        <TextField
            sx={{
                width: {
                    xs: '100%', // 100% largura para telas pequenas
                    sm: '100%', // 100% largura para telas médias
                    md: '500px', // 500px largura para telas grandes
                    lg: '500px', // 500px largura para telas extra grandes
                },
                '& .MuiInputBase-input': { color: '#ffffff', fontFamily: 'Poppins, Arial, sans-serif' },
                '& .MuiInputLabel-root': { color: '#818181' },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#818181',
                    borderRadius: '7px',
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#818181',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#949494',
                },
            }}
            required
            id={props.id}
            label={props.label}
            defaultValue=""
            onChange={props.onChange}
            placeholder={props.placeholder}
            autoComplete="new-password, off"
            value={props.value}
            // autoComplete="off"
            // size="small"
        />
    )
}
