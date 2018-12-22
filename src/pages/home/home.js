// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Images
import background1 from '../../images/background1.jpg';

// Components
import SearchBar from '../../components/searchbar';

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
    gridTwo: {
        height: '100%'
    },
    typography: {
        color: '#fff',
        textAlign: 'right',
        paddingRight: '4em',
        whiteSpace: 'nowrap',
        textShadow: `1px 1px 1px #03a9f4`
    },
    subTitle: {
        ...theme.typography.button,
        color: '#03a9f4',
        textShadow: `1px 1px 1px #000`
    }
});

// ------------------------------------------------------------------------------------------------------- //

const Home = props => {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <Grid container className={classes.hero}>
                <Grid item md={12} xs={12} style={{height: '100%'}}>
                    <Grid item md={12} xs={12}>
                        <Typography component="h2" variant="h1" className={classes.typography}>
                            Weather
                            {<span className={classes.subTitle}>.App</span>}
                            {<span className={classes.subTitle} style={{display: 'block'}}>Your personal application</span>}
                        </Typography>
                    </Grid>
                    <SearchBar />
                </Grid>
            </Grid>
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