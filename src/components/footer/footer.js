// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';

// Material UI components
import { withStyles } from '@material-ui/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

const styles = {
    root: {
      backgroundColor: '#ffffff6b',
    },
    iconColorOveride: {
        color: '#fff'
    },
    selectedIcon: {
        color: '#43bedf'
    }
};

// ------------------------------------------------------------------------------------------------------- //
// NOTE: These are mostly placeholder values for a footer template
class Footer extends Component {
    state = {
        value: 0,
      };
    
      handleChange = (e, value) => {
        this.setState({ value });
      };
    
      render() {
        const { classes } = this.props;
        const { value } = this.state;
    
        return (
          <BottomNavigation
            value={value}
            onChange={this.handleChange}
            showLabels={false}
            className={classes.root}
          >
            <BottomNavigationAction 
                label="Recents" 
                icon={<RestoreIcon />} 
                classes={{
                    iconOnly: classes.iconColorOveride
                }}
            />
            <BottomNavigationAction 
                label="Favorites" 
                icon={<FavoriteIcon />} 
                classes={{
                    iconOnly: classes.iconColorOveride
                }}
            />
            <BottomNavigationAction 
                label="Nearby" 
                icon={<LocationOnIcon />} 
                classes={{
                    iconOnly: classes.iconColorOveride
                }}
            />
          </BottomNavigation>
        );
      }
}

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Footer);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
