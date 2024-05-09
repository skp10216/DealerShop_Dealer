import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from '@mui/material';

const SnackbarContext = createContext();

export function useSnackbar() {
    return useContext(SnackbarContext);
}

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const openSnackbar = (msg) => {
        setMessage(msg);
        setOpen(true);
    };

    const closeSnackbar = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={8000}
                onClose={closeSnackbar}
                message={message}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
        </SnackbarContext.Provider>
    );
};