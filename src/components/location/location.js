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
        imageIcon
    } = props;
    return (
        <Card className={classes.cardContainer}>
            <CardHeader
                title={`${name}, ${country}`}
                subheader={moment().format('MMMM Do YYYY, h:mm a')}
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
            <Typography gutterBottom variant="h3" component="h2" style={{paddingLeft: '0.3em'}}>
                <span style={{display: 'block'}}>{temperature}&deg;</span> 
                <span style={{display: 'block'}}>{description}</span>
            </Typography>
            <Typography gutterBottom variant="body2" style={{paddingLeft: '1em'}}>
                <span style={{display: 'block'}}>Wind speed: {wind}mph</span> 
                <span style={{display: 'block'}}>Humidity: {humidity}%</span>
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
