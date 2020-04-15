import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private _db: AngularFireDatabase) {
    this.rooms = this._db.list('Room').valueChanges();

  }

  rooms: Observable<any[]>;
  msgs: Observable<any[]>;
  roommsg: Observable<any[]>;
  roomTitle: string;

  getRoomlist(): Observable<any[]> {
    return this.rooms;
  }

  setRoom(roomTitle: string): void {
    this.roomTitle = roomTitle;
    this.roommsg = this._db.list('Message/' + roomTitle).valueChanges();
  }

  getMsgs(): Observable<any[]> {
    return this.roommsg;
  }

  sendMsg(MSG: string, Name: string): void {
    this._db.database.ref('/Message/' + this.roomTitle).push({
      Duration: 0,
      FileName: "",
      MSG: MSG,
      Name: Name,
      Time: firebase.database.ServerValue.TIMESTAMP
    });

    this._db.database.ref('/Room/').child(this.roomTitle).update({
      lastMessage: MSG.replace('\n','')
    });
  }



}
