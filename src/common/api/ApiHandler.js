import axios from "axios";

const BASE_DOMAIN = "https://localhost:5001";
const BASE_URL = `${BASE_DOMAIN}/api/`;

export default
{
    getRepository: function (aName) {
        const oAPIController = axios.create({ baseURL: BASE_URL });
        return {
            get: function () {
                return oAPIController.get(`${aName}`);
            },
            getById: function (aId) {
                return oAPIController.get(`${aName}/${aId}`);
            },
            post: function (aData) {
                return oAPIController.get(`${aName}`, aData);
            }
        }
    }
};
