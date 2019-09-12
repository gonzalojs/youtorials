const A = require('arcsecond')


const stringParser =A.str('hello').map(result => ({
  type: 'captured string',
  value: result
}))

console.log(
  stringParser.run('hello')
)