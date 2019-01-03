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
            width: '10em'
          }
    },
    colorTextEnhance: {
        color: '#fff',
        textShadow: '1px 1px 1px #000'
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
        defaultToggle,
        mainPaperCard,
        // Value passed in from the parent component(Home)
        forecastCard
    } = props;
     
    return (
        <Card className={`${classes.cardContainer} ${forecastCard} ${mainPaperCard}`}>
            <CardHeader
                title={ name || country ? `${name}, ${country}` : null }
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
                        style={{width: '50%'}}
                    />
                </div>
            </CardActionArea>
            {/* If there isn't wind/humidity values being passed in(due to this component being used a 5 day forecast) */}
            {/* Display smaller and minimal text(for 5 day forecast component) */}
            {!wind || !humidity 
                ? 
            <Typography gutterBottom variant="body2">
                <span style={{display: 'block'}}>{temperature}&deg;</span> 
                <span style={{display: 'block'}}>{description}</span>
            </Typography>
                :
            // Else if all values are being passed into the component(Being used at the main component/current weather)
            // Display normal, hero based text
            <Typography gutterBottom variant="h3" component="h2" className={classes.colorTextEnhance}>
                <span style={{display: 'block'}}>{temperature}&deg;</span> 
                <span style={{display: 'block'}}>{description}</span>
            </Typography>
            }
            <Typography gutterBottom variant="body2" className={classes.colorTextEnhance}>
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
