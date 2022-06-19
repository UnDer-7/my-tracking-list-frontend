import React, { ReactElement, ReactNode } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

type BlockUIProps = {
    active: boolean;
    children: ReactNode;
}

export function BlockUI({ active, children }: BlockUIProps): ReactElement {
    return (
        <>
            { children }
            <Backdrop open={ active }>
                { active && <CircularProgress color="inherit"/> }
            </Backdrop>
        </>
    )
}
