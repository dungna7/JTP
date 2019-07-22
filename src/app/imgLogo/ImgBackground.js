import React, { Component } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'

const ImgBackground = () => {
    return (
        <ImageBackground source={require('./../../assets/img/top_slide.jpg')} style={styles.container}>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', },
});
export default ImgBackground