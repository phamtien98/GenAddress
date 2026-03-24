import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { province } from './provine';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [FormsModule ,CommonModule
],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  http = inject(HttpClient);

  selectedCity: string = ''; // Biến lưu giá trị được chọn
  selectedDist : string= '';
  selectedWard : string ='';
  cities = [
    { id: 26, name: 'Phú Thọ' },
    { id: 35, name: 'Hà Nam' },
    { id: 34, name: 'Thái Bình' },

  ];


  randomDistrict: any;
  randomWard: any;
  provinceData: any;
  displayData: any;

  provinceCode = "";
  distrCode: string = "";
  wardCode: string = "";
       pro : province = {
      provinceCode: "",
       districtCode: "",
       wardCode: ""

    }

  ngOnInit(): void {



  }

  getData() :void { 

    // get province
    this.getProvince();

    // get district
    const urldist = `https://www.tinhthanhpho.com/api/v1/provinces/${this.selectedCity}/districts`;
    this.http.get(urldist).subscribe((response) => {
      this.randomDistrict = response;
      this.randomDistrict = this.randomDistrict.data[Math.floor(Math.random() * this.randomDistrict.data.length)];
      this.selectedDist = this.randomDistrict.code;

      // get ward
      const urlward = `https://www.tinhthanhpho.com/api/v1/districts/${this.randomDistrict.code}/wards`;
    this.http.get(urlward).subscribe((response) => {
      this.randomWard = response;
      this.randomWard = this.randomWard.data[Math.floor(Math.random() * this.randomWard.data.length)];
      this.selectedWard =this.randomWard.code;

      //convert
      const header = new HttpHeaders({
      'Authorization': 'Bearer hvn_heLHhyKDkGEwhxcZhiZs5oPhCeDIHBn8',
      'Content-Type': 'application/json'
    });
    const pro : province = {
      // provinceCode: this.provinceData.data.code,
      // districtCode: this.randomDistrict.code,
      // wardCode: this.randomWard.code
      provinceCode : this.selectedCity,
      districtCode: this.selectedDist,
      wardCode: this.selectedWard
    }
    const url = "https://www.tinhthanhpho.com/api/v1/convert/address ";
    this.http.post(url,pro, { headers: header }).subscribe((response) => {
      this.displayData = response;
      this.displayData = this.displayData.data;
      console.log(this.displayData);
      

      //display 
    const dataContainer = document.getElementById('dataContainer');

    if (dataContainer) {
      dataContainer.innerHTML = `<p> ${this.displayData.new.fullAddress}, Việt Nam.</p>`

      ;
    }
    });
    });  
    });



   // this.getRandomDistrict(this.provinceData.data.code);
    // const url = `https://www.tinhthanhpho.com/api/v1/provinces/${this.selectedCity}`;
    // this.http.get(url).subscribe((response) => {
    //   this.provinceData = response
    //   console.log(this.provinceData.data.code)      
    // });
   


  } 

  getProvince() {
    const url = `https://www.tinhthanhpho.com/api/v1/provinces/${this.selectedCity}`;
    this.http.get(url).subscribe((response) => {
      this.provinceData = response   
    });
  }
}
