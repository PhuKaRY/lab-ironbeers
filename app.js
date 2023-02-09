const { Console } = require('console');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000 http://localhost:3000/'));

app.get('/beers', async (req, res) => {
  try {
    const allBeers = await punkAPI.getBeers();
    res.render('beers', { allBeers });
    //console.log(allBeers);
  } catch (error) {
    console.log(error);
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const randombeer = await punkAPI.getRandom();

    console.log(randombeer[0]);
    res.render('random-beer', { randombeer: randombeer[0] });
  } catch (error) {
    console.log(error);
  }
});

app.get('/singlebeer/:id', async (req, res) => {
  try {
    const id = req.params;
    console.log(id);

    const single = await punkAPI.getBeer(id.id);
    res.render('singlebeer', { single: single[0] });
  } catch (error) {
    console.log(error);
  }
});
