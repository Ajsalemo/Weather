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
import { fiveDayDataForecast, getLocation } from '../../redux/actions';

// Components
import SearchBar from '../../components/searchbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Footer from '../../components/footer';
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
        backgroundImage: `linear-gradient(75deg, rgba(0, 231, 255, 0), rgba(10, 15, 90, 0.42)), 
                            url(${background1})`,
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
        height: 'auto'
    },
    forecastText: {
        '&:hover': {
            cursor: 'pointer'   
        }
    },
    forecastHeader: {
        color: '#fff',
        margin: '1.3em 0em'
    },
    gridCenter: {
        display: 'flex',
        justifyContent: 'center'
    },
    toggleSelected: {
        borderBottom: '1px solid #43bedf',
        color: '#43bedf'
    },
    mainPaperCard: {
        border: '1px solid #fff',
        backgroundColor: '#ffffff6b',
        padding: '0.3em'
    },
    mapSpecProp: {
        display: 'flex',
        justifyContent: 'center',
        height: 'inherit',
        flexDrection: 'column',
        alignItems: 'center'
    }
});

// ------------------------------------------------------------------------------------------------------- //

const returnRoundedNumber = temp => {
    return (
        parseInt(Math.round(`${temp}`))
    )
};

const returnCelsius = temp => {
    return (
        parseInt(Math.round((5/9) * (temp-32)))
    )
}

// ------------------------------------------------------------------------------------------------------- //

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultToggle: true,
            fiveDayToggle: false,
            isLoading: false,
        }
        this.toggleDefaultForecast = this.toggleDefaultForecast.bind(this);
        this.toggleFiveDay = this.toggleFiveDay.bind(this);
        this.returnLocationComponent = this.returnLocationComponent.bind(this);
        // Components
        this.loadingComponent = this.loadingComponent.bind(this);
        this.mainWeatherComponent = this.mainWeatherComponent.bind(this);
        this.fiveDayInformation = this.fiveDayInformation.bind(this);
        this.hourlyForecast = this.hourlyForecast.bind(this);
        this.forecastHeader = this.forecastHeader.bind(this);
        this.leafletMapDisplay = this.leafletMapDisplay.bind(this);
    }

    // ------------------------------------------------------------------------------------------------------- //

    returnLocationComponent = () => {
        // If the redux-store is empty, load dummy data upon the initial load
        // Afterwards in the promise - prompt the user to use Geolocation, if so - return their local data
        // If not - the dummy data will be available. Users can still use the searchbar/query 
        const { fiveDayData } = this.props;
        if(!fiveDayData) {
            this.setState({
                isLoading: true
            })
            this.props.fiveDayDataForecast('London,uk')
                .then(() => {
                    this.setState({
                        isLoading: false
                    })
                    if(navigator.geolocation) {
                        this.props.getLocation()
                    } 
                })
                    .catch(err => {
                        this.setState({
                            isLoading: false
                        });
                    })
        } 
    }

    // ------------------------------------------------------------------------------------------------------- //

    componentDidMount = () => {
        // On page load - return users location 
        this.returnLocationComponent();
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

    loadingComponent = () => {
        const { classes } = this.props;
        return (
            <div className={classes.mapSpecProp}>
                <CircularProgress />
            </div>
        )
    }

    // ---------------------------------- Main weather component ---------------------------------------------- //

    mainWeatherComponent = () => {
        const { classes, fiveDayData } = this.props;
        const { isLoading } = this.state;

        if(!fiveDayData) {
            return <div>..Loading</div>
        } else {
            return (
                <Suspense fallback={this.loadingComponent()}>
                    <Location 
                        loading={!isLoading}
                        loadingProp={this.loadingComponent()}
                        mainPaperCard={classes.mainPaperCard}
                        description={fiveDayData.data.list[0].weather[0].main}
                        name={fiveDayData.data.city.name}
                        country={fiveDayData.data.city.country}
                        celsius={returnCelsius(fiveDayData.data.list[0].main.temp)}
                        fahrenheit={returnRoundedNumber(fiveDayData.data.list[0].main.temp)}
                        wind={returnRoundedNumber(fiveDayData.data.list[0].wind.speed)}
                        humidity={fiveDayData.data.list[0].main.humidity}
                        imageIcon={`http://openweathermap.org/img/w/${fiveDayData.data.list[0].weather[0].icon}.png`}
                    />
                </Suspense>  
            )
        }
    }

    // ------------------------------- Forecast toggle header ------------------------------------------------ //

    forecastHeader = () => {
        const { classes } = this.props;
        const { defaultToggle, fiveDayToggle } = this.state;
        return (
            <Typography variant="h6" gutterBottom className={`${classes.gridCenter} ${classes.forecastHeader}`}>
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
        )
    }

    // -------------------------------------- Hourly forecast cards -------------------------------------------- //

    hourlyForecast = () => {
        const { classes, fiveDayData } = this.props;
        const { defaultToggle, isLoading } = this.state;
  
        if(!fiveDayData) {
            return <div>..Loading</div>
        } else {
            return (
                // Loop over nested objects returned from the API which is stored in the Redux store
                // This loop returns the Hourly forecast data
                Object.values(fiveDayData.data.list).map((fiveDayArrList, j) => {
                    const arrayLimit = j <= 4;
                    // If the loops index is greater than 4 or false, stop the statement
                    // This is to get the most recently hourly data - to fill 5 Card components worth of information
                    if(!arrayLimit) {
                        return false
                    } else {
                        return (       
                            <Suspense fallback={this.loadingComponent()} key={j}>
                                <Location 
                                    loading={!isLoading}
                                    loadingProp={this.loadingComponent()}
                                    mainPaperCard={classes.mainPaperCard}
                                    defaultToggle={defaultToggle}
                                    unixDt={fiveDayArrList.dt}
                                    forecastCard={classes.forecastCard}
                                    imageIcon={`http://openweathermap.org/img/w/${fiveDayArrList.weather[0].icon}.png`}
                                    title={fiveDayArrList.weather[0].main}
                                    description={fiveDayArrList.weather[0].main}
                                    fahrenheit={returnRoundedNumber(fiveDayArrList.main.temp)}
                                    celsius={returnCelsius(fiveDayArrList.main.temp)}
                                />  
                            </Suspense>  
                        ) 
                    }
                })
            )
        }
    }

    // ------------------------------------- Five day forecast cards ------------------------------------------ //
    fiveDayInformation = () => {
        // Loops over the object returned from the Openweathermap API - this is put stored in the Redux store
        // Pushes the iterated objects back into their own arrays to map over them
        // This is done to properly return JSX and not have the "dt_txt" key be undefined when the "includes" method is called on it
        const { classes, fiveDayData } = this.props;
        const { defaultToggle, isLoading } = this.state;
 
        if(!fiveDayData) {
            return <div>..Loading</div>
        } else {
            return (
                Object.values(fiveDayData.data.list).map((res, i) => {
                    const dataArray = [];
                    const time = "12:00:00";
                    dataArray.push(res);
                    return (
                        dataArray.map((dtList, i) => {
                            return (
                                dtList.dt_txt.includes(time) 
                                    ? 
                                <Suspense fallback={this.loadingComponent()} key={i}>
                                    <Location   
                                        loading={!isLoading}
                                        loadingProp={this.loadingComponent()}
                                        mainPaperCard={classes.mainPaperCard} 
                                        defaultToggle={defaultToggle}
                                        unixDt={dtList.dt}
                                        forecastCard={classes.forecastCard}
                                        imageIcon={`http://openweathermap.org/img/w/${dtList.weather[0].icon}.png`}
                                        title={dtList.weather[0].main}
                                        description={dtList.weather[0].main}
                                        fahrenheit={returnRoundedNumber(dtList.main.temp)}
                                        celsius={returnCelsius(dtList.main.temp)}
                                    /> 
                                </Suspense>                                        
                                : null
                            )
                        })
                    )
                })
            )
        }
    }

    // ------------------------------------- Leaflet interactive radar map ------------------------------------------ //

    leafletMapDisplay = () => {
        const { fiveDayData } = this.props;
        const { isLoading } = this.state;

        if(!fiveDayData) {
            return <div>..Loading</div>
        } else {
            return (
                <Paper style={{margin: '4em 2em 2em 2em'}}>
                    <Suspense fallback={this.loadingComponent()}>
                        <LeafletMap 
                            loading={!isLoading}
                            loadingProp={this.loadingComponent()}
                            position={[fiveDayData.data.city.coord.lat, fiveDayData.data.city.coord.lon]}
                            zoom={6}
                            city={fiveDayData.data.city.name} 
                            country={fiveDayData.data.city.country}
                            lat={fiveDayData.data.city.coord.lat}
                            lon={fiveDayData.data.city.coord.lon}
                            main={fiveDayData.data.list[0].weather[0].main}
                            temp={returnRoundedNumber(fiveDayData.data.list[0].main.temp)}
                            celsius={returnCelsius(fiveDayData.data.list[0].main.temp)}
                        />
                    </Suspense>
                </Paper>
            )
        }
    }
            
    // ------------------------------------------------------------------------------------------------------- //

    render() {
        const { classes } = this.props;
        const { defaultToggle } = this.state;
        // ------------------------------------------------------------------------------------------------------------------------------- //
        return (
            <div className={`${classes.container} ${classes.hero}`}>
                <Grid container>
                    <Grid item md={12} xs={12} style={{height: '100%'}}>
                        <Grid 
                            direction='row'
                            container
                            style={{padding: `1.7em 5em 1em 5em`}}
                            className={`${classes.locationGrid} ${classes.gridCenter}`} 
                        >
                            <Grid item md={4} className={classes.gridCenter}>
                                {this.mainWeatherComponent()}          
                            </Grid>
                        </Grid>
                        {/* ------------------------------------------ Search Component ------------------------------------------- */}
                        <SearchBar />
                        {/* ------------------------------------------------------------------------------------------------------- */}
                    </Grid>
                </Grid>
                <Grid container className={classes.forecastContainer}>
                    {this.forecastHeader()}
                    <Grid item md={12} className={`${classes.forecastGrid} ${classes.gridCenter}`}>
                        {defaultToggle ? this.hourlyForecast() : this.fiveDayInformation()}
                    </Grid>
                    <Grid container direction='row' style={{justifyContent: 'center'}}>
                        <Grid item md={6} xs={12} style={{height: '400px', width: '100%'}}>
                            {this.leafletMapDisplay()}
                        </Grid>
                    </Grid>
                </Grid>
                <Footer />
            </div>
        )   
    }
};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
const mapStateToProps = state => {
    return {
        fiveDayData: state.fiveDayData.fiveDayDataInformation,
        defaultState: state.fiveDayData
    }
}

// ------------------------------------------------------------------------------------------------------- //

Home = connect(
    mapStateToProps,
    { fiveDayDataForecast, getLocation }
)(Home);

// ------------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Home);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //