import { ButtonHTMLAttributes } from 'react';

import './button.scss'; // A importação de estilização deve ficar antes do type 

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}    

export function Button ({ isOutlined = false, ...props}: ButtonProps) {
    return (
        <button 
         className={`button ${isOutlined ? 'outlined' : ''}`} 
         {...props} />
         
    )
}