import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AlertMessage } from '../../shared/services/alert.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
    selector: 'app-bs-component',
    templateUrl: './bs-component.component.html',
    styleUrls: ['./bs-component.component.scss'],
    providers:[AlertService]
})
export class BsComponentComponent {
     objAlert: AlertMessage;
     ViewContainerRef:any;
    constructor(
        private alertService: AlertService,public toastr: ToastsManager, vcr: ViewContainerRef) {
             this.toastr.setRootViewContainerRef(vcr);
    }

showSuccess() {
        this.toastr.success('You are awesome!', 'Success!');
      }
    
      showError() {
        this.toastr.error('This is not good!', 'Oops!');
      }
    
      showWarning() {
        this.toastr.warning('You are being warned.', 'Alert!');
      }
    
      showInfo() {
        this.toastr.info('Just some information for you.');
      }
      
      showCustom() {
        this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
      }
    ngOnInit() {
        this.alertService.alertStatus.subscribe((val: AlertMessage) => {
            this.objAlert = { show: val.show, message: val.message };
        });
    }

    onCloseAlert(reason: string) {
        let objCloseAlert: AlertMessage = { show: false, message: '' };
        this.alertService.showAlert(false, null);
    }
 }
