import React from "react"
import { TextField } from '@mui/material';

interface inputPrimaryProps {
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    id?: string;
    value?: string;
    type?: string;
}

// Previne o comportamento padrão de submit do formulário
const handleSubmit = (event: any) => {
    event.preventDefault();
};

export const InputPrimary: React.FC<inputPrimaryProps> = ({type = "text", ...props}) => {
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
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4338CA', // Cor da borda quando o campo está focado
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#949494',
                },
            }}
            required
            id={props.id}
            label={props.label}
            onChange={props.onChange}
            placeholder={props.placeholder}
            autoComplete="new password"
            value={props.value}
            type={type}
            // autoComplete="off"
            // size="small"
        />
    )
}
