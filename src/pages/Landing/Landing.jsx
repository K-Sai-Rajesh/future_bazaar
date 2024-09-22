import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import getBlogTheme from './theme/getBlogTheme';
import { Outlet } from 'react-router-dom';

export default function Blog() {
    const blogTheme = createTheme(getBlogTheme('light'));

    return (
        <ThemeProvider theme={blogTheme}>
            <CssBaseline enableColorScheme />
            <AppAppBar />
            <Container
                maxWidth="xl"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 10, gap: 4 }}
            >
                <Outlet />
            </Container>
            <Footer />
        </ThemeProvider>
    );
}