import { FormControl, FormHelperText, IconButton, Input, InputLabel } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';

const PasswordInput = ({ required, fullWidth, margin, label, helperText, error, id = 'password-field', controlClassName, ...input }) => {

    const [show, setShow] = useState(false);

    const onShow = () => setShow(!show);

    return ( 
        <FormControl error={error} margin={margin} required={required} fullWidth={fullWidth} className={controlClassName}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input
                id={id}
                type={show ? 'text' : 'password'}
                endAdornment={
                    <IconButton
                        color={!show ? "primary" : "secondary"}
                        size="small"
                        onClick={onShow}
                    >
                        {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>}
                {...input}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>  
    );
}
 
export default PasswordInput;
