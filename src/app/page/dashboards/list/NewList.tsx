/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { z } from 'zod';
import { Button, Grid, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomInput } from '../../../utils/components/CustomInput';
import { styled } from '@mui/material/styles';

const NewListFormSchema = z.object({
    listName: z.string()
        .min(1, 'Field is required')
        .max(255, 'Maximum of 255 characters')
        .trim(),
    listType: z.string().min(1, 'Field is required')
})

type NewListForm = z.infer<typeof NewListFormSchema>

const Form = styled('form')(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
        width: '90%',
    },
    [theme.breakpoints.up('md')]: {
        width: '85%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '55%',
    },
    [theme.breakpoints.up('xl')]: {
        width: '50%',
    },
}));

export function NewList(): ReactElement {
    const { control, handleSubmit } = useForm<NewListForm>({
        resolver: zodResolver(NewListFormSchema),
        mode: 'all'
    });

    const onSubmit: SubmitHandler<NewListForm> = (data) => {
        console.log('SUBMITED: ', data);
    }

    return (
        <Grid container justifyItems="center" justifyContent="center" alignItems="center" direction="row">
            <Form onSubmit={ handleSubmit(onSubmit) }>
                <Grid item xs={ 12 } textAlign="center">
                    <Typography variant="h3">
                        New List
                    </Typography>
                </Grid>
                <Grid item xs={ 12 } paddingTop={ 3 }>
                    <CustomInput
                        name="listName"
                        fieldLabel="List Name"
                        control={ control }
                        defaultValue=""
                    />
                </Grid>
                <Grid item xs={ 12 } paddingTop={ 3 }>
                    <CustomInput
                        name="listType"
                        fieldLabel="List Type"
                        control={ control }
                        defaultValue=""
                    />
                </Grid>
                <Grid container item xs={ 12 } justifyContent="flex-end">
                    <Button type="submit">Save</Button>
                </Grid>
            </Form>
        </Grid>
    );
}
