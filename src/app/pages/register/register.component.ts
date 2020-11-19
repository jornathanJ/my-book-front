import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { User } from 'src/app/shared/class/user';
import { MyBookService } from 'src/app/shared/service/my-book.service';
import { DataSharedService } from 'src/app/shared/service/dataShareService';
//import { CommonSharedModule } from ;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private myBookService: MyBookService,
    private dataSharedService: DataSharedService
  ) {
    // // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue()) {
    //     this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];

  model: User = new User("", "", "");

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.myBookService.saveUser(this.model)
    .subscribe(
      responseUser => {
        alert("Success to register.");
        this.dataSharedService.loginUser = responseUser;
      },
      error => {
        alert("Fail to register.");
        console.log(error);
      }
    );
    console.log(this.model);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  resetField() {
    this.model = new User("", "", "");
  }

  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: any) {
    return form && form.controls.name &&
      form.controls.name.value + ' ' + form.controls.password.value; // Dr. IQ
  }

  /////////////////////////////

}
