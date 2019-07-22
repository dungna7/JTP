
import { openDatabase } from 'react-native-sqlite-storage';

class HomeController {
    db = {};
    constructor() {
        this.db = openDatabase({ name: 'UserDatabase.db' });
        this.db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
                            []
                        );
                        console.log('CREATE TABLE successfully');
                    }
                }
            );
        });
    }
    insert(data) {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql('INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
                    [data["user_name"], data["user_contact"], data["user_address"]],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            result = true;
                            message = 'Create new hero successfully!';
                        } else {
                            result = false;
                            message = 'Create new hero failed!';
                        }
                        resolve({ result: result, message: message });
                    }, (error) => {
                        result = false;
                        message = `${error.message}`;
                        reject({ result: result, message: message });
                    });
            })
        });
    }
    searchUser = (user_id) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM table_user where user_id = ?',
                    [user_id],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            result = results.rows.item(0);
                            message = `Found 1 user with id=${user_id}`;
                        } else {
                            result = null;
                            message = `Not found user with id=${id}`;
                        }
                        resolve({ result: result, message: message });
                    }, (error) => {
                        result = null;
                        message = `${error.message}`;
                        reject({ result: result, message: message });
                    }
                );
            });
        });
    };
    update(data) {
        return new Promise((resolve, reject) => {
           
            if (!data) {
                result = false;
                message = 'Invalid hero input!';
                resolve({ result: result,
                     message: message });
            }
    
            this.db.transaction((tx) => {
                tx.executeSql('UPDATE Hero SET HeroName=? WHERE HeroId=?', [hero.heroName, hero.heroId], (tx, results) => {
                    if (results.rowsAffected > 0) {
                        msg.result = true;
                        msg.message = 'Update hero successfully!';
                    } else {
                        msg.result = false;
                        msg.message = 'Update hero failed!';
                    }
                    resolve({ result: msg.result, message: msg.message });
                }, (error) => {
                    msg.result = false;
                    msg.message = `${error.message}`;
                    resolve({ result: msg.result, message: msg.message });
                });
            })
        });

        
    }
    getList() {
        return new Promise((resolve, reject) => {
            let temp = [];
            this.db.transaction((tx) => {
                tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
                    for (let i = 0; i < results.rows.length; i++) {
                        temp.push(results.rows.item(i));
                    }
                    resolve(temp);
                }, (error) => {
                    result = [];
                    message = `${error.message}`;
                    reject({ result: result, message: message });
                });
            })
        });
    };
    deleteUser = (user_id) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM  table_user where user_id=?',
                [user_id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        console.log('delete successfully');
                    } else {
                        console.log('Please insert a valid User Id');
                    }
                }
            );
        });
    };
    static async logout() {

    };

};

export default HomeController;