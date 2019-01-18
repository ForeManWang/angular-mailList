const Parameter = require('parameter')
const jwt = require('jwt-simple')
const moment = require('moment')

const parameter = new Parameter()

exports.parameterValidate = (rule) => {
  return (req, res, next) => {
    const validateErrors = parameter.validate(rule, Object.assign({}, req.body))

    if (validateErrors) {
      return res.status(422).json({
        error: 'Validation Failed',
        detail: validateErrors
      })
    }

    next()
  }
}

exports.check_api_token = (req, res, next) => {
  const token = req.get('x-access-token')
  if (!token) {
    return res.status(401).json({
      error: '认证失败：无法在请求头中找到 X-Access-Token 信息'
    })
  }

  // 校验 token 的正确性
  try {
    const decodedToken = jwt.decode(token, 'itcast')

    // 如果过期时间小于当前时间，说明已过期
    if (decodedToken.exp < moment().valueOf()) {
      return res.status(401).json({
        error: '认证失败：token 已过期'
      })
    }

    req.body.userId = decodedToken.iss

    next()
  } catch (err) {
    res.status(401).json({
      error: '认证失败：无效的 token'
    })
  }
}
