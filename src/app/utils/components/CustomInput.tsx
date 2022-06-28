import React, { ReactElement } from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';
import { FieldPathValue, UnpackNestedValue } from 'react-hook-form/dist/types';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

export type CustomInputProp<T> = {
    fieldLabel?: string;
    fieldPlaceholder?: string;
    control: Control<T>;
    defaultValue: UnpackNestedValue<FieldPathValue<T, any>>;
    TextFieldProps?: TextFieldProps
} & UseControllerProps<T>;

export function CustomInput<T>({ name, fieldLabel, fieldPlaceholder, control, defaultValue, TextFieldProps, ...rest }: CustomInputProp<T>): ReactElement {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, onBlur, value }, fieldState: { error }}) => (
                <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={fieldLabel}
                    placeholder={fieldPlaceholder}
                    variant="outlined"
                    {...TextFieldProps}
                />
            )}
            {...rest}
        />
    );
}
