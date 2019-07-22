import Http from './../../service/Http';
class ListTourController {
    static async getList(company_id, login_id, password) {
        let http = new Http(login_id, password);
        try {
            console.log('tour/tours/' + company_id + '/' + login_id);
            let res = await http.get('tour/tours/' + company_id + '/' + login_id);
            return res.data;
        }
        catch (e) {
            console.log('エラー', e);
        }
    };

    static async logout() {

    };
};

export default ListTourController;