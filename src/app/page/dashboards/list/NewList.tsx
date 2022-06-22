import React, { ReactElement } from 'react';
import { Grid, TextField, Typography } from '@mui/material';

export function NewList(): ReactElement {
    return (
        <Grid container justifyItems="center" justifyContent="center" alignItems="center" id="pai">
            <Grid item id="filhoName" xs={ 12 }>
                <Typography variant="h3" component="div">
                    Create a New List
                </Typography>
            </Grid>
            <Grid item id="filhoSearch" xs={ 12 }>
                <TextField label="Seach By" variant="standard"/>
            </Grid>
        </Grid>
    );
}
