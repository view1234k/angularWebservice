import { Component, OnInit } from '@angular/core';

import { RoomService } from '../Services/room.service'
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Observable<any[]>;
  selectedRoom: Observable<any>;
  roommsg: Observable<any[]>;

  constructor(private RoomService: RoomService) {
  }

  ngOnInit(): void {
    this.getRoomlist();
  }

  onSelect(room: Observable<any>): void {
    this.selectedRoom = room;
    this.RoomService.setRoom(room['roomTitle']);
    this.roommsg = this.RoomService.getMsgs();
  }

  getRoomlist(): void{
    this.rooms = this.RoomService.getRoomlist();
  }
}
