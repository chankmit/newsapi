import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contact:any;
  constructor(public navCtrl: NavController, public loadingCtrl:LoadingController, public http:Http) {
    this.loadcontact();
  }

  loadcontact(){
    //แสดงผลเครื่องหมายโหลด
    let loading = this.loadingCtrl.create({
      content: 'กำลังร้องขอข้อมูลใหม่'
    });
    loading.present();

    //ไปรับข้อมูลจากเอพีไอ
    this.http.get('http://localhost:8080/contact').map(res => res.json()).subscribe(data => {
        this.contact = data; 
        console.log(this.contact);
    });

    //ปิดเครื่องหมายโหลด
    setTimeout(() => {
      loading.dismiss();
    }, 3000);

  }
}
