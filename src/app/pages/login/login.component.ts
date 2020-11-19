import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { User } from 'src/app/shared/class/user';
import { MyBookService } from 'src/app/shared/service/my-book.service';
import { DataSharedService } from 'src/app/shared/service/dataShareService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //loginForm: FormGroup;
  loading = false;
  //submitted = false;
  returnUrl: string;
  model = new User("", "", "");

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private myBookService: MyBookService,
    private dataSharedService: DataSharedService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue()) {
      //this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    
    // this.loginForm = this.formBuilder.group({
    //     username: ['', Validators.required],
    //     password: ['', Validators.required]
    // });

    // // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  //get f() { return this.loginForm.controls; }

  onSubmit() {
    this.myBookService.findUser(this.model.id)
      .subscribe(
        (responseUser: User) => {
          if (this.model.id == responseUser.id) {
            alert("login success.");
            this.dataSharedService.userChange(responseUser);
            this.router.navigate([this.returnUrl]);
          }
        },
        error => {
          alert("login fail.");
          console.log(error);
        });

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;
    // }

    /*
    this.authenticationService.login(this.model.engName, this.model.id)
    .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
            console.log(data);
            alert(data);
        },
        error => {
            //this.alertService.error(error);
            this.loading = false;
    });
    */
    //console.log(data);
    //.pipe(first())
    // .subscribe(
    //     data => {
    //         this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //         //this.alertService.error(error);
    //         this.loading = false;
    //     });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
