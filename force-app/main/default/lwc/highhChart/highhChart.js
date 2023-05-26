import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import akHighChart from '@salesforce/resourceUrl/akHighChart';




export default class HighhChart extends LightningElement {

    
    connectedCallback() {
        console.log('In connectedCallback');
        Promise.allSettled([
            
           
            loadScript(this, akHighChart + '/akHighChart/highmaps.js')
        ]).then(() => {
            console.log('loaded');
            this.renderMap();
        }).catch(error => {
            console.error(error);
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
                console.log('mapData ', mapData);
                let charts = this.template.querySelector('div');
                charts.innerHTML = 'Rendering map...';
                if (mapData) {
                    console.log('mapData Rendering charts');
                   charts.innerHTML = 'Rendering charts...';
                   
                        Highcharts.mapChart(this.template.querySelector('div'), {
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
            }).catch((error) => {
                console.log(error);
            });
    }

}