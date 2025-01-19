import React from 'react';

interface SubmitButtonProps {
    label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
    return (
        <button
            type="submit"
            className="p-2 text-white font-bold rounded  bg-orange-400 text-white rounded hover:bg-orange-500"
        >
            {label}
        </button>
    );
};

export default SubmitButton;
