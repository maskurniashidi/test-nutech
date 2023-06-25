import React from 'react';
import styles from './styles/Input.module.css';

const Input = ({ type, name, value, onChange, placeholder, width }) => {
    const inputStyle = {
        width: width
    };

    return (
        <input
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={styles.input}
            style={inputStyle}
            autoComplete="off"
        />
    );
};

export default Input;
