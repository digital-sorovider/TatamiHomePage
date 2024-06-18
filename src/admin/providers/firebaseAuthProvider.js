import { auth } from '../../lib/firebase'
import { signInWithEmailAndPassword, signOut,  } from 'firebase/auth'
import dataProvider from "./firestoreDataProvider";

const authProvider = {
    login: async ({ username, password }) => {
        try {
            // ユーザーのログイン処理をFirebase Authenticationで行う
            await signInWithEmailAndPassword(auth, username, password);
            // ログイン成功時の処理を追加する場合はここに記述
        } catch (error) {
            // ログイン失敗時の処理を追加する場合はここに記述
            throw new Error('ログインに失敗しました');
        }
    },

    logout: async () => {
        try {
            // ユーザーのログアウト処理をFirebase Authenticationで行う
            await signOut(auth);
            // ログアウト成功時の処理を追加する場合はここに記述
        } catch (error) {
            // ログアウト失敗時の処理を追加する場合はここに記述
            throw new Error('ログアウトに失敗しました');
        }
    },

    checkError: (error) => {
        // エラーハンドリングのカスタマイズを行う場合はここに記述
    },

    checkAuth: async () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                unsubscribe();
                if (user) {
                    const { data } = await dataProvider.getOne('admin', {id: user.uid})
                    if(data.status) {
                        resolve();
                    }
                    else {
                        reject({ message: '管理者の承認を得てから、再度ログインしてください' });
                    }
                } else {
                    reject({ message: 'ログインしてください' });
                }
            });
        });
    },

    getPermissions: () => {
        // ユーザーの権限を取得する場合はここに記述
        return Promise.resolve();
    },
};

export default authProvider;