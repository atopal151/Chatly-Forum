import { observable, makeObservable, action, runInAction } from 'mobx'
import { Alert } from 'react-native';

class UserStore {
    user = "";
    error = "";

    constructor() {
        makeObservable(this, {
            user: observable,
            setUser: action.bound
        })
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


