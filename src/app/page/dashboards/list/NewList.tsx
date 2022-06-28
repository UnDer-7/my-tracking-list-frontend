/** @jsxImportSource @emotion/react */
import React, { ReactElement, useState } from 'react';
import { z } from 'zod';
import { Button, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomInput } from '../../../utils/components/CustomInput';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon } from '@mui/icons-material';

const NewListFormSchema = z.object({
    listName: z.string()
        .min(1, 'Field is required')
        .max(255, 'Maximum of 255 characters')
        .trim(),
    listType: z.string().min(1, 'Field is required')
})

const SearchFormSchema = z.object({
    searchArgs: z.string().trim().min(1, 'Field is required')
});

type NewListForm = z.infer<typeof NewListFormSchema>
type SearchFormType = z.infer<typeof SearchFormSchema>

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
    const { control, handleSubmit } = useForm<SearchFormType>({
        resolver: zodResolver(SearchFormSchema),
        mode: 'onSubmit'
    });

    const [listType, setListType] = useState<'TV' | 'GAMES' | 'MOVIES'>('TV')
    const onSubmit: SubmitHandler<SearchFormType> = (data) => {
        console.log('SUBMITTED: ', data);
    }

    return (
        <Grid container justifyItems="center" justifyContent="center" alignItems="center" direction="row">
            <Form onSubmit={ handleSubmit(onSubmit) }>
                <Grid item xs={ 12 } textAlign="center">
                    <Typography variant="h3">
                        New List
                    </Typography>
                </Grid>
                <Grid container direction="row" justifyContent="space-around" spacing={ 1 }>
                    <Grid item xs={ 1 }>
                        <FormControl variant="standard">
                            <Select label="Type" autoWidth={ false } value={ listType }
                                    onChange={ (e) => setListType(e.target.value as any) }>
                                <MenuItem value="TV">TV</MenuItem>
                                <MenuItem value="GAMES">Games</MenuItem>
                                <MenuItem value="MOVIES">Movies</MenuItem>
                                <MenuItem value="MOVIES">Movies</MenuItem>
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={ 10 }>
                        <CustomInput
                            name="searchArgs"
                            control={ control }
                            fieldPlaceholder="Search"
                            defaultValue=""
                            TextFieldProps={ { variant: 'standard' } }
                        />
                    </Grid>
                    <Grid item xs={ 1 }>
                        <Button type="submit" startIcon={ <SearchIcon/> } variant="contained">
                            Search
                        </Button>
                    </Grid>
                </Grid>
                {/*<Grid container item xs={ 12 } justifyContent="flex-end">*/}
                {/*    <Button>Save</Button>*/}
                {/*</Grid>*/}
            </Form>
        </Grid>
    );
}
