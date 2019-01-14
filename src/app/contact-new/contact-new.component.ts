import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {
  formData = {
    name: '',
    email: '',
    phone: ''
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addContact () {
    this.http.post('http://localhost:3000/contacts', this.formData)
      .toPromise()
      .then(data => {
        this.router.navigate(['/contacts'])
      })
      .catch(err => {
        console.log(err)
      })
  }

}
