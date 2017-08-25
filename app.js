const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
const mustacheExpress = require('mustache-express');
const expressValidator = require('express-validator');
const fs = require('fs');
const app = express();
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
// pull in CSS page reference from public directory
// app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }));

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

let hangMan = {
  word: newWord(),
  letter: [],
  gameWord: [],
  guesses: 3,
};

app.get('/',function(req,res){
  res.render("main", hangMan);
});

app.get('/lose', function(req,res){
  res.send('YOU LOSE...');
});

function newWord(){
  let word =
  words[Math.floor(Math.random()* words.length)];
  console.log(word);
  return word;
}

function createSpaces() {

}
// if the guessed letter is part of the new word, populate it in the gameWord field at the bottom of the page
// function fillWord(){
//   let word = newWord();
//   let letter = req.body.text;
//   if (letter)
// }

// function wordPlacement(word,letter){
//   let gameWord = [];
//   for(let i = 0; i < word.length; i++){
//     if(word.includes(req.body.letter)){
//       gameWord.push(req.body.value);
//     } else {
//       gameWord
//     }
//   }
// }
app.post('/guess',function(req,res){
  hangMan.guesses -= 1;
  if(hangMan.guesses > 0){
    res.redirect('/');
  }else {
    res.redirect('/lose');
  }
})

app.post('/', function(req,res){
  hangMan.letter.push(req.body.text);
})

// app.post('/guess',function(req,res){
//   let guess = req.body.letter;
//   req.checkBody({
//     'guess' : {
//       notEmpty: true,
//       isLength: {
//         options: {max: 1},
//         errorMessage: 'Only guess 1 letter at a time'
//       },
//       isAlpha: true,
//     }
//   });
//   let errors =
//   req.validationErrors();
//   if (errors) {
//     let main = errors;
//   }
//   res.redirect('/');
// });

app.listen(3000, function(){
  console.log("Killin' it!")
});
