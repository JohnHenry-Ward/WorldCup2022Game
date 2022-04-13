/* Libraries */
import React from "react";

/* Internal Requirements */
import '../css/Button.css';

const Button = ({text, className, onClick}) => {
    return (
        <button 
            className={className}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;