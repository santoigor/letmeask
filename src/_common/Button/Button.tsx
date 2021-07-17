import { ButtonHTMLAttributes } from 'react';

import './button.scss'; // A importação de estilização deve ficar antes do type 

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button (props: ButtonProps) {
    return (
        <button className="button" {...props} />
         
    )
}