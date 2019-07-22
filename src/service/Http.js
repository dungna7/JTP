import axios from 'react-native-axios';
import Constant from './../config/Constant';
const qs = require('qs');

class Httprequest {
    constructor(username, password) {
        this.baseURL = Constant.API_URL
        this.userid = username
        this.password = password
        this.axios = axios.create({
            baseURL: Constant.API_URL,
            timeout: Constant.API_TIMEOUT,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: username,
                password: password
            },
        });
    }
    get(url) {
        return this.axios.get(url);
    }
    post(url, data) {
        return this.axios.post(url, qs.stringify(data));
    }
};
export default Httprequest;