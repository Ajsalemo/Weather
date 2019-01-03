// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

// Actions
import { fiveDayDataForecast } from '../../redux/actions';

// Material UI components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Search } from '@material-ui/icons';
import { withStyles } from '@material-ui/core';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    form: {
        display: 'flex',
        justifyContent: 'center',
    },
    textContainer: {
        height: 50,
        flexBasis: '75%',
        backgroundColor: 'rgba(167, 217, 227, 0.53)',
        [theme.breakpoints.up('sm')]: {
            flexBasis: '50%'
          }
    },
    textField: {
        width: '100%'
    },
    loadingPropColor: {
        color: '#fff'
    },
    errorPaper: {
        backgroundColor: '#ff000070',
        color: '#fff',
        padding: '0em 0.5em'
    }
});

// Validates the form - returns an error if the field is submitted empty
const validate = values => {
    const errors = {};
    if(!values.searchbar) {
        errors.searchbar = 'You must enter a location'
    }
    return errors;
};
  
// ------------------------------------------------------------------------------------------------------- //

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
        this.renderTextField = this.renderTextField.bind(this);
        this.searchForLocation = this.searchForLocation.bind(this);
    }

    // ------------------------------------------------------------------------------------------------------- //

    searchForLocation = () => {
    const { searchbar } = this.props;
    const { isLoading } = this.state;
    this.setState({
        isLoading: !isLoading
    })
    this.props.fiveDayDataForecast(searchbar.values.searchbar)
        .then(() => {
            this.setState({
                isLoading: isLoading
            })
        });
    }

    // ------------------------------------------------------------------------------------------------------- //

    renderTextField = ({containerClass, classes, errorClass, name, input, label, placeholder, loading, meta: { touched, error }}) => {
        return (
            <div className={containerClass}>
                <TextField
                    variant="filled"
                    name={name}
                    placeholder={placeholder}
                    className={classes}
                    label={label}
                    disabled={loading}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment variant="filled" position="end">
                            <IconButton
                                aria-label="Submit form"
                                style={{color: '#fff'}}
                                type='submit'
                            >
                                {!loading ? <Search/> : <CircularProgress style={{color: '#fff'}} />}
                            </IconButton>
                            </InputAdornment>
                        )
                    }}
                    {...input}
                />
                <Grid container direction='row'>
                    <Paper className={errorClass}>{touched && (error && <span>{error}</span>)}</Paper>
                </Grid>
            </div>
        )
    };

    // ------------------------------------------------------------------------------------------------------- //

    render() {
        const { classes, handleSubmit } = this.props;
        const { isLoading } = this.state;
        return (
            <form className={classes.form} onSubmit={handleSubmit(this.searchForLocation)}>
                <Field 
                    name="searchbar" 
                    component={this.renderTextField} 
                    placeholder="Ex. - Charlotte, US or Paris, FR"
                    label="Enter a location" 
                    classes={classes.textField}
                    containerClass={classes.textContainer}
                    loading={isLoading}
                    errorClass={classes.errorPaper}
                />   
            </form>
        )
    }
    // ------------------------------------------------------------------------------------------------------- //
};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

const mapStateToProps = state => {
    return {
        searchbar: state.form.searchbar
    }
}

// ------------------------------------------------------------------------------------------------------- //

SearchBar = reduxForm({
    form: 'searchbar',
    validate
})(SearchBar);

SearchBar = connect(
    mapStateToProps,
    { fiveDayDataForecast }
)(SearchBar);

// ------------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SearchBar);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //