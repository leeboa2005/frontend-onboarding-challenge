import React from 'react';

interface FormInputProps {
    name: string;
    type?: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ name, type = 'text', value, placeholder, onChange }) => {
    return (
        <input
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
    );
};

export default FormInput;
