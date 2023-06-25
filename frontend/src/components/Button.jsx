import React from 'react';
import styles from './styles/Button.module.css';

const Button = ({ text, onClick, color, width }) => {
    const buttonStyle = {
        backgroundColor: color,
        width: width,
    };

    return (
        <button onClick={onClick} className={styles.button} style={buttonStyle}>
            {text}
        </button>
    );
};

export default Button;
