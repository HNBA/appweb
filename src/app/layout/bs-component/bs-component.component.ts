import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AlertMessage } from '../../shared/services/alert.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare var CanvasJS: any;
var dps = []; // dataPoints
var xVal = 0;
var yVal = 100;	
var updateInterval = 100;
var dataLength = 500; // number of dataPoints visible at any point

@Component({
    selector: 'canvas-graph',
    template: '<div id="chartContainer" style="height: 400px; width: 100%;"></div>'
})


export class BsComponentComponent {

    constructor(){
    }
     ngOnInit(): any {
        this.chart();
    }

chart(){
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
    
 }
