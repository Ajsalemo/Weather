// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI components
import { withStyles } from '@material-ui/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ArrowUpward } from '@material-ui/icons';
import Code from '@material-ui/icons/Code'; 
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
    locationOff: {
        color: 'red'
    },
    locationOn: {
        color: '#2347bd'
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

    ScrollTop = () => {
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        })
    }
    
    render() {
    const { classes, locationEnabled } = this.props;
    const { value } = this.state;

    return (
        <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels={false}
        className={classes.root}
        >
            <BottomNavigationAction 
                label="Scroll to top" 
                icon={<ArrowUpward />} 
                classes={{
                    iconOnly: classes.iconColorOveride
                }}
                onClick={this.ScrollTop.bind(this)}
            />
            <BottomNavigationAction 
                label={locationEnabled ? "Location is on" : "Location is off"}
                icon={<LocationOnIcon />} 
                classes={{
                    iconOnly: locationEnabled ? classes.locationOn : classes.locationOff
                }}
            />
            <BottomNavigationAction 
                label="Code" 
                icon={<Code />} 
                classes={{
                    iconOnly: classes.iconColorOveride
                }}
                href="https://github.com/Ajsalemo/React-MaterialUI"
                target="_blank"
            />
        </BottomNavigation>
    );
    }
}

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
const mapStateToProps = state => {
    return {
        locationEnabled: state.locationPrompt.location
    }
}

// ------------------------------------------------------------------------------------------------------- //

Footer = connect(
    mapStateToProps
)(Footer);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Footer);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
