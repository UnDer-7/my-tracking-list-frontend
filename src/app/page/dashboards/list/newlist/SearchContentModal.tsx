import React, { ReactElement, useState } from 'react';
import {
    AppBar,
    Button,
    CircularProgress,
    Dialog,
    Fade,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Toolbar,
    Typography
} from '@mui/material';
import { Runnable } from '../../../../utils/types/HelperTyps';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomInput } from '../../../../utils/components/CustomInput';

export type SearchContentModalType = {
    isOpen: boolean,
    onClose: Runnable,
};

const SearchFormSchema = z.object({
    searchArgs: z.string().trim().min(1, 'Field is required')
});

type SearchFormType = z.infer<typeof SearchFormSchema>

const rows = Array(20).fill(0).map((_, i) => (
    { id: i, poster: 'link', title: 'Sopranos', releaseDate: '1999' }
));

function Header({ onClose }: Pick<SearchContentModalType, 'onClose'>): ReactElement {
    return (
        <AppBar sx={ { position: 'relative' } }>
            <Toolbar style={ { width: 'inherit' } }>
                <Grid container direction="row">
                    <Grid container item xs={ 6 } justifyContent="flex-start" justifyItems="flex-start">
                        <Grid item>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={ onClose }
                            >
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                        <Grid>
                            <Typography sx={ { ml: 2, flex: 1 } } variant="h6" component="div">
                                Search
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={ 6 } direction="row" justifyContent="flex-end" justifyItems="flex-end">
                        <Button autoFocus color="inherit" onClick={ onClose }>
                            save
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export function SearchContentModal({ isOpen, onClose }: SearchContentModalType): React.ReactElement {
    const [listType, setListType] = useState<'TV' | 'GAMES' | 'MOVIES'>('TV')
    const { control, handleSubmit } = useForm<SearchFormType>({
        resolver: zodResolver(SearchFormSchema),
        mode: 'onSubmit'
    });

    const onSubmit: SubmitHandler<SearchFormType> = (data) => {
        console.log('SUBMITTED: ', data);

    }

    return (
        <>
            <Dialog fullScreen open={ isOpen } onClose={ onClose } TransitionComponent={ Fade } sx={
                {
                    '& .MuiPaper-root': {
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }
                }
            }>
                <Header onClose={ onClose }/>
                <Grid
                    container
                    justifyContent="center"
                    direction="row"
                    paddingTop={ 3 }
                    alignItems="flex-start"
                >
                    <Grid item container lg={ 5 } alignItems="flex-end" component="form"
                          onSubmit={ handleSubmit(onSubmit) }>
                        <Grid item xs={ 1.50 }>
                            <FormControl variant="standard">
                                <Select autoWidth={ true } value={ listType }
                                        onChange={ (e) => setListType(e.target.value as any) }>
                                    <MenuItem value="TV">TV</MenuItem>
                                    <MenuItem value="GAMES">Games</MenuItem>
                                    <MenuItem value="MOVIES">Movies</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={ 9.5 }>
                            <CustomInput
                                control={ control }
                                defaultValue=""
                                name="searchArgs"
                                fieldPlaceholder="Search"
                                TextFieldProps={ {
                                    variant: 'standard',
                                    InputProps: {
                                        endAdornment: (
                                            <CircularProgress/>
                                        )
                                    }
                                } }
                            />
                        </Grid>
                        <Grid item xs={ 1 }>
                            <Button type="submit" startIcon={ <SearchIcon/> } variant="contained">
                                Search
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={ 12 } component={ Paper } margin={ 1 }>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Poster</TableCell>
                                        <TableCell align="left">Title</TableCell>
                                        <TableCell align="left">Release Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { rows.map((row) => (
                                        <TableRow hover role="checkbox" tabIndex={ -1 } key={ row.id }>
                                            <TableCell align="left">{ row.poster }</TableCell>
                                            <TableCell align="left">{ row.title }</TableCell>
                                            <TableCell align="left">{ row.releaseDate }</TableCell>
                                        </TableRow>
                                    )) }

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[20]}
                            component="div"
                            count={ rows.length }
                            rowsPerPage={ 20 } // API do Movie DB sempre retorna 20
                            page={ 1 }
                            onPageChange={ (_, page) => {
                                console.log('Page Change ', page);
                            } }
                            onRowsPerPageChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                                console.log('Row Change ', e.target.value)
                            } }
                        />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
}
