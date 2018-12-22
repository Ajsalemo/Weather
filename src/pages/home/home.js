// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Search } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

// Images
import background1 from '../../images/background1.jpg';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    container: {
        height: '100vh',
        backgroundColor: '#c1eff4'
    },
    hero: {
        backgroundColor: theme.palette.grey[800],
        backgroundImage: `url(${background1})`,
        backgroundPosition: 'bottom',
        width: 'auto',
        height: 650
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'inherit'
    },
    textField: {
        height: 50,
        flexBasis: '75%'
    }
});

// ------------------------------------------------------------------------------------------------------- //

const Home = props => {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <Paper className={classes.hero}>
                <Grid item md={6} style={{height: '100%'}}>
                    <form className={classes.form}>
                        <TextField
                            variant="filled"
                            className={classes.textField}
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
                        />
                    </form>
                </Grid>
            </Paper>
            <Paper>
                <Grid item md={12}>
                </Grid>
            </Paper>
        </div>
    )
};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Home);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //