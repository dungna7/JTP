import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux';
import ImageLogo from './../imgLogo/ImageLogo';
import { Icon } from 'native-base';
import { Dimensions, ImageBackground, View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { string } from './../../locales/i18n';
import Indicator from './../Indicator/Indicator';
import auth from './../../service/auth';
import Constant from './../../config/Constant';
import HomeController from './HomeController';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_id: '',
            icon: 'eye',
            password: '',
            company_id: '',
            showPassword: true,
            showError: false,
            isLoading: true,
            language: {},
            items: this.props.items || [],
            imgHeight: 211,
        };
        this.onLayout = this.onLayout.bind(this);
        this.db = new HomeController();
    }
    componentWillReceiveProps(props) {
        this.setState({ items: props.items })
    }

    componentWillMount() {
        setTimeout(() => { this.setState({ isLoading: false }) }, 1000);
        let retrieveData = this.getData();
        console.log(retrieveData);
    }
    _changeIcon() {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
            showPassword: !prevState.showPassword
        }));
    }
    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenWidth: Dimensions.get('window').width });
    };
    onLayout(event) {
        this.setState({
            screenWidth: event.nativeEvent.layout.width,
        });
    }

    forgotPassword = () => {
        Actions.resetPassword()
    }

    loginId = (text) => {
        this.setState({ login_id: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    storeData = async (userInfo) => {
        try {
            await AsyncStorage.setItem('@userInfo', userInfo);
            console.log("store success");
        } catch (e) {
            // saving error
            console.log("error store ", error);
        }
    }
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@userInfo')
            if (value !== null) {
                // value previously stored
                console.log("get value ", value);
                this.login(value);

                return;
            }
        } catch (e) {
            // error reading value
            console.log("getData stored error ", error);
            return e;
        }
    }
    async login(userInfo) {
        if ((this.state.company_id != '' && this.state.login_id != '' && this.state.password != '') || userInfo) {
            userInfo = JSON.parse(userInfo)
            let company_id = this.state.company_id ? this.state.company_id : userInfo[0];
            let login_id = this.state.login_id ? this.state.login_id : userInfo[1];
            let password = this.state.password ? this.state.password : userInfo[2];
            this.setState({ isLoading: true });
            let data = await auth.login(company_id, login_id, password);
            this.setState({ isLoading: false });
            userInfo = {
                user_contact: this.state.company_id,
                user_name: this.state.login_id,
                user_address: this.state.password
            }
            this.db.insert(userInfo);
            if (!data || Boolean(data.status) === false) {
                this.setState({
                    showError: true
                });
                return;
            }
            if (typeof data != "object") {
                localLogin(email, password, companycd);
                return;
            }
            if (data.loginuser == Constant.tourguider) {
                user = [this.state.company_id,
                this.state.login_id,
                this.state.password];
                this.storeData(JSON.stringify(user));
                Actions.listTour(data.tourguider)
                return;
            } else if (data.loginuser == Constant.participant) {
                Actions.listTour(data.participant)
                return;
            } else {

            }

        } else {
            this.setState({
                showError: true
            });
            return;
        }
    }
    getInitialState = function () {
        this.setState({
            showError: false
        });
    }
    toggleCancel = () => {
        this.setState({
            showError: !this.state.showError
        });
    }
    _renderCancel = () => {
        if (this.state.showError) {
            return (
                <View style={styles.errorMesage}>
                    <Text style={styles.textError}>
                        {string('login.login_error')}
                    </Text>
                </View>
            );
        } else {
            return null;
        }
    }
    render() {
        if (this.state.isLoading) {
            return <Indicator />;
        } else {
            return (
                <View styles={styles.container} onLayout={this.onLayout} >
                    <ImageBackground source={require('../../asset/img/top_slide.jpg')} style={styles.container}>
                        <ScrollView onContentSizeChange={this.onContentSizeChange}>
                            <View >
                                <ImageLogo style={styles.imgLogo} width={this.state.screenWidth} height={this.state.imgHeight} ></ImageLogo>
                                {this._renderCancel()}
                                <TextInput style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder={string('login.login_id')}
                                    placeholderTextColor="#a6a6a6"
                                    autoCapitalize="none"
                                    onChangeText={this.loginId} />
                                <View style={styles.input} >
                                    <TextInput style={styles.passwordInput}
                                        underlineColorAndroid="transparent"
                                        placeholder={string('login.Password')}
                                        placeholderTextColor="#a6a6a6"
                                        autoCapitalize="none"
                                        secureTextEntry={this.state.showPassword}
                                        onChangeText={this.handlePassword} />
                                    <Icon style={styles.icon} name={this.state.icon} onPress={() => this._changeIcon()} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.text} onPress={
                                        () => this.forgotPassword(this.state.companny_id, this.state.login_id)
                                    }>
                                        {string('login.forgot_password')}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={
                                        () => this.login(this.state.companny_id, this.state.login_id)
                                    }>
                                    <Text style={styles.submitButtonText}> {string('login.login_button')} </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            )
        }
    }
}
export default Home

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    imgLogo: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 10,
    },
    input: {
        marginVertical: 5,
        marginHorizontal: 10,
        height: 40,
        padding: 10,
        backgroundColor: '#ffffff',
        opacity: 0.75,
        fontSize: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorMesage: {
        marginVertical: 5,
        marginHorizontal: 10,
        height: 40,
        padding: 10,
        backgroundColor: '#ffffff',
        opacity: 0.75,
        fontSize: 16,
        borderRadius: 15,
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        right: 0,
        height: 40,
        padding: 5,
    },
    textContainer: {
        alignItems: 'center',
        margin: 8,
    },
    text: {
        color: '#0059b3',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    textError: {
        color: '#ff4d4d',
        fontSize: 16,
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#3399ff',
        padding: 10,
        margin: 15,
        height: 40,
        opacity: 0.75,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16
    }
})