var mode = process.env.REACT_APP_MY_VAR
// var API_SERVER = 'http://localhost'
var API_SERVER = 'https://zjddd.com'

if (mode === 'development') {
  // API_SERVER = 'http://localhost'
  API_SERVER = 'https://zjddd.com'
}

if (mode === 'production') {
  API_SERVER = 'https://zjddd.com'
}

export { API_SERVER }
