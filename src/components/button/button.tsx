import React from "react";

interface ButtonProps{
    children?: React.ReactNode
    style?:string
    label?: string
    title?:string
    onClick?: (event: any) => void;
}

export const Button: React.FC<ButtonProps> = (
    {children,style, label, title, onClick}
) => {
    return (
        <button className={`${children ? 'flex flex-row items-center justify-between': 'text-center'} 
            ${style}`} onClick={onClick} title={title}>
            {label}
            {children}
        </button>
    )
}