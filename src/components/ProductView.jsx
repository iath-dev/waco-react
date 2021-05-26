import { Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Input, InputLabel, makeStyles, Paper, Typography, useMediaQuery } from '@material-ui/core';
import { MonetizationOn, Store } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import ProductContext from '../contexts/products/context';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        maxWidth: '30rem'
    },
    divider: {
        margin: theme.spacing(1, 0)
    }
}))

const ProductView = () => {
    const classes = useStyles()
    const { product, onEditProduct, onDeleteProduct, onClearSelection } = useContext(ProductContext)
    const matches = useMediaQuery('(max-width:960px)');
    const [data, setData] = useState(product)

    const editProduct = () => {
        onEditProduct(data)
    }

    const handleChange = ({ target: { name, value } }) => {
        setData({ ...data, [name]: value })
    }

    const handleClose = () => onClearSelection();

    useEffect(() => {
        if (product) {
            setData(product)
        }

    }, [product])

    if (!product) return null

    return matches ? (
        <Dialog open onClose={handleClose}>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogContent>
                <FormControl required fullWidth margin="dense">
                    <InputLabel htmlFor="product-edit-name">Nombre</InputLabel>
                    <Input fullWidth autoComplete="off" id="product-edit-name" defaultValue={product.name} name="name" onChange={handleChange} />
                </FormControl>
                <FormControl required fullWidth margin="dense">
                    <InputLabel htmlFor="product-edit-description">Descripción</InputLabel>
                    <Input fullWidth multiline rows={3} rowsMax={3} autoComplete="off" id="product-edit-description" defaultValue={product.description} name="description" onChange={handleChange} />
                </FormControl>
                <FormControl required fullWidth margin="dense">
                    <InputLabel htmlFor="product-edit-stock">Inventario</InputLabel>
                    <Input startAdornment={<Store />} fullWidth autoComplete="off" type="number" inputProps={{ min: 0 }} id="product-edit-stock" defaultValue={product.stock} name="stock" onChange={handleChange} />
                </FormControl>
                <FormControl required fullWidth margin="dense">
                    <InputLabel htmlFor="product-edit-price">Precio</InputLabel>
                    <Input startAdornment={<MonetizationOn />} fullWidth autoComplete="off" type="number" inputProps={{ min: 0 }} id="product-edit-price" defaultValue={product.price} name="price" onChange={handleChange} />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button size="small" color="primary" variant="outlined" onClick={() => onDeleteProduct(data.id)}>Borrar</Button>
                <Button size="small" color="primary" variant="contained" onClick={editProduct}>Guardar</Button>
            </DialogActions>
        </Dialog>
    ) : ( 
        <Box className={classes.root} component={Paper}>
            <Typography variant="h6">Editar Producto</Typography>
            <FormControl required fullWidth margin="dense">
                <InputLabel htmlFor="product-edit-name">Nombre</InputLabel>
                <Input fullWidth autoComplete="off" id="product-edit-name" defaultValue={product.name} name="name" onChange={handleChange} />
            </FormControl>
            <FormControl required fullWidth margin="dense">
                <InputLabel htmlFor="product-edit-description">Descripción</InputLabel>
                <Input fullWidth multiline rows={3} rowsMax={3} autoComplete="off" id="product-edit-description" defaultValue={product.description} name="description" onChange={handleChange} />
            </FormControl>
            <FormControl required fullWidth margin="dense">
                <InputLabel htmlFor="product-edit-stock">Inventario</InputLabel>
                <Input startAdornment={<Store />} fullWidth autoComplete="off" type="number" inputProps={{ min: 0 }} id="product-edit-stock" defaultValue={product.stock} name="stock" onChange={handleChange} />
            </FormControl>
            <FormControl required fullWidth margin="dense">
                <InputLabel htmlFor="product-edit-price">Precio</InputLabel>
                <Input startAdornment={<MonetizationOn />} fullWidth autoComplete="off" type="number" inputProps={{ min: 0 }} id="product-edit-price" defaultValue={product.price} name="price" onChange={handleChange} />
            </FormControl>
            <Divider className={classes.divider} />
            <ButtonGroup size="small" color="primary" variant="outlined">
                <Button onClick={() => onDeleteProduct(data.id)}>Borrar Producto</Button>
                <Button onClick={editProduct}>Guardar Cambios</Button>
            </ButtonGroup>
        </Box>
     );
}
 
export default ProductView;
