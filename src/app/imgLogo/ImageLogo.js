import React, { Component } from 'react'
import { Image } from 'react-native'
class ImageLogo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
        };
    }
    render() {
        return (
            <Image source={require('./../../asset/img/top_logo.png')}
                style={{ width: this.state.width, height: this.state.height, resizeMode: "contain", }}>
            </Image>
        )
    }
}
export default ImageLogo