const shell = require('shelljs')
const { groupReducer, groupBy, composedGroupReducer } = require('./group-by')

const PATH = 'src'
const lines = shell.exec(`grep -rn "it(" ${PATH}`).split('\r\n')

const removeEndings = str => str
  .replace(', () => {', '')
  .replace(', (done) => {', '')
  .replace(', function(){', '')
  .replace(', function(done){', '')

const tests = lines.map(l =>
  l.split('it(')
    .map(phrase => removeEndings(phrase).trim())
    .map(phrase => phrase.substr(0, phrase.length-1))
).map(([filepath, testname]) => {
  const [fileTmp, line] = filepath.split(':')
  const [file, , ext] = fileTmp.split('.')
  return { filepath, testname, line, file, ext }
}).filter(({ file }) => file)

const countReducer = (c, _) => c+1
const byExt = [countReducer, () => 0, 'ext']

const groupFileExt = groupBy(composedGroupReducer(...byExt, 'file'), tests)
const groupExt = groupBy(composedGroupReducer(...byExt), tests)

// console.log(tests)
console.log(groupFileExt)
console.log(groupExt)
