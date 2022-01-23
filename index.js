const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:17017/moviesApp')
.then(()=>{
    console.log('CONNECTION OPEN!!!');
})
.catch((err)=>{
    console.log('CAUGHT AN ERROR!!!');
    console.log(err);
})

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema)//'Movie' is singular and capitalized first letter
// in mongoose it becomes plural and lowercase i.e. 'movies'
// usually the var name is same as the model class
// const After = new Movie({ title: "After", year: 2019, score: 8.6, rating:'PG'});
// line 21 needs to be saved as After.save() to reflect in the database 
//creates an instance of the class Movie

// const blah = new Movie();//adding more instances
// blah.save();

Movie.insertMany([{ title: "After", year: 2019, score: 8.6, rating:'PG'},
{ title: 'Amelie', year: 2001, score: 8.3, rating: 'R'},
{ title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
{ title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'},
{ title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R'},
{ title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13'}])
.then(data => {
console.log("SUCCESSFULLY INSERTED");
console.log(data);
})
// by doing insertMany, directly adds to mongo 