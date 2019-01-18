# Angular通讯录

用户通讯录管理系统

## 技术

组件：Angular

接口：node

## 准备

1. 本地初始化一个项目

```shell
ng new "angular-mailList"
```

在命令行自动通过`npm`安装包的时候，记得`ctrl + c`打断安装，自己通过`yarn`手动安装，防止使用`npm`被墙

2. 尽量手动安装依赖包

```shell
yarn install
```

3. 启动服务检查是否有问题

```shell
ng serve
```

4. 新建必须的组件

```shell
// 根目录下分别执行以下十条命令，创建该项目的十个组件
ng g component navbar
ng g component sidebar
ng g component signin
ng g component signup
ng g component contact-list
ng g component contact-new
ng g component conatct-edit
ng g component tag-list
ng g component tag-new
ng g component tag-edit
```

5. 导入模板

**[Angular通讯录项目模板查看请点击这里](git@github.com:ForeManWang/angular-contacts-template.git)**

这里用的是`angular-contacts-template`这个模板，这个是`github`上的开源项目，下载下来用就可以

十个组件一样的套路：找到组件内的`html`，复制粘贴到对应的组件`html`文件中，导入样式，在`app.component.html`中引用对应标签即可

这里以`signin`为例

- 首先找到`angular-contacts-template/signin.html`中的代码片段

```html
<div class="container">
    <form class="form-signin" action="index.html">
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password">
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
    <p class="info"><a href="signup.html">Don't have an account? Create one here.</a></p>
  </div>
```

- 然后从该`signin.html`文件中找到以来的`css`拷贝进去
- 去`app.component.html`中引用标签即可

6. 对于公共组件`sidebar`和`navbar`可以抽离，同时将对应样式添加到全局样式`styles.css`
7. 利用各种组件去拼一个主页出来

```html
<div class="tag-container">
  <app-navbar></app-navbar>
  <div class="container-fluid">
    <div class="row">
      <app-sidebar></app-sidebar>
      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <app-contact-list></app-contact-list>
      </div>
    </div>
  </div>
</div>
```

8. 测试：去`localhost:4200`去访问看看，首页正常，测试成功

## 导入路由

导入路由，完成页面之间导航链接的跳转

###路由模块初始化

1. 添加 `AppRoutingModule`

```shell
ng generate module app-routing --flat --module=app
```

这里提出错了，错误代码是`ERROR! src/app/app-routing.module.ts already exists.`然后我去看，果然我已经有了这个文件，肯定是在在项目初始化的时候就自动加了这个文件？然后我去重新做一个新的项目初始化看了下，果然是有的，但是我又去看看`app.module.ts`，这个里面并没有被更新，就觉得不对，然后删了这个`app-routing.module.ts`，重新运行了上面添加 `AppRoutingModule`的指令，就和官网文档上说明的一样没有问题了，成功显示如下：

- 控制台显示如下

![导入路由指令](/assets/导入路由指令.png)

- 再去看看被创建的一个文件`app.routing.moudle.ts`和被更新的一个文件`app.module.ts`

`app.routing.moudle.ts`

![路由模块](/assets/路由模块.png)

`app.module.ts`，可以看到下图文件被更新，自动的导入了我们所创建的组件

![分发路由](/assets/分发路由.png)

### 配置路由表

1. **导入模块：**在`app-routing-moudle.ts`中导入内置模块

```javascript
// 1.1 导入内置模块
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
```

2. 在`app-routing-moudle.ts`中导入组件

```javascript
// 1.2 导入组件
import {ContactListComponent} from './contact-list/contact-list.component'
import {ContactNewComponent} from './contact-new/contact-new.component'
import {ContactEditComponent} from './contact-edit/contact-edit.component'

import {TagListComponent} from './tag-list/tag-list.component'
import {TagNewComponent} from './tag-new/tag-new.component'
import {TagEditComponent} from './tag-edit/tag-edit.component'

import {SigninComponent} from './signin/signin.component'
import {SignupComponent} from './signup/signup.component'
```

3. **配置路由表**(下面拿两个组件举例)

```javascript
// 1.3 配置路由表
const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
]
```

4. **添加路由出口：**去`app.component.html`内容更改为 `<router-outlet></router-outlet>`

   ![添加路由出口](/assets/添加路由出口.png)

5. **测试访问：**这样去访问`http://localhost:4200/signup`和`http://localhost:4200/signin`就可以正常访问了

###嵌套路由

**配置路由出口及路由导航链接**

1. **创建布局组件：**创建一个`layout`组件，作为项目布局组件

```shell
ng g component layout
```

2. **layout路由表：**把原来`app.component.html`中的代码复制粘贴到`layout.component.html`中，并在`app-routing.module.ts`配置路由表
3. **类似根组件的路由出口配置：**在步骤2中配置的`layout`组件实际上不应该被访问，而应该是直接跳转到`contact-list`组件，当请求根路径的时候，用`redirectTo `来跳转

```javascript
// 1.1 导入内置模块
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LayoutComponent} from './layout/layout.component'

// 1.2 导入组件
import {ContactListComponent} from './contact-list/contact-list.component'
import {ContactNewComponent} from './contact-new/contact-new.component'
import {ContactEditComponent} from './contact-edit/contact-edit.component'

import {TagListComponent} from './tag-list/tag-list.component'
import {TagNewComponent} from './tag-new/tag-new.component'
import {TagEditComponent} from './tag-edit/tag-edit.component'

import {SigninComponent} from './signin/signin.component'
import {SignupComponent} from './signup/signup.component'

// 1.3 配置路由表
const routes: Routes = [
  {
    path: '',
    redirectTo: '/contacts', // 当请求根路径的时候，跳转到 contacts 联系人组件
    pathMatch: 'full' // 必须完全匹配到路径的时候才做重定向
  },
  {
    // 当我们访问 contacts 的时候，会先把 LayoutComponent 组件渲染出来
    // 然后把 children 中 path 为空的路由渲染到 LayoutComponent 组件中的路由出口
    path: 'contacts',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ContactListComponent
      },
      {
        path: 'new', // 这里的 new 的请求路径是  /contacts/new
        component: ContactNewComponent
      },
      {
        path: 'edit/:id', // 动态路径
        component: ContactEditComponent
      }
    ]
  },
  {
    // 当我们访问 contacts 的时候，会先把 LayoutComponent 组件渲染出来
    // 然后把 children 中 path 为空的路由渲染到 LayoutComponent 组件中的路由出口
    path: 'tags',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: TagListComponent
      },
      {
        path: 'new', // 这里的 new 的请求路径是  /contacts/new
        component: TagNewComponent
      },
      {
        path: 'edit',
        component: TagEditComponent
      }
    ]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  // providers: [AuthGuard]
})
export class AppRoutingModule {}
```

4. 测试：去点击每个链接，看看是否正常访问，正常访问，测试成功

## 用户注册

主要涉及`angular`中的表单验证

### 双向数据绑定

1. 注意：双向数据的绑定需要单独在`app.module.ts`中单独导入和声明该模块，然后再引用，否则报错，而且引用的时候要给表单添加`name`属性，否则报警告

```javascript
// 导入表单控件组件
import { FormsModule } from '@angular/forms'
@NgModule({
    ...
    imports: [
    BrowserModule,
    AppRoutingModule,
    // 声明表单组件
    FormsModule
  ],
    ...
})
```

2. 在`signup.component.ts`中定义一个存储表单数据的对象，方便在页面中操作

```javascript
export class SignupComponent implements OnInit {
  signupForm = {
    // 表单数据
    email: '',
    password: ''
  }
  ...
}
```

3. 在`signup.component.html`中利用`[(ngModel)]`进行双向数据绑定

```html
<input type="email" id="inputEmail" name="email" class="form-control" placeholder="Email address" required autofocus [(ngModel)]="signupForm.email">
...
<input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required [(ngModel)]="signupForm.password">
```

4. 测试：页面中添加如下两句代码进行到浏览器中进行输入一些数据测试，发现输入数据的时候，p中的数据也在页面中同步渲染，测试成功

```html
<p>{{ signupForm.email }}</p>
<p>{{ signupForm.password }}</p>
```

### 表单提交

1. 表单提交方法

```javascript
export class SignupComponent implements OnInit {
  ...
  signup() {
    console.log('表单提交了')
  }
}
```

2. 绑定submit到表单

```html
<form  (submit)="signup()" class="form-signin">
</form>
```

3. 测试绑定成功
4. 简单验证

```html
<form  (submit)="signup()" class="form-signin">
    <h2 class="form-signin-heading">Please sign up</h2>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" name="email" class="form-control" placeholder="Email address" required
      autofocus [(ngModel)]="signupForm.email" #email="ngModel">
    <!-- email 是有效的或者是干净的，这个div即错误提示消息被隐藏 -->
    <div [hidden]="email.valid || email.pristine" class="alert-danger">email is required</div>
      <!-- Angular 表单双向绑定会为绑定的元素绑定特殊的类名，这里输出看一下 -->
      <!-- 可以根据这个规则添加想要添加的类名，具体看官方文档中的提供 -->
      <!-- <p>{{ email.className }}</p> -->
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required
      [(ngModel)]="signupForm.password">
      <!-- password 是有效的或者是干净的，这个div即错误提示消息被隐藏 -->
    <div [hidden]="password.valid || password.pristine" class="alert-danger">password is required</div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
  </form>
```

```css
// 这个表单使用 .ng-valid 和 .ng-invalid 来设置每个表单控件的边框颜色
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}
```

5. 表单验证
   1. email验证

```html
<!-- 当 email 是无效的并且不是干净的 -->
    <div *ngIf="email.invalid && (email.dirty || email.touched)" class="alert alert-danger">
      <div *ngIf="email.errors.required">
        email is required.
      </div>
      <div *ngIf="email.errors.minlength">
        email must be at least 6 characters long.
      </div>
      <div *ngIf="email.errors.maxlength">
          email must be lower 18 characters long.
      </div>
    </div>
```

	2. password验证

```html
<div *ngIf="password.invalid && (password.dirty || password.touched)" class="alert alert-danger">
          <div *ngIf="password.errors.required">
            password is required.
          </div>
          <div *ngIf="password.errors.minlength">
            password must be at least 6 characters long.
          </div>
          <div *ngIf="password.errors.maxlength">
            password must be lower 18 characters long.
          </div>
      </div>
```

6. 模板驱动表单

**使用 *ngSubmit* 提交该表单[*link*](https://www.angular.cn/guide/forms#submit-the-form-with-ngsubmit)**

```html
<!-- [disabled]="!form.form.valid" 当验证不成功时候，不允许点击，整个语法参考官网 form 章节 -->
<button [disabled]="!form.form.valid" class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
```

### 接口文档

**[Angular通讯录项目接口查看请点击这里](/angular-contacts-api/)**

下载接口文档并启动接口服务

```shell
node app.js
```

###路由

1. **导入`HttpClient`模块**

```javascript
import { HttpClient } from '@angular/common/http'
```

2. **在构造器中声明**

```javascript
  // 在组件类中声明了一个私有成员 http 它的类型是 HttpClient
  // 那么 Angular 会自动去实例化 HttpClient 得到一个实例
  // 然后我们就可以在组件中使用 http 这个成员来调用一些请求方法了
  // 例如 http.get http.post...
  constructor(
    private http: HttpClient,
    ...
  ) { }
```

3. **表单验证**方法

```javascript
signup() {
    // 1. 表单验证
    // 2. 获取表单数据
    // 3. 发起 http 请求和服务端交互
    // 4. 根据响应结果做交互处理
    const formData = this.signupForm
    this.http.post('http://localhost:3000/users', formData)
      .toPromise()
      .then((data) => {
        this.email_err_msg = ''
        // 路由跳转首页
        this.router.navigate(['/'])
      })
      .catch(err => {
        if (err.status === 409) {
          this.email_err_msg = '邮箱已被占用'
        }
      })
  }
```

4. `email_err_msg = '' `声明，不然3中的`email_err_msg`肯定显示未定义

5. 去页面调用，之前调用过了，就不需要写了

6. **注册成功跳转至主页**

   1. 利用路由跳转，所以先导入路由模块`import { Router } from '@angular/router' `
   2. 在构造器中声明一下`private router: Router `
   3. 在`signup`方法请求成功的时候跳转

   ```javascript
     signup() {
       
       const formData = this.signupForm
       this.http.post('http://localhost:3000/users', formData)
         .toPromise()
         .then((data: any) => {
           ...
           // 路由跳转首页
           this.router.navigate(['/'])
         })
         ...
     }
   ```

7. **路由守卫拦截保护**

   1. 即在本地将身份标识保存到`localStroge`
   2. 在`signup`中`post`请求成功，保存身份标识到本地

   ```javascript
     signup() {
      ...
       this.http.post('http://localhost:3000/users', formData)
         .toPromise()
         // 声明 data 为 any 类型，防止data.token时类型错误
         .then((data: any) => {
           ...
           window.localStorage.setItem('auth_token', data.token)
           window.localStorage.setItem('user_info', JSON.stringify(data.user))
           ...
         })
        ...
     }
   ```

   3. 去首页`contact-list`获取`localStroge`中的数据，判断如果有身份标识可以直接登录，没有身份标识就跳转到`signin`

   ```javascript
   ...
   import { Router } from '@angular/router'
   
   ...
   export class ContactListComponent implements OnInit {
   
     constructor(
       private router: Router
     ) { }
   
     ngOnInit() {
       const token = window.localStorage.getItem('auth_token')
       if (!token) {
         this.router.navigate['/signin']
       }
     }
   }
   ```

8. **路由导航钩子**

   1. 步骤 7 中实现的路由守卫拦截保护只适用于`contact-list`一个页面，而一个项目2中肯定不止这一个页面需要获取用户登录权限，这就涉及到很多页面需要获取到用户登录权限，这就用到了路由导航钩子
   2. 在`Angular.io`的官方文档中有一个`FUNDAMENTALS/Routing & Navigation`

   ![路由守卫](/assets/路由守卫.png)

   3. 根据官方文档说明，在`app`文件夹下创建一个路由守卫文件`auth-guard.service.ts`
   4. 将下面的代码拷贝进去

   ```javascript
   import { Injectable }     from '@angular/core';
   import { CanActivate, Router }    from '@angular/router';
   
   @Injectable()
   // 路由守卫核心功能	
   export class AuthGuard implements CanActivate {
     constructor (
       private router: Router
     ) {}
     canActivate() {
       const token = window.localStorage.getItem('auth_token')
       if (!token) {
         this.router.navigate(['/signin'])
         return false // 不能继续导航
       }
   
       // 如果验证通过，则放行，继续完成导航
       return true;
     }
   }
   
   ```

   5. 找到`app-routing.module.ts`，首先导入路由守卫，然后在路由表中需要获取登录权限的组件中声明一下该路由守卫，并声明`providers`

   ```javascript
   ...
   
   // 导入权限守卫
   import {AuthGuard} from './auth-guard.service'
   
   import {LayoutComponent} from './layout/layout.component'
   
   // 1.2 导入组件
   ...
   
   // 1.3 配置路由表
   const routes: Routes = [
     ...
       ...
       canActivate: [AuthGuard], // 在导航 contacts 之前会先进入路由守卫
       children: [
         ...
     },
     {
       ...
       // 声明 canActivate  权限守卫
       canActivate: [AuthGuard], // 在导航之前，先进入路由守卫
       children: [
         ...
     },
     ..
   ]
   
   @NgModule({
     imports: [
       RouterModule.forRoot(routes)
     ],
     exports: [ RouterModule ],
     providers: [AuthGuard]
   })
   export class AppRoutingModule {}
   ```

## 用户登录

用户登录模块和用户注册模块套路基本一样

## 后台管理

###Angular HTTP拦截

1. 官网`HTTP`模块，查找下`Observable `，跟着文档做
2.  去`app`下创建一个新文件`global.interceptor.ts`， 复制下面代码进去

```javascript
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem('auth_token')
    const authReq = req.clone({headers: req.headers.set('X-Access-Token', token)});
    return next.handle(authReq);
  }
}

```

3. 去`app.module.ts`配置下

   1. 导入

   ```javascript
   import {HttpClientModule} from '@angular/common/http';
   import {HTTP_INTERCEPTORS} from '@angular/common/http';
   
   import {GlobalInterceptor} from './global.interceptor';
   ```

   2. 声明

   ```javascript
   imports: [
       ...
       HttpClientModule
     ],
     providers: [{
       provide: HTTP_INTERCEPTORS,
       useClass: GlobalInterceptor,
       multi: true
     }],
     bootstrap: [AppComponent]
   })
   ```

### 列表渲染

同样的套路，获取数据，去页面遍历

`ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts: any

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getContacts()
  }

  getContacts() {
    this.http.get('http://localhost:3000/contacts')
      .toPromise()
      .then(data => {
        this.contacts = data
        console.log(this.contacts)
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteContactById(id, e) {
    e.preventDefault()
    if (!window.confirm('确定删除吗？')) {
      return
    }
    this.http.delete(`http://localhost:3000/contacts/${id}`)
      .toPromise()
      .then(data => {
        this.getContacts()
      })
      .catch(err => {
        console.log(err)
      })
  }
}

```

`html`

```html
<tr *ngFor="let item of contacts;">
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>
          <span class="label label-info">朋友</span>
        </td>
        <td>
          <a>编辑</a>
          <a href="#">删除</a>
        </td>
      </tr>
```

### 增删改查

**声明数据** ==> **双向绑定** ==> **处理表单 `name` 等属性** ==> **`写方法 `**  ==>**``绑定方法`**

#### 添加联系人

1. 表单验证
2. 导入`http、router` 
3. constrouctor 中声明
4. 写添加方法`addContact`
   1. 导入必须的模块
   2. 声明数据
   3. post请求数据
5. 绑定方法调用

```javascript
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

```

#### 删除联系人

1. 点击删除按钮，调用`deleteContactById (item.id，$event)`把`id`传进来并要阻止点击默认事件

```html
<a (click)="deleteContactById(item.id, $event)" href="#">删除</a>
```

2. 拿到id之后，根据项目接口文档，发起请求，删除该项
3. 删除成功后，重新渲染一下数据，将获取数据列表封装为一个方法`getContacts`

```javascript
  ngOnInit() {
    this.getContacts()
  }

  getContacts() {
    this.http.get('http://localhost:3000/contacts')
      .toPromise()
      .then(data => {
        this.contacts = data
        console.log(this.contacts)
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteContactById(id, e) {
    // 阻止默认事件
    e.preventDefault()
    if (!window.confirm('确定删除吗？')) {
      return
    }
    this.http.delete(`http://localhost:3000/contacts/${id}`)
      .toPromise()
      .then(data => {
        this.getContacts()
      })
      .catch(err => {
        console.log(err)
      })
  }
```

#### 编辑联系人

当我们点击编辑按钮的时候，跳转到对应的当前编辑联系人的组件，通过id进行url传参

1. 处理表单，双向数据绑定
2. 找到路由，设置`path`为动态路径即`path: edit/:id`
3. 找到编辑联系人组件，设置动态路径

```html
<a [routerLink]="['/contacts/edit', item.id]">编辑</a>
```

4. 在组件中获取动态路由参数
   1. 导入`ActivatedRoute `模块

```javascript
import { Router, ActivatedRoute } from '@angular/router'
```

​	  2. 声明

```javascript
constructor(
    private router: Router,
    private route: ActivatedRoute,
    ...
  ) { }
```

3. 获取参数

```javascript
ngOnInit() {
    const contactId = this.route.snapshot.params.id
    ...稍后调用方法
  }
```

4. 发送post请求，拿到当前项id，这里需要用到`HttpClient`所以先导入

```javascript
import { HttpClient } from '@angular/common/http'
```

5. 获取`id`方法，并调用渲染出当前编辑项

```javascript
  ngOnInit() {
    ...
    this.getContactById(contactId)
  }
getContactById (id) {
    this.http.get(`http://localhost:3000/contacts/${id}`)
      .toPromise()
      .then((data: any) => {
        this.formData = data
      })
      .catch(err => {
        console.log(err)
      })
  }
```

4. 编辑联系人并保存
   1. 写一个方法`editContact `
   2. 去页面绑定方法

```javascript
  editContact () {
    const id = this.formData.id
    this.http.patch(`http://localhost:3000/contacts/${id}`, this.formData)
      .toPromise()
      .then(data => {
        this.router.navigate(['/contacts'])
      })
      .catch(err => {
        console.log(err)
      })
  }
```



```html
<form (submit)="editContact()">
  ...
</form>
```

## 总结

**错误了看日志，并尽量参考官网文档为准**

详情看：Angular官网

1. 表单验证章节
2. 路由章节
3. Http章节

