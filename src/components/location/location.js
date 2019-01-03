// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React from 'react';
import moment from 'moment';


// Material UI components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    cardContainer: {
        width: 'auto',
        [theme.breakpoints.up(418)]: {
            width: '12em'
          },
        textAlign: 'center'
    },
    colorOveride: {
        color: '#fff'
    },
    imageCenter: {
        width: '50%',
        margin: 'auto'
    }
});

// ------------------------------------------------------------------------------------------------------- //


let Location = props => {
    const { 
        classes, 
        description, 
        name, 
        country, 
        fahrenheit, 
        celsius,
        wind,
        humidity,
        imageIcon,
        unixDt,
        defaultToggle,
        mainPaperCard,
        // Value passed in from the parent component(Home)
        forecastCard
    } = props;
     
    return (
        <Card className={`${classes.cardContainer} ${classes.colorOveride} ${forecastCard} ${mainPaperCard}`}>
            <CardHeader
                title={ name || country ? `${name}, ${country}` : null }
                classes={{ 
                    title: classes.colorOveride, 
                    subheader: classes.colorOveride
                }}
                // Conditional statement depending on which type of forecast is selected
                // This statement takes into account the main weather component in the header
                subheader={
                    (!name && !country && !defaultToggle)
                        ?
                    moment.unix(unixDt).format("ddd, Do")
                        :
                    (!name && !country && defaultToggle)
                        ?
                    moment.unix(unixDt).format("ddd, hA")
                        :
                    moment().format('MMMM Do YYYY, h:mm a')
                }
                style={{padding: '0.3em'}}
            />
            <CardActionArea>
                <div>
                    <CardMedia 
                        component="img"
                        alt="weather"
                        title={description}
                        image={imageIcon}
                        className={classes.imageCenter}
                    />
                </div>
            </CardActionArea>
            {/* If there isn't wind/humidity values being passed in(due to this component being used a 5 day forecast) */}
            {/* Display smaller and minimal text(for 5 day forecast component) */}
            {!wind || !humidity 
                ? 
            <Typography gutterBottom variant="body2" className={classes.colorOveride}>
                <span style={{display: 'inline-block'}}>{fahrenheit}&deg;F</span> 
                /
                <span style={{display: 'inline-block'}}>{celsius}&deg;C</span>
                <span style={{display: 'block'}}>{description}</span>
            </Typography>
                :
            // Else if all values are being passed into the component(Being used at the main component/current weather)
            // Display normal, hero based text
            <Typography gutterBottom variant="h4" component="h2" className={classes.colorOveride}>
                <span style={{display: 'inline-block'}}>{fahrenheit}&deg;F</span> 
                /
                <span style={{display: 'inline-block'}}>{celsius}&deg;C</span> 
                <span style={{display: 'block'}}>{description}</span>
            </Typography>
            }
            <Typography gutterBottom variant="body2" className={classes.colorOveride}>
                { wind ? <span style={{display: 'block'}}>Wind speed: {wind}mph</span> : null } 
                { humidity ? <span style={{display: 'block'}}>Humidity: {humidity}%</span> : null }
            </Typography>
        </Card>
    )
};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Location);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
