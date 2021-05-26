import { Box, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import ProductContext from '../contexts/products/context';

const useStyles = makeStyles(theme => ({
    list: {
        position: 'relative',
        overflow: 'auto',
        maxHeight: '90vh'
    }
}))

const ProductsList = () => {
    const classes = useStyles()
    const { products, onSelectProduct } = useContext(ProductContext)

    return ( 
        <Box>
            <List className={classes.list}>
                {products.map(item => (
                    <ListItem button dense onClick={() => onSelectProduct(item.id)}>
                        <ListItemText primary={item.name} secondary={`$ ${item.price}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
     );
}
 
export default ProductsList;
