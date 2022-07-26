import React from 'react';
import { TextField } from '@mui/material';

const FormInput = ({ register, errors, defaultValue, label, inputName, type = 'test', required = true }) => {
  return (
    <TextField
        variant='filled'
        label={label}
        error={Boolean(errors[inputName])}
        { ...register(inputName, required ?  required: `${inputName} is required`)}
        required={required}
        type={type}
        defaultValue={defaultValue}
    >
    </TextField>
  )
}

export default FormInput