import ApiHandler from "../api/ApiHandler";

export default
{
       onBeforeRouteEnter: async function(vm)
       {
          //
          vm;
          //
       },

       submitData: async function(oData)
       {
              const oSimulationStrategy = ApiHandler.getRepository("Simulation");
              try
              {
                return await oSimulationStrategy.post(oData);
              }
              catch(e)
              {
                alert(">> simulation failed");
              }
       }       
};
