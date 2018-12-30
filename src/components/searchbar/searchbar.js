// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

// Actions
import { fiveDayDataForecast } from '../../redux/actions';

// Material UI components
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
        alignItems: 'center',
        marginLeft: '4em'
    },
    textField: {
        height: 50,
        flexBasis: '75%',
        backgroundColor: 'rgba(167, 217, 227, 0.53)',
        [theme.breakpoints.up('sm')]: {
            flexBasis: '50%'
          }
    }
});
  
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
    this.setState({
        isLoading: true
    })
    this.props.fiveDayDataForecast(searchbar.values.searchbar)
        .then(() => {
            this.setState({
                isLoading: false
            })
        });
    }

    // ------------------------------------------------------------------------------------------------------- //

    renderTextField = ({classes, name, input, label, placeholder, meta: { touched, error }}) => {
        const { isLoading } = this.state;
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
                            type='submit'
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

    render() {
        const { classes, handleSubmit } = this.props;
        return (
            <form className={classes.form} onSubmit={handleSubmit(this.searchForLocation)}>
                <Field 
                    name="searchbar" 
                    component={this.renderTextField} 
                    placeholder="Ex. - Charlotte, US or Paris, FR"
                    label="Enter a location" 
                    classes={classes.textField}
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
    form: 'searchbar'
})(SearchBar);

SearchBar = connect(
    mapStateToProps,
    { fiveDayDataForecast }
)(SearchBar);

// ------------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SearchBar);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //