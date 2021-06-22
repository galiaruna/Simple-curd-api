import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  emplList;
  config = {itemsPerPage: 5,currentPage: 1};
  cp=1;
  addText : boolean = false;
  updateText : boolean = false;
  isFormOPen : boolean = false;
employee= {
  fullName:'',
  jobTitle:'',
  department:'',
  location:'',
  age:'',
  salary:''
}  
  
 
constructor() { 
 }
newEmployee(){
  this.isFormOPen = true;
  this.addText = true;
  this.updateText = false;
   //console.log(this.employee)  
   
}
editEmployeeDetails(item,index) {
  this.addText = false;
  this.updateText = true;
  this.isFormOPen = true;
    this.employee = item;
   
}
save(){
  this.isFormOPen = false;
  let emps = JSON.parse(localStorage.getItem('emplist'));
  // let emps = JSON.parse(localStorage.getItem('emplist'));
  if(this.addText) {
    if (emps == null) {
      let initialVal: any = [this.employee];
      localStorage.setItem('emplist', JSON.stringify(initialVal));
     } else {
       emps.push(this.employee);
       localStorage.setItem('emplist', JSON.stringify(emps));
       this.getEmployeeDetails()
       this.addText=false
     }
    }else {
     
      // console.log(emps.length)
     emps.forEach(element => {
      if(element.fullName == this.employee.fullName) 
      {
       element.fullName=this.employee.fullName,
       element.jobTitle=this.employee.jobTitle,
       element.department=this.employee.department,
       element.location=this.employee.location,
       element.age = this.employee.age,
        element.salary=this.employee.salary
      }
      
     });
    //  console.log(emps.length)
      localStorage.setItem('emplist', JSON.stringify(emps));
      this.getEmployeeDetails();
      this.updateText=false
     
    }
  }
  ngOnInit() {
    this.getEmployeeDetails();
    
  }
  cancel () {
    this.isFormOPen = false;
    this.addText = false;
    this.updateText = false;
  }
  getEmployeeDetails() {
     this.emplList = [];
     this.emplList =  JSON.parse(localStorage.getItem('emplist'));
   
  }
  delEmployee(index)  {
    let emps = JSON.parse(localStorage.getItem('emplist'));
    emps.splice(index, 1);
    localStorage.setItem('emplist', JSON.stringify(emps));
    this.getEmployeeDetails();
  }
  pageChange(event) {
    this.config.currentPage = event;
  }
}
