// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Field, reduxForm } from 'redux-form'

// Material UI components
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Search } from '@material-ui/icons';
import { withStyles } from '@material-ui/core';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

const styles = () => ({
    form: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '4em',
        height: 'inherit'
    },
    textField: {
        height: 50,
        flexBasis: '50%',
        backgroundColor: 'rgba(167, 217, 227, 0.53)'
    }
});

const renderTextField = ({classes, name, input, label, placeholder, meta: { touched, error }}) => {
    return (
        <TextField
            variant="filled"
            name={name}
            placeholder={placeholder}
            className={classes}
            label={label}
            InputProps={{
                endAdornment: (
                    <InputAdornment variant="filled" position="end">
                    <IconButton
                        aria-label="Submit form"
                        style={{color: '#fff'}}
                    >
                        <Search />
                    </IconButton>
                    </InputAdornment>
                ),
            }}
            {...input}
        />
    )
};
  

// ------------------------------------------------------------------------------------------------------- //

let SearchBar = props => {
    const { classes, handleSubmit } = props;
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Field 
                name="searchbar" 
                component={renderTextField} 
                placeholder="Ex. - Charlotte, NC"
                label="Enter a location to view it's weather forecast" 
                classes={classes.textField}
            />
        </form>
    )
}

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

SearchBar = reduxForm({
    form: 'searchbar'
})(SearchBar)

// ------------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SearchBar);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //