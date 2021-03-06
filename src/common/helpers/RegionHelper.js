import ApiHandler from "../api/ApiHandler";

export default
{
        onBeforeRouteEnter: async function(vm)
       {
            const oRegionRepository = ApiHandler.getRepository("regions");
            const oStrategyRepository = ApiHandler.getRepository("StrategyByCountries/country/region");
            const sRegionId = vm.$route.params.id;
            /*try
            {*/
              const oRegionInfo = await oRegionRepository.getById(sRegionId);
              vm.region = oRegionInfo.data.region;
              const sCountryId = vm.region.countryId;
              /*try
              {   */           
                    const  oStrategyInfo = await oStrategyRepository.getById(`${sCountryId}/${sRegionId}`);
                    vm.strategies = oStrategyInfo.data.map(function(s)
                    {
                        var oExceptionStrategy = this._getExceptionStrategy(s);                            
                        if(oExceptionStrategy)
                        {
                            return oExceptionStrategy.strategy;
                        }
                        else
                        {
                            return s.strategy;
                        }
                        
                    }.bind(this));   
              /*}
              catch(e)
              {
                    alert(">> strategy info not obtained");
              }              
            }
            catch(e)
            {
              alert(">> region info not obtained");
            }  */            
       },

        _getExceptionStrategy: function(oStrategy)
        {
            const oExceptionList = oStrategy["strategyByCountryByRegion"];
            return oExceptionList && oExceptionList[0];
        }

    };
