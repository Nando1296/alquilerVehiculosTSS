import { openDB } from 'idb';

const dbName = 'alquilerVehiculosDB';
const storeName = 'simulacionData';

    export const initDB = async () => {
        const db = await openDB(dbName, 1, {
            upgrade(db) {
            if (!db.objectStoreNames.contains(storeName)) {
                const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            }
            },
        });

        return db;
    };

    export const saveSimulacion = async (simulacionData) => {
        const db = await initDB();
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        await store.add(simulacionData);
        await tx.done;
    };

    export const getAllSimulaciones = async () => {
        const db = await initDB();
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        return store.getAll();
    };

    export const getSimulacionPorId = async (simulacionId) => {
        try {
            const db = await openDB('alquilerVehiculosDB', 1);
            const transaction = db.transaction('simulacionData', 'readonly');
            const store = transaction.objectStore('simulacionData');
            const simulacion = await store.get(simulacionId);
            return simulacion;
        } catch (error){
            console.error('Error al recuperar el elementos por ID: ', error);
        }
    }
