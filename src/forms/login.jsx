import { Button, Divider, FormControl, Input, InputLabel, makeStyles, Typography } from '@material-ui/core';
import { Email, Facebook } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import PasswordInput from '../components/PasswordInput';
import { LogInWithFacebook, SignUpWithGoogle } from '../helpers/firebase';
import useFirebase from '../hooks/firebase';

const useStyles = makeStyles(theme => ({
    divider: {
        margin: theme.spacing(1, 0)
    },
    social: {
        padding: theme.spacing(1, 0)
    }
}))

const LoginForm = () => {
    const classes = useStyles()
    const { register, handleSubmit } = useForm();
    const fb = useFirebase()

    const handleLogIn = ({ email, password })  => {
        fb.auth.signInWithEmailAndPassword(email, password).then(console.log).catch(console.log)
    }

    const googleSignIn = () => {
        SignUpWithGoogle()
    }

    const facebookSignIn = () => {
        LogInWithFacebook()
    }

    return ( 
        <div>
            <Typography variant="h5">Iniciar sesión</Typography>
            <form onSubmit={handleSubmit(handleLogIn)}>
                <FormControl required fullWidth margin="dense">
                    <InputLabel htmlFor="login-email-input">Correo</InputLabel>
                    <Input autoComplete="off" color="primary" id="login-email-input" fullWidth name="email" {...register('email', { required: true })} />
                </FormControl>
                <PasswordInput autoComplete="off" margin="dense" id="login-password-input" fullWidth required label="Contraseña" {...register('password', { required: true })} />
                <Divider className={classes.divider} />
                <Button fullWidth type="submit" variant="outlined" size="small" color="primary">Iniciar</Button>
            </form>
            <div className={classes.social}>
                <Button fullWidth size="small" startIcon={<Email />} onClick={googleSignIn}>Registrar con Google</Button>
                <Button fullWidth size="small" startIcon={<Facebook />} onClick={facebookSignIn}>Registrar con Facebook</Button>
            </div>
        </div>
     );
}
 
export default LoginForm;
