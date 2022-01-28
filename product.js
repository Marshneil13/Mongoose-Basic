const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:17017/shopApp')//works on localhost:27017
.then(()=>{
    console.log('CONNECTION OPEN!!!');
})
.catch((err)=>{
    console.log('CAUGHT AN ERROR!!!');
    console.log(err);
})

const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,//this means name MUST be there when creating a new product
            maxLength: 15
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price must be positive you dodo!']
        },
        onSale: {
            type: Boolean,
            default: false
        },
        details: [String],
        categories: [String],
        qty: {
            online: {
                type: Number,
                default: 0
            },
            inStore: {
                type: Number,
                default: 0
            }
        },
        size: {
            type: String,
            enum: ['XS','S','M','L','XL']
        }

});
// productSchema.methods.greet = function(){
//     console.log('HI! Welcome to our product!');
//     console.log(`-From ${this.name}`)//here the keyword this refers to foundProduct
// }


productSchema.methods.addCategory = function(newCat){
    this.categories.push(newCat);
    return this.save();
}

productSchema.methods.toggleOnSale = function(){
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}

const Product = mongoose.model('Product', productSchema);

// Product.fireSale().then(res => console.log(res))


const findProduct = async () => {
    const foundProduct = await Product.findOne({name: 'Zara'});
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Winter-Collection')
    console.log(foundProduct);
    // foundProduct.greet();
}
findProduct();


// const dress = new Product({name: 'Zara', price: 3999, details: ['Casual', 'Bodycon', 'Black'], size: 'XL'})
// dress.save()
// .then(data => {
//     console.log('IT WORKED!!!');
//     console.log(data);
// }).catch(err => {
//     console.log('ERROR!!!');
//     console.log(err);
// })

// Product.findOneAndUpdate({name:'Zara'}, {price:-500}, {new: true, runValidators: true})
//validating mongoose update by setting runValidators true
// .then(data => {
//     console.log('IT WORKED!!!');
//     console.log(data);
// }).catch(err => {
//     console.log('ERROR!!!');
//     console.log(err.errors.price.properties.message);
// })