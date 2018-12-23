// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material UI components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core';

// Images
import Sun from '../../images/Sun.png';

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


const Location = props => {
    const { classes } = props;
    return (
        <Card className={classes.cardContainer}>
            <CardHeader
                title="Hemby Bridge, NC"
                subheader="Sunday, 12/13/18"
            />
            <CardActionArea>
                <CardMedia 
                    component="img"
                    alt="weather"
                    title="Sunny"
                    image={Sun}
                />
            </CardActionArea>
        </Card>
    )
};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Location);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
