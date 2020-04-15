import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from '../Services/room.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
})
export class ChatboxComponent implements OnInit {

  @Input() msgs: Observable<any[]>;
  @Input() selectedRoom: string;

  constructor(private RoomService: RoomService) {
  }

  ngOnInit(): void {
  }


  sendMsg(msg: string,name: string): void{
    this.RoomService.sendMsg(msg,name);
  }

}
