import React from 'react';
import { TextField } from '@mui/material';

interface CustomInputProps {
    label: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    size?: 'small' | 'medium';
    autoComplete?: string;
    error?: boolean;
    helperText?: React.ReactNode;
    multiline?: boolean;
    rows?: number;
    name?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    inputRef?: any;
}

const textfieldStyles = (error?: boolean) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: error ? '#d32f2f' : '#bbbbbb'
        },
        '&:hover fieldset': {
            borderColor: error ? '#d32f2f' : '#888888'
        },
        '&.Mui-focused fieldset': {
            borderColor: error ? '#d32f2f' : 'black'
        }
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: error ? '#d32f2f' : 'black'
    }
});

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    disabled = false,
    autoFocus = false,
    size = 'small',
    autoComplete,
    error,
    helperText,
    multiline,
    rows,
    name,
    onBlur,
    inputRef,
    ...rest
}) => {
    return (
        <TextField
            label={label}
            type={type}
            fullWidth
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            size={size}
            sx={textfieldStyles(error)}
            autoComplete={autoComplete}
            error={error}
            helperText={helperText}
            multiline={multiline}
            rows={rows}
            name={name}
            onBlur={onBlur}
            inputRef={inputRef}
            InputLabelProps={type === 'date' ? { shrink: true } : undefined}
            {...rest}
        />
    );
};

export default CustomInput;
