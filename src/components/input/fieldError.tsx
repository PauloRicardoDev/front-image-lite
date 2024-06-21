import React from "react";

interface FieldErrorProps{
    error : any | null
}

export const FieldError: React.FC<FieldErrorProps> = ({...props}) => {
    if (props.error){
        return (
            <span className="text-xs text-red-500">{props.error}</span>
        )
    }
    return null;
}