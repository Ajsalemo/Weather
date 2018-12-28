// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
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
import LeafletMap from '../../components/leafletMap';

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
    forecastContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    forecastGrid: {
        display: 'flex',
        justifyContent: 'space-evenly',
        backgroundColor: '#c1eff4',
        paddingBottom: '1em'
    },
    forecastCard: {
        width: '5em',
        height: 'fit-content'
    },
    forecastHeader: {
        display: 'flex',
        justifyContent: 'center'
    },
    forecastText: {
        '&:hover': {
            cursor: 'pointer'   
        }
    },
    toggleSelected: {
        borderBottom: '1px solid #000'
    }
});

// ------------------------------------------------------------------------------------------------------- //

const returnRoundedNumber = temp => {
    return (
        parseInt(Math.round(`${temp}`))
    )
};

// ------------------------------------------------------------------------------------------------------- //

class Home extends Component {
    constructor() {
        super()
        this.state = {
            defaultToggle: true,
            fiveDayToggle: false
        }
        this.toggleDefaultForecast = this.toggleDefaultForecast.bind(this);
        this.toggleFiveDay = this.toggleFiveDay.bind(this);
    }
    // ------------------------------------------------------------------------------------------------------- //
    // Toggles styling for the current selected forecast
    toggleDefaultForecast = () => {
        this.setState({
            defaultToggle: true,
            fiveDayToggle: false
        })
    }

    toggleFiveDay = () => {
        this.setState({
            fiveDayToggle: true,
            defaultToggle: false
        })
    }

    // ------------------------------------------------------------------------------------------------------- //

    render() {
        const { classes, weatherData } = this.props;
        const { defaultToggle, fiveDayToggle } = this.state;
        const city = weatherData.data.city.name;
        const country = weatherData.data.city.country;
        const lat = weatherData.data.city.coord.lat;
        const lon = weatherData.data.city.coord.lon;
        const main = weatherData.data.list[0].weather[0].main;
        let temp = weatherData.data.list[0].main.temp;

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
                                description={main}
                                name={city}
                                country={country}
                                temperature={returnRoundedNumber(temp)}
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
                <Grid container className={classes.forecastContainer}>
                    <Typography variant="h6" gutterBottom className={classes.forecastHeader}>
                        <span 
                            onClick={this.toggleDefaultForecast}
                            className={defaultToggle ? classes.toggleSelected : null}
                        >
                            Hourly
                        </span>
                        {/* ----------- Spacer ------------------ */}
                        <span style={{margin: '0em 0.3em'}}>|</span>
                        <span 
                        // ---------------------------------------- //
                            onClick={this.toggleFiveDay}
                            className={fiveDayToggle ? classes.toggleSelected : null}
                        >
                            Five Day
                        </span>
                    </Typography>
                    <Grid item md={12} className={classes.forecastGrid}>
                        {weatherData 
                            ?
                            // Loop over nested objects returned from the API
                            Object.values(weatherData.data.list).map((weatherArrList, i) => {
                                return (
                                    <Paper key={i} style={{height: 'fit-content'}}>
                                        <Location
                                            unixDt={weatherArrList.dt}
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
                    {/* ----------------------------- Weather Map Component --------------------------------- */}
                    <Grid
                        container
                        direction='row'
                    >
                        <Grid item md={6} xs={12} style={{height: '400px', width: '100%'}}>
                            <Paper style={{margin: '4em 2em 2em 2em'}}>
                                <LeafletMap 
                                    position={[weatherData.data.city.coord.lat, weatherData.data.city.coord.lon]}
                                    zoom={5}
                                    city={city} 
                                    country={country}
                                    lat={lat}
                                    lon={lon}
                                    main={main}
                                    temp={returnRoundedNumber(temp)}
                                />
                            </Paper>
                        </Grid>
                    {/* --------------------------------------------------------------------------------------- */}
                    </Grid>
                </Grid>
            </div>
        )
    }
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