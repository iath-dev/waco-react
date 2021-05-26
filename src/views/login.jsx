import { Box, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import LoginForm from '../forms/login';
import RegisterForm from '../forms/register';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('md')]: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
        }
    },
    container: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '50vw',
        }
    },
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            maxWidth: '30vw',
            maxHeight: '80vh'
        }
    },
    login: {
        backgroundColor: theme.palette.primary.main
    },
    register: {
        backgroundColor: theme.palette.secondary.main
    }
}))

const LoginView = () => {
    const classes = useStyles()

    return ( 
        <Box className={classes.root}>
            <div className={clsx([classes.container, classes.login])}>
                <Box component={Paper} className={classes.paper}>
                    <LoginForm />
                </Box>
            </div>
            <div className={clsx([classes.container, classes.register])}>
                <Box component={Paper} className={classes.paper}>
                    <RegisterForm />
                </Box>
            </div>
        </Box>
    );
}
 
export default LoginView;
