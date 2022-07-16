import React, { ReactElement } from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from '@mui/material';
import { SearchContentModal } from './SearchContentModal';


const rows = [
    { id: 1, poster: 'link', title: 'Sopranos', releaseDate: '1999'},
    { id: 2, poster: 'link', title: 'Lost', releaseDate: '2005'},
    { id: 3, poster: 'link', title: 'Halt and Catch Fire', releaseDate: '2015'},
];

export function ResultTable(): ReactElement {
    const [isModalOpen, setModalOpen] = React.useState(false);

    return (
        <>
            <SearchContentModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>
            <Paper>
                <Toolbar>
                    <Typography  sx={{ flex: '1 1 100%' }} variant="h6" component="div">Content Selected</Typography>
                    <Button onClick={() => setModalOpen(true)}>Add</Button>
                </Toolbar>
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
                            {rows.map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <TableCell align="left">{row.poster}</TableCell>
                                    <TableCell align="left">{row.title}</TableCell>
                                    <TableCell align="left">{row.releaseDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}
