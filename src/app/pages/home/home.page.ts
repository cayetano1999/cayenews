import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLocalService } from '../../core/services/data-local/data-local.service';
import { ToastControllerService } from 'src/app/core/services/ionic-components/toast-controller.service';
import { UserCN } from '../../core/models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private storage: DataLocalService, private toast: ToastControllerService) { }

  isNew: boolean = false;
  user: UserCN;

  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })


  async ngOnInit() {
    await this.storage.create();

    this.user = await this.storage.getItem('user');
    if(this.user){
      this.router.navigate(['./tabs/tab1']);
    }
  }

  async goToTbas() {

    if (this.userForm.valid) {
      console.log(this.userForm.value);
      await this.storage.addItem('user', this.userForm.value).then(r=> {
        this.router.navigate(['./tabs/tab1']);
      });
    }
    else{
      this.toast.showToastError('Invalid Form, please fill all fields');
    }

  }


  public getClasses(control: FormControl | AbstractControl) {
    if (control.touched && control.errors) {
      return 'is-invalid';
    }
    else if (control.touched && !control.errors) {
      return 'is-valid';
    }
    else {
      return '';
    }
  }

  get f() {
    return this.userForm.controls;
  }

}
