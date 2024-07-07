import { openDB } from 'idb';
import AuthServices from "./AuthServices";

class Utils {
    static async initializeDB() {
        try {
            const db = await openDB('ExternalDB', 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains('userProfile')) {
                        db.createObjectStore('userProfile', { keyPath: 'id' }); 
                       // console.log('Almacén de objetos "userProfile" creado.');
                    }
                }
            });
            return db;
        } catch (error) {
            console.error('Error al inicializar la base de datos IndexedDB:', error);
            throw error;
        }
    }

    static async storeUserProfile(profile) {
        try {
            const db = await Utils.initializeDB();
            const tx = db.transaction('userProfile', 'readwrite');
            const store = tx.objectStore('userProfile');
            await store.put(profile); // Almacena el perfil sin una clave única
            await tx.done;
            //console.log('Perfil del usuario almacenado en IndexedDB.',profile);
        } catch (error) {
            console.error('Error al almacenar el perfil del usuario:', error);
            throw error;
        }
    }

    static async deleteUserProfile() {
        try {
            const db = await Utils.initializeDB();
            const tx = db.transaction('userProfile', 'readwrite');
            const store = tx.objectStore('userProfile');
            const userId = localStorage.getItem('userId');
            await store.delete(userId); // Elimina todos los datos del almacén 'userProfile'
            await tx.done;
            localStorage.removeItem('userId');
            //console.log('Perfil del usuario eliminado de IndexedDB.');
        } catch (error) {
            console.error('Error al eliminar el perfil del usuario desde IndexedDB:', error);
            throw error;
        }
    }

    static async fetchUserProfileFromServer() {
        try {
            const token = localStorage.getItem('token');
            const profile = await AuthServices.getYourProfile(token);
            localStorage.setItem('userId', profile.administradores.id);
            await Utils.storeUserProfile(profile.administradores);
            return profile;
        } catch (error) {
            console.error('Error al obtener el perfil del usuario desde el servidor:', error);
            throw error;
        }
    }

    static async getUserProfile() {
        try {
            const db = await Utils.initializeDB();
            const tx = db.transaction('userProfile', 'readonly');
            const store = tx.objectStore('userProfile');
            const userId = localStorage.getItem('userId');
            const profile = await store.get(userId);
            await tx.done;
            return profile;
        } catch (error) {
            console.error('Error al obtener el perfil del usuario desde IndexedDB:', error);
            throw error;
        }
    }
}

export default Utils;
