import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, Input, InputLabel, makeStyles } from '@material-ui/core';
import { Add, MonetizationOn, Store } from '@material-ui/icons';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useFirebase from '../hooks/firebase';

const useStyles = makeStyles({
    fab: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }
})

const ProductForm = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, reset } = useForm();
    const fb = useFirebase()

    const handleOpenForm = () => {
        setOpen(true)
    }

    const handleCloseForm = () => {
        setOpen(false)
    }

    const createProduct = (data) => {
        fb.db.collection('products').add(data).then(() => {
            handleCloseForm()
            reset()
        }).catch(console.log)
    }

    return ( 
        <>
            <Fab color="primary" className={classes.fab} onClick={handleOpenForm}>
                <Add />
            </Fab>
            <Dialog
                open={open}
                onClose={handleCloseForm}
            >
                <DialogTitle>Registrar Producto</DialogTitle>
                <form onSubmit={handleSubmit(createProduct)}>
                    <DialogContent>
                        <FormControl required fullWidth margin="dense">
                            <InputLabel htmlFor="product-name">Nombre</InputLabel>
                            <Input fullWidth autoComplete="off" id="product-name" {...register('name', {required: true})} />
                        </FormControl>
                        <FormControl required fullWidth margin="dense">
                            <InputLabel htmlFor="product-description">Descripción</InputLabel>
                            <Input fullWidth multiline rows={3} rowsMax={3} autoComplete="off" id="product-description" {...register('description', { required: true })} />
                        </FormControl>
                        <FormControl required fullWidth margin="dense">
                            <InputLabel htmlFor="product-stock">Inventario</InputLabel>
                            <Input startAdornment={<Store />} fullWidth autoComplete="off" type="number" inputProps={{ min: 0 }} id="product-stock" {...register('stock', { required: true, min: 0 })} />
                        </FormControl>
                        <FormControl required fullWidth margin="dense">
                            <InputLabel htmlFor="product-price">Precio</InputLabel>
                            <Input startAdornment={<MonetizationOn />} fullWidth autoComplete="off" type="number" inputProps={{ min: 0 }} id="product-price" {...register('price', { required: true, min: 0 })} />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" color="primary" variant="outlined">Cancelar</Button>
                        <Button size="small" color="primary" variant="contained" type="submit">Crear</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
     );
}
 
export default ProductForm;
