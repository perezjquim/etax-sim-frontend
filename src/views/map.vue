<template>
    <div style="width: 100%; height: 100%;">
        <div id="chartdiv" style="width: 100%; height: 100%;" />
        <v-progress-circular id="loading-indicator" :size="100" style="height: 50%; width: 100vw; position: absolute; top: 25%;" indeterminate>
        </v-progress-circular>
    </div>
</template>

<script>
    import Vue from 'vue'
    import LoadScript from 'vue-plugin-load-script';
    import ApiHandler from "../common/api/ApiHandler";
    import Router from '../router';
    const oCountriesConfig = require("../common/config/countries");
    const oContinentsConfig = require("../common/config/continents");

    Vue.use(LoadScript);

    var am4core, am4maps, am4geodata_worldLow;

    const oCountries = ApiHandler.getRepository("countries");

    const onBeforeRouteEnter = function () {
        Vue.loadScript("../static/amcharts-core.js").then(() => {
            Vue.loadScript("../static/amcharts-maps.js").then(() => {
                Vue.loadScript("../static/amcharts-worldLow.js").then(() => {
                    Vue.loadScript("../static/amcharts-animated.js").then(() => {
                        am4core = window.am4core;
                        am4maps = window.am4maps;
                        am4geodata_worldLow = window.am4geodata_worldLow;
                        am4core.ready(function () {
                            oMap.onInit();
                        });
                    })
                })
            })
        });
    };

    const oMap = {

        _getCountries: async function () {
            try {
                const countries = await oCountries.get();
                if (countries) {
                    this.oConfiguredCountries = countries.data;
                    return Object.fromEntries(
                        Object.entries(oCountriesConfig).filter(
                            ([key]) => this._isCountryConfigured(key)
                        )
                    );
                }
                else {
                    this._message("No countries!");
                    return [];
                }
            }
            catch (e) {
                this._message("API failure!");
            }
        },

        _prepareZoom: function () {
            this.oChart.zoomControl = new am4maps.ZoomControl();
            const oHomeButton = new am4core.Button();
            oHomeButton.events.on("hit", this.onHomeSelected.bind(this));
            oHomeButton.icon = new am4core.Sprite();
            oHomeButton.padding(7, 5, 7, 5);
            oHomeButton.width = 30;
            oHomeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
            oHomeButton.marginBottom = 10;
            oHomeButton.parent = this.oChart.zoomControl;
            oHomeButton.insertBefore(this.oChart.zoomControl.plusButton);
        },

        _prepareCountriesData: function () {
            const data = [];
            for (var id in this.oCountries) {
                const country = this.oCountries[id];
                if (country.maps.length > 0) {
                    data.push({
                        id: id,
                        color: this.oChart.colors.getIndex(this.oContinents[country.continent_code]),
                        map: country.maps[0]
                    });
                }
            }
            return data;
        },

        _prepareWorldSeries: function () {
            this.oWorldSeries = this.oChart.series.push(new am4maps.MapPolygonSeries());
            this.oWorldSeries.useGeodata = true;
            this.oWorldSeries.geodata = am4geodata_worldLow;
            this.oWorldSeries.exclude = ["AQ"];
            const oWorldPolygon = this.oWorldSeries.mapPolygons.template;
            oWorldPolygon.tooltipText = "{name}";
            oWorldPolygon.nonScalingStroke = true;
            oWorldPolygon.strokeOpacity = 0.5;
            oWorldPolygon.fill = am4core.color("#eee");
            oWorldPolygon.propertyFields.fill = "color";
            const oWorldHs = oWorldPolygon.states.create("hover");
            oWorldHs.properties.fill = this.oChart.colors.getIndex(9);
            oWorldPolygon.events.on("hit", this.onCountrySelected.bind(this));
        },

        _prepareCountrySeries: function () {
            this.oCountrySeries = this.oChart.series.push(new am4maps.MapPolygonSeries());
            this.oCountrySeries.useGeodata = true;
            this.oCountrySeries.hide();
            this.oCountrySeries.geodataSource.events.on("done", this.onGeodataFetched.bind(this));
            const oCountryPolygon = this.oCountrySeries.mapPolygons.template;
            oCountryPolygon.tooltipText = "{name}";
            oCountryPolygon.nonScalingStroke = true;
            oCountryPolygon.strokeOpacity = 0.5;
            oCountryPolygon.fill = am4core.color("#eee");
            oCountryPolygon.propertyFields.fill = "color";
            const oCountryHs = oCountryPolygon.states.create("hover");
            oCountryHs.properties.fill = this.oChart.colors.getIndex(9);
            oCountryPolygon.events.on("hit", this.onRegionSelected.bind(this));
        },

        _prepareSeries: function () {
            this.oChart.projection = new am4maps.projections.Miller();
            this._prepareWorldSeries();
            this._prepareCountrySeries();
            const oData = this._prepareCountriesData();
            this.oWorldSeries.data = oData;
        },

        _isCountryConfigured: function (aId) {
            return this.oConfiguredCountries.map(c => c.name).includes(aId);
        },

        _isRegionConfigured: function (aCountryId, aRegionId) {
            const oCountry = this.oConfiguredCountries.filter(c => c.name == aCountryId);
            if (oCountry && oCountry.length > 0) {
                const oRegion = oCountry[0].regions.filter(r => r.name == aRegionId);
                return oRegion && oRegion.length > 0;
            }
            else {
                return false;
            }
        },

        _prepareChart: function () {
            this.oChart.seriesContainer.events.disableType("doublehit");
            this.oChart.chartContainer.background.events.disableType("doublehit");
            this.oChart.chartContainer.wheelable = false;
            this._prepareZoom();
        },

        onInit: async function () {
            this.onBeforeRendering();

            if (!this.oCountries) this.oCountries = await this._getCountries();
            if (!this.oContinents) this.oContinents = oContinentsConfig;
            this.oChart = am4core.create("chartdiv", am4maps.MapChart);

            this.oChart.events.once("appeared",this.onAfterRendering.bind(this));
            this._prepareChart();
            this._prepareSeries();
        },

        onBeforeRendering: function()
        {
            this._setBusy(true);
        },

        onAfterRendering: function()
        {
            this._setBusy(false);
        },

        _setBusy: function(bBusy)
        {
            const oIndicator = document.getElementById("loading-indicator");
            oIndicator.style.display = (bBusy && 'block') || 'none';
        },

        onHomeSelected: function () {
            this.oWorldSeries.show();
            this.oCountrySeries.hide();
            this.oChart.goHome();
        },

        onGeodataFetched: function () {
            this.oWorldSeries.hide();
            this.oCountrySeries.show();
        },

        onCountrySelected: function (ev) {
            const BASE_URL = "https://www.amcharts.com/lib/4/geodata/json";
            const country_id = this._getSelectedCountryId(ev);
            const isConfigured = this._isCountryConfigured(country_id);
            if (isConfigured) {
                ev.target.series.chart.zoomToMapObject(ev.target);
                const sMap = ev.target.dataItem.dataContext.map;
                if (sMap) {
                    ev.target.isHover = false;
                    this.oCountrySeries.geodataSource.url = `${BASE_URL}/${sMap}.json`;
                    this.oCountrySeries.geodataSource.events.once("ended", function () {
                        this.oCountrySeries.geodataSource.data.features = this.oCountrySeries.geodataSource.data.features.filter(f => this._isRegionConfigured(country_id, f.id));
                        
                        const bHasRegions = this.oCountrySeries.geodataSource.data.features.length > 0;
                        if(!bHasRegions)
                        {
                            this._message("No regions!");
                            this.onHomeSelected();
                        }
                    }.bind(this));
                    this.oCountrySeries.geodataSource.load();
                }
            }
        },

        onRegionSelected: function (ev) {
            const route_id = this._getSelectedCountryId(ev);
            Router.push({ path: "/pt/"+route_id });
        },

        _message: function(sMsg)
        {
            this.oChart.openPopup(sMsg);
        },

        _getSelectedCountryId: function (ev) {
            return ev.target._dataItem._dataContext.id;
        }
    };


    export default {
        layout: 'App',
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm;
                onBeforeRouteEnter();
            })
        }
    }

</script>
