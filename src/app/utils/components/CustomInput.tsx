import React, { ReactElement } from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';
import { FieldPathValue, UnpackNestedValue } from 'react-hook-form/dist/types';
import { TextField } from '@mui/material';

export type CustomInputProp<T> = {
    fieldLabel: string;
    control: Control<T>;
    defaultValue: UnpackNestedValue<FieldPathValue<T, any>>;
} & UseControllerProps<T>;

export function CustomInput<T>({ name, fieldLabel, control, defaultValue, ...rest }: CustomInputProp<T>): ReactElement {
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
                    variant="outlined"
                />
            )}
        />
    );
}
