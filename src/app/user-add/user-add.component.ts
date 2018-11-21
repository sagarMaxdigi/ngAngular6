import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  get f() { return this.registerForm.controls; }
  posts: any;
  firstParameter = ''; secondParameter = ''; thirdParameter = ''; forthParameter = ''; file: File = null;
  constructor(private formBuilder: FormBuilder, private UserService: UserService, private http: HttpClient) { }
  saveData(firstParameter, secondParameter, thirdParameter, forthParameter): void {
    this.posts = this.UserService.saveUserData(firstParameter, secondParameter, thirdParameter, forthParameter).subscribe((res) => {
      this.posts = res;
      if (this.posts.msg == 'OK') {
        alert("Data Inserted Successfully");
        this.registerForm.reset();
      }
    });
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onFileChange(event) {
    this.file = <File>event.target.files[0];
    console.log(this.file);
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.firstParameter = this.registerForm.value.firstName;
    this.secondParameter = this.registerForm.value.lastName;
    this.thirdParameter = this.registerForm.value.email;
    this.forthParameter = this.registerForm.value.password;
    this.saveData(this.firstParameter, this.secondParameter, this.thirdParameter, this.forthParameter);
    this.http.post('http://192.168.0.8:8080/webServiceAngular/index.php', this.file).subscribe(res => {
      console.log(res);
    });
  }
}