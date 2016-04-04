// follow real world example  https://github.com/reactjs/redux/tree/master/examples/real-world

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod')
} else {
  module.exports = require('./configureStore.dev')
}
