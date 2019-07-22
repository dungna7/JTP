import React, { Component } from 'react'
import { ImageBackground } from 'react-native'
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'

class Indicator extends Component {
    render() {
        return (
            <ImageBackground source={require('../../asset/img/top_slide.jpg')} style={styles.container}>
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </ImageBackground>
        )
    }
}
export default Indicator;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})