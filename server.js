const {
   readFile,
   readdir,
   writeFile,
   access,
   unlink,
   promises,
   constants,
   F_OK,
} = require('fs')
const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const PRECISION = 100
const CORRECTION_FILENAME = 'qcm.md'
const RESPONSES_PATH = '/responses/'
Object.prototype.size = function () {
   var size = 0,
      key
   for (key in this) {
      if (this.hasOwnProperty(key)) size++
   }
   return size
}
const compareAnswers = (a, b) => {
   if (a.length != b.length) return false
   let isCorrect = true
   for (let i = 0; i < a.length; i++) {
      if (a[i].value !== b[i].value) isCorrect = false
   }
   return isCorrect
}
const getName = (fileName) => {
   return fileName
      .split(/[/\\\\]/)
      .pop()
      .replace('.md', '')
      .replace('qcm', '')
      .replace(/\_/g, ' ')
      .trim()
}
const getFilesNames = (dirName) => {
   return new Promise((resolve, reject) => {
      readdir(__dirname + dirName, (err, data) => {
         if (err) {
            reject(err)
         }
         resolve(data)
      })
   })
}
const setChoice = (choice) => {
   let map = new Map([])
   return choice.match(/^-\ \[ \]|^-\ \[\]|^-\  \[ \]|^-\  \[\]/)
      ? { value: false, choice: removeCheckFromChoice(choice) } //map.set("value", false).set("choice", choice)
      : { value: true, choice: removeCheckFromChoice(choice) } //map.set("value", true).set("choice", choice);
}
const fileRead = (fileName) => {
   return new Promise((resolve, reject) => {
      return readFile(fileName, 'utf-8', (err, data) => {
         if (err) {
            return reject(err)
         }
         return resolve(data)
      })
   })
}
const setQuestion = (str, isCorrection = false) => {
   let boolSwitch = false
   return str.split('\r\n').reduce((acc, curr, i) => {
      isCorrection && curr.match(/(?=.*^[A-Z])(?=.*[?])/)
         ? (acc.question = curr)
         : null
      isCorrection && curr.match(/^```/) ? (boolSwitch = !boolSwitch) : null
      if (boolSwitch)
         acc.hasOwnProperty('exemple')
            ? acc.exemple.push(curr)
            : (acc['exemple'] = [curr])
      isCorrection && curr.match(/^_coefficient_/)
         ? (acc.coef = parseFloat(curr.split('').filter(Number).join('')))
         : null
      if (curr.match(/^-\ \[/) || curr.match(/^-\  \[/))
         acc.hasOwnProperty('choices')
            ? acc.choices.push(setChoice(curr))
            : (acc.choices = [setChoice(curr)])
      isCorrection && !acc.hasOwnProperty('coef') && i > 7
         ? (acc.coef = 1)
         : null
      return acc
   }, {})
}
const removeCheckFromChoice = (choice) => choice.substring(6)

const formatData = (fileName, isCorrection = false) =>
   fileRead(fileName).then((dataJson) => {
      let name = dataJson.name
      let data = dataJson
         .split('## Question')
         .map((question) => {
            return setQuestion(question, isCorrection)
         })
         .reduce(function (acc, cur, i) {
            if (Object.keys(cur).length !== 0) acc[i] = cur
            return acc
         }, {})
      if (!isCorrection) data.name = getName(fileName)
      return data
   })
const getCoefficients = (subject) => {
   let coefficient = 0
   for (let i = 1; i <= subject.size(); i++) {
      coefficient += subject[i].coef
   }
   return coefficient
}
const setNote = (correction, responses, base = 20) => {
   let note = 0
   let coefficients = getCoefficients(correction)
   for (let i = 1; i < responses.size(); i++) {
      let corrects = correction[i].choices
      let response = responses[i].choices
      let isCorrect = compareAnswers(corrects, response)
      responses[i]['isCorrect'] = isCorrect
      if (isCorrect) note += 1 * correction[i].coef
   }
   return Math.round((note / coefficients) * base * PRECISION) / PRECISION
}

const checkFileExists = async (file) =>
   new Promise((resolve, reject) => {
      access(file, F_OK, (err) => {
         return err ? resolve(false) : resolve(true)
      })
   })
const getDatas = async () => {
   const data = await fileRead('data.json')
   return JSON.parse(data)
}
const generateData = () => {
   getFilesNames(RESPONSES_PATH)
      .then((fileNames) => {
         results = [
            formatData(__dirname + '/correction/' + CORRECTION_FILENAME, true),
         ]
         for (const fileName of fileNames) {
            results.push(formatData(__dirname + RESPONSES_PATH + fileName))
         }
         return Promise.all(results)
      })
      .then((results) => {
         let correction = results[0]
         for (const [i, result] of results.entries()) {
            if (i === 0) continue
            results[i]['note'] = setNote(correction, result)
         }
         return results
      })
      .then((results) => {
         return new Promise((resolve, reject) => {
            writeFile('data.json', JSON.stringify(results), (err) => {
               if (err) reject(err)
               resolve('data.json')
            })
         })
      })
}
const reset = async () => {
   getFilesNames(RESPONSES_PATH).then((fileList) => {
      for (const file of fileList) {
         unlink(path.join(__dirname + RESPONSES_PATH, file), (err) => {
            if (err) throw err
         })
      }
   })
   unlink(path.join(__dirname + '/correction', 'qcm.md'), (err) => {
      if (err) throw err
   })
   unlink(path.join(__dirname, '/data.json'), (err) => {
      if (err) throw err
   })
   return 'OK'
}
// _______________________________________________________________________________________________________________________
// _______________________________________________MIDDLEWARES_____________________________________________________________
// _______________________________________________________________________________________________________________________

const app = express()

app.use(
   fileUpload({
      createParentPath: true,
   })
)

app.use(express.static(__dirname + '/public/'))

app.set('twig options', {
   allow_async: true, // Allow asynchronous compiling
   strict_variables: false,
})

// ___________________________________________ROUTES__________________________________________________________________

app.get('/', async (req, res) => {
   const existed = await checkFileExists('data.json')
   console.log(existed)
   existed
      ? res.render('index.twig', {
           datas: getDatas(),
        })
      : res.render('upload.twig')
})

app.post('/', (req, res) => {
   try {
      if (!req.files || !req.files.copies || !req.files.correction) {
         res.redirect(200, '/')
      } else {
         for (const copie of req.files.copies) {
            copie.mv('./responses/' + copie.name)
         }
         let correction = req.files.correction

         correction.mv('./correction/' + CORRECTION_FILENAME)

         res.redirect('/generate')
      }
   } catch (err) {
      res.status(500).send(err)
   }
})

app.get('/generate', function (req, res) {
   generateData()
   res.redirect('/')
})

app.get('/reset', function (req, res) {
   reset()
   res.redirect('/')
})

app.listen(8080)
