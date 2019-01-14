import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {GlobalInterceptor} from './global.interceptor';

// 开启 HTTP 功能
// open the root AppModule,
// import the HttpClientModule symbol from @angular/common/http,
// add it to the @NgModule.imports array.

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagNewComponent } from './tag-new/tag-new.component';
import { TagEditComponent } from './tag-edit/tag-edit.component';
import { AppRoutingModule } from './/app-routing.module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SigninComponent,
    SignupComponent,
    ContactListComponent,
    ContactNewComponent,
    ContactEditComponent,
    TagListComponent,
    TagNewComponent,
    TagEditComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GlobalInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
