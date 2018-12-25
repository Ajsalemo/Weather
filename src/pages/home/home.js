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
        height: 600
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
    },
    forecastGrid: {
        display: 'flex',
        justifyContent: 'space-evenly',
        backgroundColor: '#c1eff4'
    },
    forecastCard: {
        width: '5em',
        height: 'fit-content'
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
                        style={{padding: `1.7em 5em 1em 5em`}}
                        className={classes.locationGrid}
                    >
                        {/* ----------------------------------------- Card Item Grid --------------------------------------- */}
                        <Grid 
                            item
                            md={4}
                        >
                        {weatherData 
                            ?
                        <Location 
                            description={weatherData.data.list[0].weather[0].main}
                            name={weatherData.data.city.name}
                            country={weatherData.data.city.country}
                            temperature={returnRoundedNumber(weatherData.data.list[0].main.temp)}
                            wind={returnRoundedNumber(weatherData.data.list[0].wind.speed)}
                            humidity={weatherData.data.list[0].main.humidity}
                            imageIcon={`http://openweathermap.org/img/w/${weatherData.data.list[0].weather[0].icon}.png`}
                        />
                            :
                        null
                        }          
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
            <Grid container>
                <Grid item md={12} className={classes.forecastGrid}>
                    {weatherData 
                        ?
                        // Loop over nested objects returned from the API
                        Object.values(weatherData.data.list).map((weatherArrList, i) => {
                            return (
                                <Paper key={i}>
                                    <Location
                                        forecastCard={classes.forecastCard}
                                        imageIcon={`http://openweathermap.org/img/w/${weatherArrList.weather[0].icon}.png`}
                                        title={weatherArrList.weather[0].main}
                                        description={weatherArrList.weather[0].main}
                                        temperature={returnRoundedNumber(weatherArrList.main.temp)}
                                    />  
                                </Paper>
                            )
                        })
                        :
                    null
                    }
                </Grid>
            </Grid>
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