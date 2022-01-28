//Mongoose Virtuals
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp')
.then(()=>{
    console.log('CONNECTION OPEN!!!');
})
.catch((err)=>{
    console.log('CAUGHT AN ERROR!!!');
    console.log(err);
})

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

// const hardin = new Person({first: 'Bella', last: 'Thomas'});
// console.log(hardin);

//get method & set method
personSchema.virtual('fullName').get(function(){
    return `${this.first} ${this.last}`
})

personSchema.pre('save', async function(){
    this.first = 'YO'
    this.last = 'MAMA'
    console.log('ABOUT TO SAVE!!!');
})
personSchema.post('save', async function(){
    console.log('JUST SAVED!!!');
})
const Person = mongoose.model('Person', personSchema);

// .set(function(v) {
//     this.name.first = v.substr(0, v.indexOf(' '));
//     this.name.last = v.substr(v.indexOf(' ') + 1);
//   });
// hardin.fullName = "Bella Scott";