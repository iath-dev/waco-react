import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import Navbar from '../components/Navbar';
import ProductsList from '../components/Productlist';
import ProductView from '../components/ProductView';
import ProductProvider from '../contexts/products/provider';
import ProductForm from '../forms/product';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    container: {
        display: 'flex',
        flexGrow: 1
    },
    list: {
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            flexGrow: 2,
        }
    },
    edit: {
        [theme.breakpoints.up('md')]: {
            flexGrow: 3,
            height: '100%',
            backgroundColor: theme.palette.secondary.light,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
}))

const HomeView = () => {
    const classes = useStyles();

    return (
        <ProductProvider>
            <Box className={classes.root}>
                <Navbar />
                <Box className={classes.container}>
                    <div className={classes.list}>
                        <ProductsList />
                    </div>
                    <div className={classes.edit}>
                        <ProductView />
                    </div>
                </Box>
                <ProductForm />
            </Box>
        </ProductProvider>
    );
}
 
export default HomeView;
