import React, { ReactElement } from 'react';
import { z } from 'zod';
import { Button, Grid, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomInput } from '../../../utils/components/CustomInput';

const NewListFormSchema = z.object({
    listName: z.string()
        .min(1, 'Field is required')
        .max(255, 'Maximum of 255 characters')
        .trim(),
    listType: z.string().min(1, 'Field is required')
})

type NewListForm = z.infer<typeof NewListFormSchema>

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
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid item xs={ 12 }>
                    <Typography variant="h3">
                        Create a New List
                    </Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <CustomInput
                        name="listName"
                        fieldLabel="List Name"
                        control={ control }
                        defaultValue=""
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <CustomInput
                        name="listType"
                        fieldLabel="List Type"
                        control={ control }
                        defaultValue=""
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <Button type="submit">Save</Button>
                </Grid>
            </form>
        </Grid>
    );
}
