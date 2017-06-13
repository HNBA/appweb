import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../../book.service';
import { Book } from '../../book';
import {SineWaveDataService} from '../../sinewave-data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PushNotificationsService } from 'angular2-notifications'; //import the service
@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    providers:[SineWaveDataService]
})
export class GridComponent implements OnInit {
   observableBooks: Observable<Book[]>
   books: Book[];
   errorMessage: String;
   audio_success = new Audio("assets/success.mp3");
   audio_error = new Audio("assets/error.mp3");
   constructor(private dataService: SineWaveDataService,private bookService: BookService
       ,public toastr: ToastsManager, vcr: ViewContainerRef,private _pushNotifications: PushNotificationsService) {
       //this.chartData = this.dataService.observableSineWave();
        this.toastr.setRootViewContainerRef(vcr);
    }
   ngOnInit() {
       if(this.bookService.getBooksWithObservable()){
    this.observableBooks = this.bookService.getBooksWithObservable();
	this.observableBooks.subscribe(
            books => this.books = books,
            error =>  this.errorMessage = <any>error).add(this.notify()).add(this.showSuccess());}
       else{
           console.log("verifier votre connexion internet");
           this.showError();
           //this.audio_error.play();
       }
   }
    showSuccess() {
        this.toastr.success('You are awesome!', 'Success!');
      }
    
      showError() {
        this.toastr.error('This is not good!', 'Oops!',setTimeout("stay",null,10000));
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
     playsound(){
         this.audio_success.play();
     }
     notify(){ //our function to be called on click
    let options = { //set options
      body: "info",
      icon: "assets/images/ironman.png",//adding an icon
      tag: "new notification", 
      renotify: true,
      silent: false,
      sound: "assets/success.mp3"
    }
    let notify = this._pushNotifications.create('Load Log', options).subscribe( //creates a notification
        res => this.playsound(),
        err => console.log(err)
    );
  }
}
