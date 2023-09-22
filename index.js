const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {

    let newRecipe = {
      title: "Dustin's Recipe",
      cuisine: 'Mongo'
    }

    return Recipe.create(newRecipe)
    // Run your code here, after you have insured that the connection was made
  })
  .then((createdRecipe) => {
    console.log("Created Recipe ===>", createdRecipe.title)
    return Recipe.insertMany(data)
  })
  .then((newRecipes) => {

    newRecipes.forEach((recipe, i) => {
      console.log(`New recipe #${i + 1}`, recipe.title)
    })

    return Recipe.findOneAndUpdate({
      title: "Rigatoni alla Genovese"
    }, 
    {
      duration: 100
    }, 
    {
      new: true
    })

  })
  .then((updatedRecipe) => {
    console.log("Duration change", updatedRecipe)
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then((deleteResult) => {
    console.log("Succesful deletion", deleteResult)
    mongoose.connection.close(() => {
      console.log("Connection closed")
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
