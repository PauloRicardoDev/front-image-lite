import React from "react";

interface ButtonProps{
    style?:string
    label?: string
    title?:string
    onClick?: (event: any) => void;
}

export const Button: React.FC<ButtonProps> = (
    {style, label, title, onClick}
) => {
    return (
        <button
            onClick={onClick}
            title={title}
            className={`w-32 px-3 py-2 rounded-lg ${style}`}>
            {label}
        </button>
    )
}