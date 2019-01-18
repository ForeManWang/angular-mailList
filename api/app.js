const jsonServer = require('json-server')
const Parameter = require('parameter')
const session = require('express-session')
const md5 = require('blueimp-md5')
const {parameterValidate, check_api_token} = require('./middleware')
const { getDb, saveDb } = require('./db')
const jwt = require('jwt-simple')
const moment = require('moment')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(session({
  secret: 'itcast',
  resave: false,
  saveUninitialized: true,
  cookie: {
    domain: 'http://localhost:5000/'
  }
}))

server.use(middlewares)

server.use(jsonServer.bodyParser)

/**
 * signup
 */
server.post('/users', parameterValidate({
  email: 'email',
  password: 'password'
}), async (req, res, next) => {
  const body = req.body

  const db = await getDb()

  const { users } = db

  const exists = users.some(u => u.email === body.email)

  if (exists) {
    return res.status(409).json({
      error: 'Validation Failed',
      detail: [{
        message: 'conflict',
        field: 'email',
        code: 'conflict_field'
      }]
    })
  }

  body.password = md5(body.password)

  const last = users[users.length - 1]
  body.id = last ? last.id + 1 : 1

  users.push(body)
  await saveDb(db)

  req.session.user = body

  // 生成 token 用户标识
  const token = jwt.encode({
    iss: body.id, // 签发的用户 id 标识
    exp: moment().add('days', 7).valueOf() // token 过期时间 7 天
  }, 'itcast')

  delete body.password
  res.status(201).json({
    token,
    user: body
  })
})

/**
 * signin
 */
server.post('/session', parameterValidate({
  email: 'email',
  password: 'password'
}), async (req, res, next) => {
  const body = req.body

  const { users } = await getDb()

  const user = users.find(u => u.email === body.email)

  if (!user) {
    return res.status(401).json({
      error: 'email invalid'
    })
  }

  if (md5(body.password) !== user.password) {
    return res.status(401).json({
      error: 'password invalid'
    })
  }

  req.session.user = user

  // 生成 token 用户标识
  const token = jwt.encode({
    iss: user.id, // 签发的用户 id 标识
    exp: moment().add('days', 7).valueOf() // token 过期时间 7 天
  }, 'itcast')

  delete user.password

  res.status(201).json({
    token,
    user
  })
})

/**
 * signout
 */
server.delete('/session', (req, res, next) => {
  // delete req.session.user
  // TODO: destroy token

  res.status(204).json({})
})

/**
 * authorization
 */
// server.use((req, res, next) => {
//   const sessionUser = req.session.user
//   if (!sessionUser) {
//     return res.sendStatus(401)
//   }
//   req.body.userId = sessionUser.id
//   next()
// })
server.use(check_api_token)

server.post('/tags', parameterValidate({
  title: 'string'
}))

server.post('/contacts', parameterValidate({
  name: 'string'
}))

server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})
