// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


// Material UI components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

// Actions
import { submitSearchLocation } from '../../redux/actions';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    cardContainer: {
        width: 'auto',
        [theme.breakpoints.up(418)]: {
            width: '15em'
          }
    }
});

// ------------------------------------------------------------------------------------------------------- //


let Location = props => {
    const { 
        classes, 
        description, 
        name, 
        country, 
        temperature, 
        wind,
        humidity,
        imageIcon,
        unixDt,
        // Value passed in from the parent component(Home)
        forecastCard
    } = props;
    return (
        <Card className={`${classes.cardContainer} ${forecastCard}`}>
            <CardHeader
                title={ name || country ? `${name}, ${country}` : null }
                subheader={ name || country ? moment().format('MMMM Do YYYY, h:mm a') : moment.unix(unixDt).format("ddd, hA") }
            />
            <CardActionArea>
                <CardMedia 
                    component="img"
                    alt="weather"
                    title={description}
                    image={imageIcon}
                    style={{width: '50%'}}
                />
            </CardActionArea>
            {/* If there isn't wind/humidity values being passed in(due to this component being used a 5 day forecast) */}
            {/* Display smaller and minimal text(for 5 day forecast component) */}
            {!wind || !humidity 
                ? 
            <Typography gutterBottom variant="body2" style={{paddingLeft: '0.3em'}}>
                <span style={{display: 'block'}}>{temperature}&deg;</span> 
                <span style={{display: 'block'}}>{description}</span>
            </Typography>
                :
            // Else if all values are being passed into the component(Being used at the main component/current weather)
            // Display normal, hero based text
            <Typography gutterBottom variant="h3" component="h2" style={{paddingLeft: '0.3em'}}>
                <span style={{display: 'block'}}>{temperature}&deg;</span> 
                <span style={{display: 'block'}}>{description}</span>
            </Typography>
            }
            <Typography gutterBottom variant="body2" style={{paddingLeft: '1em'}}>
                { wind ? <span style={{display: 'block'}}>Wind speed: {wind}mph</span> : null } 
                { humidity ? <span style={{display: 'block'}}>Humidity: {humidity}%</span> : null }
            </Typography>
        </Card>
    )
};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

Location = connect(
    null,
    { submitSearchLocation }
)(Location);

// ------------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Location);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
