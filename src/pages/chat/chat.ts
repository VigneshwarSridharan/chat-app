import { Component, ViewChild  } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  msg: any;
  conn: any;
  sendMsgTxt;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(localStorage.chatData)
    {
      this.msg = JSON.parse(localStorage.chatData);
      
    }
    else
    {
      this.msg = [];
    }
    
    this.conn = new WebSocket('ws://158.69.21.217:8235');
  }

  userSend() {
    this.conn.send(this.sendMsgTxt);
    this.msg.push({
      data:this.sendMsgTxt,
      aligin:'right'
    });
    this.sendMsgTxt='';
    localStorage.chatData = JSON.stringify(this.msg);
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }

  removeChat() {
    localStorage.chatData='';
    this.msg=[];
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
    console.log('ionViewDidLoad ChatPage');

    this.conn.onopen = function(e) {
        console.log("Connection established!");
    };

    this.conn.onmessage = (e) => {
      console.log(e.data);
      this.msg.push({
        data:e.data,
        aligin:'left'
      });
      localStorage.chatData = JSON.stringify(this.msg);
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 100);
        
    }
  }

}
