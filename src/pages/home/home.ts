import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  news:any;

  constructor(public navCtrl: NavController, public http:Http, public loadingCtrl: LoadingController) {
    this.loadnews();
  }

  loadnews(){
    //แสดงผลเครื่องหมายโหลด
    let loading = this.loadingCtrl.create({
      content: 'กำลังร้องขอข้อมูลใหม่'
    });
    loading.present();

    //ไปรับข้อมูลจากเอพีไอ
    this.http.get('https://newsapi.org/v2/top-headlines?country=th&apiKey=176ab3b50a584b7bb4c825bc236f6b32').map(res => res.json()).subscribe(data => {
        this.news = data.articles;
        console.log(this.news);
    });

    //ปิดเครื่องหมายโหลด
    setTimeout(() => {
      loading.dismiss();
    }, 3000);

  }

  goToDetail(item){
    this.navCtrl.push(DetailPage,{item:item});
  }

}
