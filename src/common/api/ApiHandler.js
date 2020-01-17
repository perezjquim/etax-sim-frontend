import axios from "axios";
//const BASE_DOMAIN = "https://localhost:5001";
const BASE_DOMAIN = "https://etax-sim-api.azurewebsites.net";
const BASE_URL = `${BASE_DOMAIN}/api/`;
export default
{
        getRepository: function(aName)
        {
                const oAPIController = axios.create(
                {
                        baseURL: BASE_URL,
                        headers:
                        {
                                "Accept": "*/*",
                                "Content-Type": "multipart/form-data;"
                        }
                });
                return {
                        get: function()
                        {
                                /*try
                                {*/
                                        return oAPIController.get(`${aName}`);
                                /*}
                                catch (e)
                                {
                                        return null;
                                }*/
                        },
                        getById: function(aId)
                        {
                                /*try
                                {*/
                                        return oAPIController.get(`${aName}/${aId}`);
                                /*}*/
                                /*catch (e)
                                {
                                        return null;
                                }*/
                        },
                        post: function(aData)
                        {
                                /*try
                                {*/
                                        const oForm = new FormData();
                                        for (const sKey in aData)
                                        {
                                                oForm.append(sKey, aData[sKey]);
                                        }                                     	
                                        return oAPIController.post(`${aName}`, oForm);
                                /*}
                                catch (e)
                                {
                                        return null;
                                }*/
                        }
                }
        }
};