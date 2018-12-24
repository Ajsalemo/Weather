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

// Images
import Sun from '../../images/Sun.png';

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
    const { classes, description, name, country, temperature } = props;
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
                    image={Sun}
                />
            </CardActionArea>
            <Typography gutterBottom variant="h3" component="h2">
                <span style={{display: 'block'}}>{temperature}&deg;</span> 
                <span style={{display: 'block'}}>{description}</span>
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
