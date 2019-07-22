import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from './../app/home/Home'
import ResetPassword from './../app/ResetPassword/ResetPassword'
import ListTour from './../app/ListTour/ListTour'
import { string } from './../locales/i18n'
import { StyleSheet } from 'react-native';

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            icon: "eye",
            password: "",
            showPassword: true,
            screenHeight: 0,
            language: {},
            items: this.props.items || [0],
        };
    }
    render() {
        return (
            <Router navigationBarStyle={{ backgroundColor: '#4d94ff', color: 'white', }} >
                <Scene key="root">
                    <Scene key="home" component={Home} title="Login" initial={true} items={this.state.items} hideNavBar={true} />
                    <Scene key="resetPassword" titleStyle={styles.title} component={ResetPassword} title={string('title.reset_password')} />
                    <Scene key="listTour" titleStyle={styles.title} component={ListTour} title={string('title.list_tour')} renderLeftButton={() => (null)} renderBackButton={() => (null)} />
                </Scene>
            </Router>
        )
    }
}

export default Routes

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#ffffff',
        flex: 1,
        textAlign: 'center'
    },
});