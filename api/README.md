# 通讯录案例接口说明文档

## 开启服务

```shell
node app.js
```

## 接口说明

- 接口地址：http://localhost:3000
- 接口已开启 CORS
- 接口认证统一使用 Token 认证（基于 JSON Web Token）
- 需要授权的接口必须提供请求头字段 X-Access-Token 信息
- 使用 HTTP Status Code 标识状态
- 分页列表参数使用 _page 和 _limit
- 时间日期格式：2017-12-24 13:52:26
- 数据返回格式统一使用 JSON
- 无特殊说明，接口默认支持 application/x-www-form-urlencoded 和 application/json 两种方式

### 通用的返回状态码说明

| 状态码 |                 含义                 |                 说明                 |
|--------|--------------------------------------|--------------------------------------|
|    200 | OK                                   | 请求成功                             |
|    201 | CREATED                              | 创建成功                             |
|    204 | DELETED                              | 删除成功                             |
|    400 | BAD REQUEST                          | 请求的地址不存在或者包含不支持的参数 |
|    401 | UNAUTHORIZED                         | 未授权                               |
|    403 | FORBIDDEN                            | 被禁止访问                           |
|    404 | NOT FOUND                            | 请求的资源不存在                     |
|    422 | Unprocesable entity [POST/PUT/PATCH] | 当创建一个对象时，发生一个验证错误   |
|    500 | INTERNAL SERVER ERROR                | 服务器内部错误                       |

### 返回结果说明

- GET /collection：返回资源对象的列表（数组）
- GET /collection/resource：返回单个资源对象
- POST /collection：返回新生成的资源对象
- PUT /collection/resource：返回完整的资源对象
- PATCH /collection/resource：返回完整的资源对象
- DELETE /collection/resource：返回一个空文档

### 通用错误返回结果

发生错误时，HTTP Status Code为4xx错，如 400，403，404

错误格式：

```json
{
  error: 'username invalid'
}
```

## 用户模块

### 用户注册

- POST
- `/users`

|   参数   | 是否必须 |     说明     |
|----------|----------|--------------|
| email    | 是       | 邮箱，用户名 |
| password | 是       | 密码         |

### 用户登陆

- 请求方法：POST
- 请求路径：`/session`

|   参数   | 是否必须 |     说明     |
|----------|----------|--------------|
| email    | 是       | 邮箱，用户名 |
| password | 是       | 密码         |

### 用户退出

- 请求方法：DELETE
- 请求路径：`/session`

## 联系人分类

### 获取分类列表

- 请求方法：`GET`
- 请求路径：`/tags`

### 新增分类

- 请求方法：`POST`
- 请求路径：`/tags`

### 编辑分类

- 请求方法：`POST`
- 请求路径：`/tags/:id`

### 删除分类

- 请求方法：`DELETE`
- 请求路径：`/tags/:id`

---

## 联系人

### 联系人列表

- 请求方法：`GET`
- 请求路径：`/contacts`

### 新增分类

- 请求方法：`POST`
- 请求路径：`/contacts`

### 编辑分类

- 请求方法：`PATCH`
- 请求路径：`/contacts/:id`

### 删除分类

- 请求方法：`DELETE`
- 请求路径：`/contacts/:id`
