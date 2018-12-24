// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React from 'react';
import { connect } from 'react-redux';

// Actions
import { submitSearchLocation } from '../../redux/actions';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Images
import background1 from '../../images/background1.jpg';

// Components
import SearchBar from '../../components/searchbar';
import Location from '../../components/location';

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
    locationGrid: {
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end'
          }
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

const returnRoundedNumber = temp => {
    return (
        parseInt(Math.round(`${temp}`))
    )
};

// ------------------------------------------------------------------------------------------------------- //

let Home = props => {
    const { classes, weatherData } = props;
    return (
        <div className={classes.container}>
            {/* ---------------------------------------- Main Grid Container ------------------------------------------------------ */}
            <Grid container className={classes.hero}>
                {/* ---------------------------------------- Main Item Container ------------------------------------------------------ */}
                <Grid item md={12} xs={12} style={{height: '100%'}}>
                    {/* ----------------------------------------- Hero Component --------------------------------------- */}
                    <Grid item md={12} xs={12}>
                        <Typography component="h2" variant="h1" className={classes.typography}>
                            <span>Weather{<span className={classes.subTitle}>.App</span>}</span>
                            {<span className={classes.subTitle} style={{display: 'block'}}>Your personal application</span>}
                        </Typography>
                    {/* ------------------------------------------- End Hero Component --------------------------------- */}
                    </Grid>
                    {/* --------------------------------------- Card Container ------------------------------------------- */}
                    <Grid 
                        direction='row'
                        container
                        style={{padding: `5em 5em 1em 5em`}}
                        className={classes.locationGrid}
                    >
                        {/* ----------------------------------------- Card Item Grid --------------------------------------- */}
                        <Grid 
                            item
                            md={4}
                        >
                          <Location 
                            description={weatherData.data.weather[0].main}
                            name={weatherData.data.name}
                            country={weatherData.data.sys.country}
                            temperature={returnRoundedNumber(weatherData.data.main.temp)}
                          />
                        {/* ----------------------------------------- End Card Item Grid --------------------------------------- */}
                        </Grid>
                    {/* --------------------------------------- End Card Container ------------------------------------------- */}
                    </Grid>
                    {/* ------------------------------------------ Search Component ------------------------------------------- */}
                    <SearchBar />
                    {/* ------------------------------------------------------------------------------------------------------- */}
                {/* ---------------------------------------- End Main Item Container -------------------------------------------- */}
                </Grid>
            {/* ---------------------------------------- End Main Container ------------------------------------------------------ */}
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
const mapStateToProps = state => {
    return {
        weatherData: state.weatherData.information
    }
}

// ------------------------------------------------------------------------------------------------------- //

Home = connect(
    mapStateToProps,
    { submitSearchLocation }
)(Home);

// ------------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Home);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //