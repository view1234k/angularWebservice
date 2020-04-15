import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { RoomService } from '../Services/room.service'
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  template: `
  <label for="file">File:</label>
  <input type="file" (change)="upload($event)" accept=".png,.jpg" />
  <br><img src='{{ downloadURL|async }}' />
 `
 
})
export class UploadComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage, private RoomService: RoomService) { }

  upload(event) {
    const randomId = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = 'images/'+randomId.toString();
    console.log(filePath);
    const fileRef = this.storage.ref(filePath); // Add this line to get the path as a ref
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(()=>{
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(ursl=>{
          this.RoomService.sendMsg(ursl,'test');
        });
        
      })
    ).subscribe();
  }



  ngOnInit(): void {
  }

}
