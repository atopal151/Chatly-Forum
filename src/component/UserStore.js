import { observable, makeObservable, action, runInAction } from 'mobx'
import { Alert } from 'react-native';

class UserStore {
    user = "";
    mail="";
    error = "";

    constructor() {
        // Object Make Observable and function add action
        makeObservable(this, {
            user: observable,
            mail: observable,
            setUser: action.bound,
            setMail: action.bound
        })
    }

    async setMail(mail) {
        this.error = "";
        this.mail="";

        try {
            runInAction(() => {
                this.mail = mail;
            })
        } catch (error) {
            runInAction(() => {
                this.error = 'Error retrieving information from server.';
            })

        }
    }


    //*async/await methot
    async setUser(user) {
        this.error = "";
        this.user = "";

        try {
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            runInAction(() => {
                this.error = 'Error retrieving information from server.';
            })

        }
    }

}

export default new UserStore();


