import ApiHandler from "../api/ApiHandler";

export default
{
       onBeforeRouteEnter: async function(vm)
       {
            const oRegionRepository = ApiHandler.getRepository("regions");
            const oStrategyRepository = ApiHandler.getRepository("strategies");
            const sRegionId = vm.$route.params.id;
            try
            {
              const oRegionInfo = await oRegionRepository.getById(sRegionId);
              const sCountryId = oRegionInfo.data.region.countryId;
              const sPath = vm.$route.path;                  
              const sStrategyId = sPath.substr(sPath.lastIndexOf("/")+1);    
              try
              {
                const oStrategyInfo = await oStrategyRepository.getById(sStrategyId);
                vm.strategy = oStrategyInfo.data;    
                vm.strategy.countryId = sCountryId;
                vm.strategy.regionId = sRegionId;
              }
              catch(e)
              {
                alert(">> strategy info not obtained");
              }          
            }
            catch(e)
            {
              alert(">> region info not obtained");
            }                      
       },

       onSubmit: async function(oVM,oData)
       {
              const oSimulationRepository = ApiHandler.getRepository(`strategies/${oVM.strategy.id}/${oVM.strategy.countryId}/${oVM.strategy.regionId}/evaluate`);
              try
              {
                return await oSimulationRepository.post(oData);
              }
              catch(e)
              {
                alert(">> simulation failed");
              }
       }       
};
