// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React, { Suspense, lazy, Component } from 'react';
import { connect } from 'react-redux';

// Material UI components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

// Images
import background1 from '../../images/background1.jpg';

// Actions
import { fiveDayDataForecast } from '../../redux/actions';

// Components
import SearchBar from '../../components/searchbar';
import CircularProgress from '@material-ui/core/CircularProgress';
const Location = lazy(() => import('../../components/location'));
const LeafletMap = lazy(() => import('../../components/leafletMap'));


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
        height: 'auto',
        backgroundPosition: 'right'
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
        flexDirection: 'column',
        paddingTop: '1em'
    },
    forecastGrid: {
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingBottom: '1em'
    },
    forecastCard: {
        width: '5em',
        height: 'fit-content'
    },
    forecastText: {
        '&:hover': {
            cursor: 'pointer'   
        }
    },
    gridCenter: {
        display: 'flex',
        justifyContent: 'center'
    },
    toggleSelected: {
        borderBottom: '1px solid #000'
    },
    mainPaperCard: {
        border: '1px solid #fff',
        backgroundColor: '#ffffff6b',
        padding: '0.5em'
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
    constructor(props) {
        super(props)
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
        const { classes, fiveDayData } = this.props;
        const { defaultToggle, fiveDayToggle } = this.state;
        const city = fiveDayData.data.city.name;
        const country = fiveDayData.data.city.country;
        const lat = fiveDayData.data.city.coord.lat;
        const lon = fiveDayData.data.city.coord.lon;
        const main = fiveDayData.data.list[0].weather[0].main;
        let temp = fiveDayData.data.list[0].main.temp;

        const loadingComponent = <div><CircularProgress /></div>

        // ---------------------------------- Main weather component ---------------------------------------------- //

        const mainWeatherComponent =  
            fiveDayData.data ?
            <Suspense fallback={loadingComponent}>
                <Location 
                    mainPaperCard={classes.mainPaperCard}
                    description={main}
                    name={city}
                    country={country}
                    temperature={returnRoundedNumber(temp)}
                    wind={returnRoundedNumber(fiveDayData.data.list[0].wind.speed)}
                    humidity={fiveDayData.data.list[0].main.humidity}
                    imageIcon={`http://openweathermap.org/img/w/${fiveDayData.data.list[0].weather[0].icon}.png`}
                />
            </Suspense> 
            : loadingComponent    
        // ------------------------------- Forecast toggle header ------------------------------------------------ //

        const forecastHeader = 
            <Typography variant="h6" gutterBottom className={classes.gridCenter}>
                <span 
                    onClick={this.toggleDefaultForecast}
                    className={`${defaultToggle ? classes.toggleSelected : null}  ${classes.forecastText}`}
                >
                    Hourly
                </span>
                {/* ----------- Spacer ------------------ */}
                <span style={{margin: '0em 0.3em'}}>|</span>
                <span 
                // ---------------------------------------- //
                    onClick={this.toggleFiveDay}
                    className={`${fiveDayToggle ? classes.toggleSelected : null}  ${classes.forecastText}`}
                >
                    Five Day
                </span>
            </Typography>
        
        // -------------------------------------- Hourly forecast cards -------------------------------------------- //

        const hourlyForecast =
        // Loop over nested objects returned from the API which is stored in the Redux store
        // This loop returns the Hourly forecast data
        fiveDayData.data ?
            Object.values(fiveDayData.data.list).map((fiveDayArrList, j) => {
                const arrayLimit = j <= 4;
                // If the loops index is greater than 4 or false, stop the statement
                // This is to get the most recently hourly data - to fill 5 Card components worth of information
                if(!arrayLimit) {
                    return false
                } else {
                    return (          
                        <Paper key={j} style={{height: 'fit-content'}} className={classes.mainPaperCard}>
                            <Suspense fallback={loadingComponent}>
                                <Location
                                    defaultToggle={defaultToggle}
                                    unixDt={fiveDayArrList.dt}
                                    forecastCard={classes.forecastCard}
                                    imageIcon={`http://openweathermap.org/img/w/${fiveDayArrList.weather[0].icon}.png`}
                                    title={fiveDayArrList.weather[0].main}
                                    description={fiveDayArrList.weather[0].main}
                                    temperature={returnRoundedNumber(fiveDayArrList.main.temp)}
                                />  
                            </Suspense>      
                        </Paper>
                    ) 
                }
            }) : loadingComponent

        // ------------------------------------- Five day forecast cards ------------------------------------------ //
        // Loops over the object returned from the Openweathermap API - this is put stored in the Redux store
        // Pushes the iterated objects back into their own arrays to map over them
        // This is done to properly return JSX and not have the "dt_txt" key be undefined when the "includes" method is called on it
        const fiveDayInformation =
            fiveDayData.data ?
            Object.values(fiveDayData.data.list).map((res, i) => {
                const dataArray = [];
                const time = "12:00:00";
                dataArray.push(res);
                return (
                    dataArray.map((dtList, i) => {
                        return (
                            dtList.dt_txt.includes(time) 
                                ?
                            <Paper key={i} style={{height: 'fit-content'}}>  
                                <Suspense fallback={loadingComponent}>
                                    <Location
                                        defaultToggle={defaultToggle}
                                        unixDt={dtList.dt}
                                        forecastCard={classes.forecastCard}
                                        imageIcon={`http://openweathermap.org/img/w/${dtList.weather[0].icon}.png`}
                                        title={dtList.weather[0].main}
                                        description={dtList.weather[0].main}
                                        temperature={returnRoundedNumber(dtList.main.temp)}
                                    /> 
                                </Suspense>                                          
                            </Paper>
                                :
                            null
                        )
                    })
                )
            }) : loadingComponent

        // ------------------------------------- Leaflet interactive radar map ------------------------------------------ //

        const leafletMapDisplay =
            <Paper style={{margin: '4em 2em 2em 2em'}}>
            
                <Suspense fallback={loadingComponent}>
                    <LeafletMap 
                        position={[lat, lon]}
                        zoom={5}
                        city={city} 
                        country={country}
                        lat={lat}
                        lon={lon}
                        main={main}
                        temp={returnRoundedNumber(temp)}
                    />
                </Suspense>
            </Paper>

        // ------------------------------------------------------------------------------------------------------------------------------- //

        return (
            <div className={`${classes.container} ${classes.hero}`}>
                {/* ---------------------------------------- Main Grid Container ------------------------------------------------------ */}
                <Grid container>
                    {/* ---------------------------------------- Main Item Container ------------------------------------------------------ */}
                    <Grid item md={12} xs={12} style={{height: '100%'}}>
                        {/* --------------------------------------- Card Container ------------------------------------------- */}
                        <Grid 
                            direction='row'
                            container
                            style={{padding: `1.7em 5em 1em 5em`}}
                            className={`${classes.locationGrid} ${classes.gridCenter}`} 
                        >
                            {/* ----------------------------------------- Card Item Grid --------------------------------------- */}
                                <Grid item md={4} className={classes.gridCenter}>
                                {mainWeatherComponent}          
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
                {/* --------------------------------- Toggle options to choose between forecast types -------------------------------- */}
                </Grid>
                <Grid container className={classes.forecastContainer}>
                    {forecastHeader}
                    {/* ------------------------------------------- End toggle options ------------------------------------------------- */}
                    {/* -------------------------------------------- Forecast component ------------------------------------------------ */}
                    <Grid item md={12} className={classes.forecastGrid}>
                        {defaultToggle ? hourlyForecast : fiveDayInformation}
                    {/* -------------------------------------- End forecast component------------------------------------------------------ */}
                    </Grid>
                    {/* --------------------------------------- Weather Map Component ----------------------------------------------------- */}

                    <Grid container direction='row'>
                        <Grid item md={6} xs={12} style={{height: '400px', width: '100%'}}>
                            {leafletMapDisplay}
                        </Grid>
                    {/* ------------------------------------------- End wWeather map component ---------------------------------------------- */}
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
        fiveDayData: state.fiveDayData.fiveDayDataInformation
    }
}

// ------------------------------------------------------------------------------------------------------- //

Home = connect(
    mapStateToProps,
    { fiveDayDataForecast }
)(Home);

// ------------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Home);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //