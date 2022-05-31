import React from 'react';
import Pagination from '@mui/material/Pagination';
import './CustomPagination.css';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../Customcss/Customcss';

export default function CustomPagination({ setPage , numOfPages = 10 }) {
    
    const handlePage = (e,page) => {
        setPage(page);
        window.scroll(0,0);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="pagination">
                <Pagination count={numOfPages} onChange={handlePage} color="primary" />
            </div>
        </ThemeProvider>
    )
}
