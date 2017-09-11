import { Component, OnInit, ViewContainerRef,ViewChild,ElementRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AlertMessage } from '../../shared/services/alert.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2Highcharts } from 'ng2-highcharts';
declare var Highcharts:any;
import {SineWaveDataService} from '../../sinewave-data.service';
declare var CanvasJS: any;
var dps = []; // dataPoints
var xVal = 0;
var yVal = 100;	
var updateInterval = 100;
var dataLength = 0; // number of dataPoints visible at any point

@Component({
    selector: 'canvas-graph',
    template: '<div><div #chart></div></div><div id="chartContainer" style="height: 400px; width: 100%;"></div>',
    providers: [SineWaveDataService]
})


export class BsComponentComponent {
    constructor(private dataservice : SineWaveDataService){
 }
     ngOnInit(): any {
        this.chart();
    }

chart(){
 let data = this.dataservice.observableSineWaveChart();
var chart = new CanvasJS.Chart("chartContainer", {
zoomEnabled:true,
title: {
text: "Real Time Chart"
},
//animationEnabled: true,
data: [{
                 type: "area",
               dataPoints: dps,
                     color: "red", 
             }]
});
var updateChart = function (count) {
            count = count || 1;
//            dataLength = dataLength + 1;
            for (var j = 0; j < count; j++) {  
              dataLength = dataLength + 2;
                yVal = data[j];
                dps.push({
                    x: xVal,
                    y: yVal
                });
                xVal++;
            };
            if (dps.length > dataLength)
            {
                dps.shift();                
            }
            
            chart.render();     

        };

        // generates first set of dataPoints
        updateChart(dataLength); 

        // update chart after specified time. 
        setInterval(() => { updateChart(dataLength); }, 10000);    


 }
 }
