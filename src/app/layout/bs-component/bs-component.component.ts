<<<<<<< HEAD
import { Component, OnInit, ViewContainerRef,ViewChild,ElementRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AlertMessage } from '../../shared/services/alert.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2Highcharts } from 'ng2-highcharts';
declare var Highcharts:any;
import {SineWaveDataService} from '../../sinewave-data.service';
=======
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AlertMessage } from '../../shared/services/alert.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
declare var CanvasJS: any;
var dps = []; // dataPoints
var xVal = 0;
var yVal = 100;	
var updateInterval = 100;
<<<<<<< HEAD
var dataLength = 0; // number of dataPoints visible at any point

@Component({
    selector: 'canvas-graph',
    template: '<div><div #chart></div></div><div id="chartContainer" style="height: 400px; width: 100%;"></div>',
    providers: [SineWaveDataService]
=======
var dataLength = 500; // number of dataPoints visible at any point

@Component({
    selector: 'canvas-graph',
    template: '<div id="chartContainer" style="height: 400px; width: 100%;"></div>'
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
})


export class BsComponentComponent {
<<<<<<< HEAD
    constructor(private dataservice : SineWaveDataService){
 }
=======

    constructor(){
    }
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
     ngOnInit(): any {
        this.chart();
    }

chart(){
<<<<<<< HEAD
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
=======
        var chart = new CanvasJS.Chart("chartContainer", {
            zoomEnabled:true,
            title: {
                text: "Real Time Chart"
            },
            //animationEnabled: true,
            data: [{
				      type: "line",
			      	dataPoints: dps 
		            	}]
        });
    var updateChart = function (count) {
			count = count || 1;
			// count is number of times loop runs to generate random dataPoints.
		
			for (var j = 0; j < count; j++) {	
				yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
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
		setInterval(() => { updateChart(dataLength); }, 1000); 
    }
    
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
 }
