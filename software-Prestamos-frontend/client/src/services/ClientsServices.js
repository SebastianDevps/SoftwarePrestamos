import axios from 'axios';
import Cookies from "js-cookie"; // Importar js-cookie

class ClientsServices {
    static BASE_URL = "http://localhost:8080/soft-prestamos/api/adminsuper-admin/clientes";

    static async getAllClients() {
        try {
            const response = await axios.get(ClientsServices.BASE_URL, {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getClientByCedula(cedula) {
        try {
            const response = await axios.get(`${ClientsServices.BASE_URL}/${cedula}`, {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async createClient(clientData) {
        try {
            const response = await axios.post(ClientsServices.BASE_URL, clientData, {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async updateClient(cedula, clientData) {
        try {
            const response = await axios.put(`${ClientsServices.BASE_URL}/${cedula}`, clientData, {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteClient(cedula) {
        try {
            const response = await axios.delete(`${ClientsServices.BASE_URL}/${cedula}`, {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ClientsServices;
