import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = JSON.parse(window.localStorage.getItem('user_info') || '{}')

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
  }

  signout (e) {
    // 去除默认请求事件
    e.preventDefault()
    this.http.delete('http://localhost:3000/session')
      .toPromise()
      .then(data => {
        window.localStorage.removeItem('auth_token')
        this.router.navigate(['/signin'])
      })
      .catch(err => {
        window.alert('退出失败，请稍后重试')
      })
  }
}

