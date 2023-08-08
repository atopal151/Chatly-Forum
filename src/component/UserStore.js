import { observable, makeObservable, action, runInAction } from 'mobx'
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

class UserStore {
    user = "";
    mail = "";
    messageCount = "";
    userData=[];
    error = "";

    constructor() {
        // Object Make Observable and function add action
        makeObservable(this, {
            user: observable,
            mail: observable,
            messageCount: observable,
            setUser: action.bound,
            setMail: action.bound
        })
    }

    async setMail(mail) {
        this.error = "";
        this.mail = "";

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

    async setMessageCount() {
        this.error = "";
        this.messageCount = "";
        this.userData=[];

        try {
            runInAction(() => {
                firestore()
                    .collection('chats')
                    .doc(auth().currentUser.uid)
                    .collection('user')
                    .onSnapshot((snapshot) => {
                        const userData = snapshot.docs.map((doc) => doc.data()).reverse();
                        this.messageCount = userData.length;
                        console.log(userData);
                    }, (error) => {
                        console.log('Veriler yüklenirken hata oluştu:', error);
                    });
               
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


