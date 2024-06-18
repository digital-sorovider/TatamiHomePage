import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, getDoc, doc, collection, query, orderBy, DocumentReference } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { firestoreTimestampFormat } from '@util/DateFormatter';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
    apiKey: "AIzaSyCSSIgM_OdbDqXt_Zl_uwBPNIjye5KE_dk",
    authDomain: "tatami-f2ad1.firebaseapp.com",
    projectId: "tatami-f2ad1",
    storageBucket: "tatami-f2ad1.appspot.com",
    messagingSenderId: "896115515729",
    appId: "1:896115515729:web:7bc9fe7d0ce483c5f33370"
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app);

export const getAll = async (resource, params) => {
    let dbQuery = collection(db, resource)

    if(params?.sort) {
        if (Array.isArray(params.sort)) {
            for (const sort of params.sort) {
                const { field, order } = sort
                dbQuery = query(dbQuery, orderBy(field, order))
            }
        }
    }
    const querySnapshot = await getDocs(dbQuery);
    const data = Promise.all(querySnapshot.docs.map(async doc => {
        const docData = await dataFormatForEnd(doc.data())
        return { id: doc.id, ...docData }
    }))
    return data
}

export const find = async (resource, searchParam) => {
    const q = query(collection(db, resource), searchParam);
    
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data
}

export const getOne = async (resource, id) => {
    const docSnap = await getDoc(doc(db, resource, id));
    let data = docSnap.data()
    data = await dataFormatForEnd(data)
    return {id: docSnap.id, ...data}
}

export const uploadToStorage = async (resource, file) => {
    const id = uuidv4()
    const storageRef = ref(storage, `${resource}/${id}`)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
} 

export const filterForDoc = (data) => {
    for (const v in data) {
        if (data[v] === undefined) {
            delete data[v];
        }
    }
    return data
}

const dataFormatForEnd = async (data) => {
    data = filterForDoc(data)
    data = firestoreTimestampFormat(data)
    data = await refToData(data)
    return data
}

export const refToData = async (data) => {
    for (const key in data) {
        const field = data[key]
        if (field instanceof DocumentReference) {
            const docDataKey = key.replace('Ref', '')
            const doc = await getDoc(field)
            data[docDataKey] = await dataFormatForEnd(doc.data())
            delete data[key]
        }
    }

    return data
}