import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { find } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoginView: boolean = true;

  userRegisterObj: any = {
    userName: '',
    password: '',
    emailId: '',
  }

  userLogin: any = {
    userName: '',
    password: ''
  }

  router = inject(Router);

  //localstorage give us data in form of string
  //and in localstorage we set the data in form of string
  //that's why we need to parse while getting and stringify while setting

  onRegister() {
    const isLocalData = localStorage.getItem("angular18Local");
    if (isLocalData != null) {
      const localArray = JSON.parse(isLocalData);
      const findIndex = localArray.findIndex((user: any) => {
        return user.userName === this.userRegisterObj.userName
      })
      if (findIndex !== -1) {
        alert('User already exists!!!');
      } else {
        localArray.push(this.userRegisterObj);
        localStorage.setItem('angular18Local', JSON.stringify(localArray));
      }

      console.log(findIndex);

    } else {
      const localArray = [];
      localArray.push(this.userRegisterObj);
      localStorage.setItem("angular18Local", JSON.stringify(localArray));
    }
  }

  onLogin() {
    const isLocalData = localStorage.getItem("angular18Local");
    if (isLocalData != null) {
      const users = JSON.parse(isLocalData);

      const isUserFound = users.find((user: any) => {
        return user.userName === this.userLogin.userName && user.password === this.userLogin.password;
      })
      if (isUserFound !== undefined) {
        this.router.navigateByUrl('dashboard');
      } else {
        alert('username or password is wrong');
      }
    } else {
      alert('No user found')
    }
  }


  onSubmit(form: NgForm) {
    console.log(form.value);
    form.reset();
  }

}
