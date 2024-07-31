import axios from "axios";
import Cookies from "js-cookie"; // Importar js-cookie

class PrestamosServices {
  static BASE_URL =
    "http://localhost:8080/soft-prestamos/api/adminsuper-admin/prestamos";

    static async getAllPrestamo() {
      try {
          const response = await axios.get(PrestamosServices.BASE_URL, {
              headers: { Authorization: `Bearer ${Cookies.get('token')}` }
          });
          return response.data;
      } catch (error) {
          throw error;
      }
  }



  static async createPrestamo(prestamoData) {
    try {
      const response = await axios.post(
        PrestamosServices.BASE_URL,
        prestamoData,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default PrestamosServices;
