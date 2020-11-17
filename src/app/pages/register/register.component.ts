import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { User } from 'src/app/shared/class/user';
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
    private authenticationService: AuthenticationService
) {
    // // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue()) {
    //     this.router.navigate(['/']);
    // }
}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new User(0, "", "", "", "");

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newHero() {
    this.model = new User(0, "", "", "", "");
  }

  skyDog(): User {
    const myHero =  new User(0, "", "", "", "");
    console.log('My User is called ' + myHero.fullName); // "My hero is called SkyDog"
    return myHero;
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
