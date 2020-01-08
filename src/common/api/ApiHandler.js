import axios from "axios";

//const BASE_DOMAIN = "https://localhost:5001";
const BASE_DOMAIN = "https://etax-sim-api.azurewebsites.net";
const BASE_URL = `${BASE_DOMAIN}/api/`;

export default
    {
        getRepository: function (aName) {
            const oAPIController = axios.create({ baseURL: BASE_URL });
            return {
                get: function () {
                    try {
                        return oAPIController.get(`${aName}`);
                    }
                    catch (e) {
                        return null;
                    }
                },
                getById: function (aId) {
                    try {
                        return oAPIController.get(`${aName}/${aId}`);
                    }
                    catch (e) {
                        return null;
                    }
                },
                post: function (aData) {
                    try {
                        return oAPIController.post(`${aName}`, aData);
                    }
                    catch (e) {
                        return null;
                    }
                }
            }
        }
    };
