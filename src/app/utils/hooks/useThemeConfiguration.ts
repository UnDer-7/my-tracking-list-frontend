import { Theme, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

export function useThemeConfiguration(): Theme {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return useMemo(
        () => createTheme({
            palette: { mode: prefersDarkMode ? 'dark' : 'light' }
        }),
        [prefersDarkMode]
    );
}
