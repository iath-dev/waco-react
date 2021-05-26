import React from 'react';
import { Button, Divider, FormControl, Input, InputLabel, makeStyles, Typography } from '@material-ui/core';
import { Email, Facebook } from '@material-ui/icons';
import PasswordInput from '../components/PasswordInput';
import { LogInWithFacebook, SignUpWithGoogle } from '../helpers/firebase';
import useFirebase from '../hooks/firebase';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
    divider: {
        margin: theme.spacing(1, 0)
    },
    social: {
        padding: theme.spacing(1, 0)
    }
}))

const RegisterForm = () => {
    const classes = useStyles()
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
    const fb = useFirebase();

    const signUp = async ({ name, surname, email, password, confirm }) => {
        if (password !== confirm) {
            setError('password', { type: 'manual', message: 'Contraseña no coincide' })
            return;
        }
        clearErrors();
        await fb.auth.createUserWithEmailAndPassword(email, password).then(async cre => {
            await cre.user.updateProfile({ displayName: `${name} ${surname}` })
        }).catch(console.log);
    }

    const googleSignIn = () => {
        SignUpWithGoogle()
    }

    const facebookSignIn = () => {
        LogInWithFacebook()
    }

    return ( 
        <div>
            <Typography variant="h5">Registrar usuario</Typography>
            <form onSubmit={handleSubmit(signUp)}>
                <FormControl required fullWidth error={errors.name} margin="dense" {...register('name', { required: true })}>
                    <InputLabel htmlFor="register-name-input">Nombre</InputLabel>
                    <Input autoComplete="off" color="primary" id="register-name-input" fullWidth name="name" />
                </FormControl>
                <FormControl fullWidth margin="dense" {...register('surname')}>
                    <InputLabel htmlFor="register-surname-input">Apellido</InputLabel>
                    <Input autoComplete="off" color="primary" id="register-surname-input" fullWidth name="surname" />
                </FormControl>
                <FormControl required fullWidth margin="dense" error={errors.email} {...register('email', { required: true })}>
                    <InputLabel htmlFor="register-email-input">Correo</InputLabel>
                    <Input autoComplete="off" color="primary" id="register-email-input" fullWidth name="email" />
                </FormControl>
                <PasswordInput margin="dense" id="register-password-input" helperText="Contraseña con un mínimo de 9 caracteres" error={errors.password} fullWidth required label="Contraseña"  autoComplete="off" {...register('password', { required: true, minLength: 9 })} />
                <PasswordInput margin="dense" id="register-confirm-input" error={errors.confirm} fullWidth required label="Confirmar Contraseña"  autoComplete="off" {...register('confirm', { required: true })} />
                <Divider className={classes.divider} />
                <Button type="submit" fullWidth variant="outlined" size="small" color="primary">Registrar</Button>
            </form>
            <div className={classes.social}>
                <Button fullWidth size="small" startIcon={<Email />} onClick={googleSignIn}>Registrar con Google</Button>
                <Button fullWidth size="small" startIcon={<Facebook />} onClick={facebookSignIn}>Registrar con Facebook</Button>
            </div>
        </div>
     );
}
 
export default RegisterForm;
