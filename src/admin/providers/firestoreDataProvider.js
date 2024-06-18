import { db, filterForDoc, refToData, uploadToStorage } from '@lib/firebase';
import { firestoreTimestampFormat } from '@util/DateFormatter';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, writeBatch, query, DocumentReference, orderBy, serverTimestamp } from 'firebase/firestore';
const maxWidth = 1000

const dataProvider = {
    getList: async (resource, { filter, sort, ...params }) => {
        let dbQuery = collection(db, resource)

        if(sort.field !== 'id') {
            const { field, order } = sort
            dbQuery = query(dbQuery, orderBy(field, order.toLowerCase()))
        }
        else {
            dbQuery = query(dbQuery, orderBy('updatedAt', 'desc'))
        }
        
        const querySnapshot = await getDocs(dbQuery);
        const data = await Promise.all(querySnapshot.docs.map(async doc => {
            const docData = await dataFormatForFirestore(doc.data(), true)
            return { id: doc.id, ...docData }
        }))

        if (filter !== {}) {
            for (const field of Object.values(filter)) {
                const { key, operator, value } = field
                // TOOD filterロジック実装
            }
        }
        const { perPage, page } = params.pagination
        const start = (page - 1) * perPage
        const end = page * perPage
        const pagination = data.slice(start, end)

        return { data: pagination, total: data.length };
    },
    getOne: async (resource, params) => {
        const docSnap = await getDoc(doc(db, resource, params.id));
        let data = { id: docSnap.id, ...docSnap.data() };
        data = await dataFormatForFirestore(data)
        return { data };
    },
    getMany: async (resource, params) => {
        const data = [];
        for (const id of params.ids) {
            const docSnap = await getDoc(doc(db, resource, id));
            data.push({ id: docSnap.id, ...docSnap.data() });
        }
        return { data };
    },
    getManyReference: async (resource, params) => {
        const querySnapshot = await getDocs(collection(db, resource).where(params.target, '==', params.id));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { data, total: data.length };
    },
    create: async (resource, { data }) => {
        data = await dataCreateForFirestore(resource, data)
        const { id } = await addDoc(collection(db, resource), data);
        await updateDoc(doc(db, resource, id), { id });
        return { data: { id, ...data} };
    },
    update: async (resource, { id, data }) => {
        data = await dataCreateForFirestore(resource, data)
        await updateDoc(doc(db, resource, id), data);
        const docData = { id, ...data };
        return { data: docData };
    },
    updateMany: async (resource, params) => {
        const batch = writeBatch(db);
        for (const id of params.ids) {
            const docRef = doc(db, resource, id);
            batch.update(docRef, params.data);
        }
        await batch.commit();
        return { data: params.ids };
    },
    delete: async (resource, params) => {
        await deleteDoc(doc(db, resource, params.id));
        return { data: params.previousData };
    },
    deleteMany: async (resource, params) => {
        const batch = writeBatch(db);
        for (const id of params.ids) {
            const docRef = doc(db, resource, id);
            batch.delete(docRef);
        }
        await batch.commit();
        return { data: params.ids };
    },
};


const dataCreateForFirestore = async (resource, data) => {
    data = filterForDoc(data)
    data = await uploadImages(resource, data)
    data = idToRef(data)
    data = {
        createdAt: serverTimestamp(),
        ...data, 
        updatedAt: serverTimestamp(),
    }

    return data
}

const dataFormatForFirestore = async (data, isList) => {
    data = firestoreTimestampFormat(data)
    data = isList ? await refToData(data) : refToId(data)
    return data
}


const uploadImages = async (resource, data) => {
    await Promise.all(Object.keys(data).map(async key => {
        if (Array.isArray(data[key])) {
            return data[key] = await uploadImages(resource, data[key])
        }

        if (data[key]?.hasOwnProperty('rawFile')) {
            const file = data[key].rawFile

            data[key] = {
                src: await uploadToStorage(resource, file) || '',
                ...await getImageDimensions(file)
            }
        }
    }))
    return data
}

const  getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function() {
        const width = this.width;
        const height = this.height;

        const aspectRatio = height / width;

        let newWidth = width;
        let newHeight = height;    

        if (width > maxWidth) {
            newWidth = 1000;
            newHeight = newWidth * aspectRatio;
        }

        URL.revokeObjectURL(img.src);  // 一時的なURLを解放
        resolve({ width: newWidth, height: newHeight });
    };

    img.onerror = function() {
        reject(new Error("Failed to load image"));
    };

    img.src = URL.createObjectURL(file);
    });
}

const idToRef = (data) => {
    for (const key in data) {
        if (key.includes('Ref')) {
            const id = data[key]
            const refResource = key.replace('Ref', '')
            const ref = doc(db, refResource, id)
            data[key] = ref
        }
    }

    return data
}

const refToId = (data) => {
    for (const key in data) {
        const field = data[key]
        if (field instanceof DocumentReference) {
            data[key] = field.id
        }
    }
    return data
}

export default dataProvider;
