
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import HeaderDrawer from './../HeaderDrawer/HeaderDrawer'
import ListActionDrawer from './../ListActionDrawer/ListActionDrawer'

import Home from './../../containers/Home/Home'
import Estadisticas from './../../containers/Estadisticas/Estadisticas'
import Jugadores from './../../containers/Jugadores/Jugadores'

import 'typeface-roboto';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
});

export class LayoutRouter extends Component {

    state = {
        mobileOpen: false,
        view: 'Partidos'
    }

    componentDidMount() {
        let view = ''
        let route = window.location.href.split('/')[3]
        
        if (route === 'estadisticas') {
            view = 'Estadísticas'
        } else if (route === 'jugadores') {
            view = 'Jugadores'
        }else{
            view = 'Partidos'
        }

        this.setState({ view: view })
    }

    handleDrawerToggle = (e) => {
        this.setState(state => ({
            mobileOpen: !state.mobileOpen,
            ...e
        }));
    };

    openDrawer = () => {
        this.setState(state => ({
            mobileOpen: true
        }));
    };

    render() {

        const { classes } = this.props;
        const { view } = this.state

        return (
            <Router>
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <IconButton className={classes.menuButton} onClick={() => this.openDrawer()} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                {view}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <nav>
                        <Drawer open={this.state.mobileOpen} onClose={() => this.handleDrawerToggle()}>
                            <HeaderDrawer />
                            <ListActionDrawer onCloseDrawer={this.handleDrawerToggle.bind(this)} />
                        </Drawer>
                    </nav>
                    <main>
                        <Route exact path="/" component={Home} />
                        <Route path="/estadisticas" component={Estadisticas} />
                        <Route path="/jugadores" component={Jugadores} />
                    </main>
                </div>
            </Router>
        )
    }
}

LayoutRouter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LayoutRouter);