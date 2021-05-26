import { AppBar, Box, Button, Divider, IconButton, makeStyles, Popover, Toolbar, Typography } from '@material-ui/core';
import { AccountCircleTwoTone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import useFirebase from '../hooks/firebase';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1
    },
    divider: {
        margin: theme.spacing(1, 0)
    }
}))

const Navbar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null)
    const fb = useFirebase();
    const [user, setUser] = useState({ name: '', email: '' })

    const isOpen = Boolean(anchorEl);

    const handleMenu = (event = null) => setAnchorEl(event?.currentTarget);
    const handleLogOut = () => {
        fb.auth.signOut()
    }

    useEffect(() => {
        fb.auth.onAuthStateChanged(({ displayName, email }) => {
            setUser({ name: displayName, email })
        })

    }, [fb])


    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" noWrap className={classes.title}>
                        WACO - Products
                    </Typography>
                    <div>
                        <IconButton size="small" onClick={handleMenu}>
                            <AccountCircleTwoTone />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Popover
                anchorEl={anchorEl}
                id="menu"
                open={isOpen}
                onClose={() => handleMenu()} 
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
            >
                <Box padding={1.2}>
                    <Typography variant="body2">{user.name}</Typography>
                    <Typography variant="body2">{user.email}</Typography>
                    <Divider className={classes.divider} />
                    <Button color="primary" variant="outlined" fullWidth size="small" onClick={handleLogOut}>Cerrar sesión</Button>
                </Box>
            </Popover>
        </>
    );
}
 
export default Navbar;
