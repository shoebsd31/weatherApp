import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { User } from 'src/app/interfaces/user';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;
  modal: NgbModalRef;
  user:User;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group(
      {
        userName: [
          "",
          [
            Validators.pattern("[a-zA-Z]+$"),
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(25)
          ]
        ],
        lastname: [
          "",
          [
            Validators.pattern("[a-zA-Z]+$"),
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(25)
          ]
        ],
        address: [
          "",
          [
            Validators.pattern("[a-zA-Z0-9]+$"),
            Validators.required,
          ]
        ],
        phone: [
          "",
          [
            Validators.pattern("[0-9]+$"),
            Validators.required,
            Validators.minLength(10)
          ]
        ]
      }
    );
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.signUpForm.controls;
  }
  openModal = () => this.router.navigate(["/home"]);
  closeModal = () => this.modal.close();

  onSubmit() {
    console.log("form values",this.signUpForm.value);
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return (this.submitted = true);
    } else {
      this.user=<User>{
          firstname:this.signUpForm.value.userName,
          lastname:this.signUpForm.value.lastname,
          address:this.signUpForm.value.address,
          phone:this.signUpForm.value.phone,
      }
      this.submitted = false;
    }
  }
}
