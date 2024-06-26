import axios from 'axios'

class AuthServices{
    static BASE_URL = "http://localhost:8080/soft-prestamos/api"

    static async login(email, password){
        try {
            const response = await axios.post(`${AuthServices.BASE_URL}/auth/login`, {email, password})
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async register(userData, token){
        try {
            const response = await axios.post(`${AuthServices.BASE_URL}/super-admin/register`,userData,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
                return response.data;

        } catch (error) {
            throw error;
        }
    }

    static async getAllUser(token){
        try{
            const response = await axios.get(`${AuthServices.BASE_URL}/admin/get-all-users`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getYourProfile(token){
        try{
            const response = await axios.get(`${AuthServices.BASE_URL}/adminuser/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${AuthServices.BASE_URL}/admin/get-users/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async updateUser(userId, userData, token){
        try{
            const response = await axios.put(`${AuthServices.BASE_URL}/admin/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`${AuthServices.BASE_URL}/admin/delete/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isSuperAdmin(){
        const role = localStorage.getItem('role')
        return role === 'SUPER_ADMIN'
    }


    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

    static superAdminOnly(){
        return this.isAuthenticated() && this.isSuperAdmin();
    }

}

export default AuthServices;