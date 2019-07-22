import Http from './Http';
class auth {

    static async login(company_id, login_id, password) {
        let http = new Http(login_id, password);
        let data = {
            'identify': login_id,
            'password': password,
            'companycd': company_id
        };
        try {
            let res = await http.post('user/login', data);
            return res.data;
        }
        catch (e) {
            console.log('エラー', e);
        }
    };
    static async logout() {

    };
};

export default auth;