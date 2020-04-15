import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage'
import { Observable } from 'rxjs';

import { RoomService } from '../Services/room.service'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  template: `
  <label for="file">File:</label>
  <input type="file" (change)="upload($event)" accept=".png,.jpg" />
  <br>{{ downloadURL }}
 `
 //<img src='{{ downloadURL }} />
})
export class UploadComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage, private RoomService: RoomService) { }

  upload(event) {
    const randomId = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    console.log(randomId);
    const fileRef = this.storage.ref('images/'+randomId.toString()); // Add this line to get the path as a ref
    const task = fileRef.put(file);
    this.uploadPercent = task.percentageChanges();
    this.downloadURL = fileRef.getDownloadURL();
    console.log(this.downloadURL);
  }



  ngOnInit(): void {
  }

}
