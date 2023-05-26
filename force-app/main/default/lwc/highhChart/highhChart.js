import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import Dchart from '@salesforce/resourceUrl/d3Chart';
import exp from '@salesforce/resourceUrl/highChartExport';
import solidGauge from '@salesforce/resourceUrl/solidGauge';
import highChartMore from '@salesforce/resourceUrl/highChartMore';
import highchartsURL from '@salesforce/resourceUrl/highChart';
import akHighChart from '@salesforce/resourceUrl/akHighChart';
import 	map from '@salesforce/resourceUrl/map';
import exporting from '@salesforce/resourceUrl/highChart';
import HIGHCHARTS from '@salesforce/resourceUrl/HIGHCHARTS';




export default class HighhChart extends LightningElement {

 scriptloaded = false;
    
    constructor(){
        super();
        console.log('constructor ');
        
    }

    connectedCallback() {
        console.log('In connectedCallback');
        Promise.all([
            loadScript(this, highChartMore),
            loadScript(this, akHighChart + '/akHighChart/highmaps.js')
        ]).then(() => {
            console.log('loaded');
           this.scriptloaded = true;
            this.gaugeChart();
             this.renderMap();
        }).catch(error => {
            console.error(error);
        });
    }
    renderedCallback() {
        console.log('In renderedCallback');
        if(this.scriptloaded){
           
        }
         
        // loadScript(this, highchartsURL)
        // .then(()=>{
        //     console.log('highchart ');
        //     this.gaugeChart();
        //      loadScript(this, map).
        //      then(()=>{
        //          console.log('map loded');
        //         // this.renderMap();
           
        //      })
        //       .catch(error => console.log("ERROR: map.js"))
        // })
        // .catch(error => console.log("ERROR: highchart.js"));

        
    }

//gauge
gaugeChart(){
const gauge = this.template.querySelector('.chart');
gauge.innerHTML = 'Lodaing gaugeChart....';
  Highcharts.chart(gauge, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Browser market shares in May, 2020',
                align: 'left'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Chrome',
                    y: 70.67,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Edge',
                    y: 14.77
                },  {
                    name: 'Firefox',
                    y: 4.86
                }, {
                    name: 'Safari',
                    y: 2.63
                }, {
                    name: 'Internet Explorer',
                    y: 1.53
                },  {
                    name: 'Opera',
                    y: 1.40
                }, {
                    name: 'Sogou Explorer',
                    y: 0.84
                }, {
                    name: 'QQ',
                    y: 0.51
                }, {
                    name: 'Other',
                    y: 2.6
                }]
            }]
        });

}

    // renderedCallback(){
    //     this.fetchDataAndRenderMap();
    // }


    renderMap() {
        let data = [
            {
                "code": "us-al-001",
                "name": "Autauga County, AL",
                "value": 3.9
            },
            {
                "code": "us-al-003",
                "name": "Baldwin County, AL",
                "value": 4.3
            },
            {
                "code": "us-al-005",
                "name": "Barbour County, AL",
                "value": 5.6
            },
            {
                "code": "us-al-007",
                "name": "Bibb County, AL",
                "value": 4.2
            },
            {
                "code": "us-al-009",
                "name": "Blount County, AL",
                "value": 3.8
            },
            {
                "code": "us-al-011",
                "name": "Bullock County, AL",
                "value": 5.5
            },
            {
                "code": "us-al-013",
                "name": "Butler County, AL",
                "value": 5.6
            },
            {
                "code": "us-al-015",
                "name": "Calhoun County, AL",
                "value": 4.9
            },
            {
                "code": "us-al-017",
                "name": "Chambers County, AL",
                "value": 4.2
            },
            {
                "code": "us-al-019",
                "name": "Cherokee County, AL",
                "value": 4
            },
            {
                "code": "us-pr-153",
                "name": "Yauco Municipio, PR",
                "value": 17.3
            }
        ];

        fetch('https://code.highcharts.com/mapdata/countries/us/us-all-all.topo.json')
            .then((response) => response.json())
            .then((mapData) => {
                 console.log('mapData constructor', mapData);
               // this.mapDatajs = mapData;
                if (mapData) {
                    console.log('mapData Rendering charts');
                   mapchart.innerHTML = 'Rendering charts...';
                   
                        Highcharts.mapChart(mapchart, {
                            chart: {
                                map: mapData,
                                borderWidth: 1,
                                marginRight: 20 // for the legend
                            },

                            title: {
                                text: 'US Counties unemployment rates, January 2018'
                            },

                            accessibility: {
                                description: 'Demo showing a large dataset.',
                                enabled : false
                            },

                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                floating: true,
                                backgroundColor: 'rgba(255, 255, 255, 0.85)'
                            },

                            mapNavigation: {
                                enabled: true
                            },

                            colorAxis: {
                                min: 0,
                                max: 25,
                                tickInterval: 5,
                                stops: [[0, '#F1EEF6'], [0.65, '#900037'], [1, '#500007']],
                                labels: {
                                    format: '{value}%'
                                }
                            },

                            plotOptions: {
                                mapline: {
                                    showInLegend: false,
                                    enableMouseTracking: false
                                }
                            },
                            series: [{
                                data: data,
                                joinBy: ['hc-key', 'code'],
                                name: 'Unemployment rate',
                                tooltip: {
                                    valueSuffix: '%'
                                },
                                borderWidth: 0.5,

                                shadow: false,
                                accessibility: {
                                    enabled: false
                                }
                            }, {
                                type: 'mapline',
                                name: 'State borders',
                                color: 'white',
                                shadow: false,
                                borderWidth: 2,
                                accessibility: {
                                    enabled: false
                                }
                            }]
                        });
                    
                }
            })
            .catch((error) => {
                console.log(error);
            });
       let mapchart = this.template.querySelector('.chart1');
                mapchart.innerHTML = 'Rendering map...';
       
    }

}