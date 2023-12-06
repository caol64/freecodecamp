const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require("body-parser");

const User = require("./model.js").UserModel;
const Exercise = require("./model.js").ExerciseModel;

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use(cors())
// http://expressjs.com/en/starter/static-files.html
app.use('/public', express.static(__dirname + '/public'));



// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return next({message: error.message});
  }
});

app.post('/api/users', async (req, res, next) => {
  const username = req.body.username;
  if (!username) {
    return next({message: 'Users validation failed: username: Path `username` is required.'});
  }
  try {
    const user = new User(req.body);
    await user.save();
    res.json({username: username, _id: user._id});
  } catch (error) {
    return next({message: error.message});
  }
});

app.post('/api/users/:_id/exercises', async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return next({message: 'User not found'});
    }
    const exercise = new Exercise(req.body);
    if (!exercise.date) {
      exercise.date = new Date();
    }
    exercise.user_id = req.params._id;
    await exercise.save();
    res.json({
      username: user.username,
      _id: user._id,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString()
    });
  } catch (error) {
    return next({message: error.message});
  }
});

app.get('/api/users/:_id/logs', async (req, res, next) => {
  let from = req.query.from;
  let to = req.query.to;
  let limit = req.query.limit;
  if (!from) {
    from = '1970-01-01';
  }
  if (!to) {
    to = new Date().toString();
  }
  if (!limit) {
    limit = 1000;
  } else {
    limit = Number(limit);
  }
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return next({message: 'User not found'});
    }
    // const count = await Exercise.countDocuments({
    //   user_id: user._id
    // });
    const exercises = await Exercise.find({
      user_id: user._id,
      date: {
        $gte: from,
        $lte: to
      }
    }).limit(limit);
    const logs = new Array();
    if (exercises) {
      for (const exercise of exercises) {
        let date = exercise.date;
        if (date) {
          date = exercise.date.toDateString();
        }
        logs.push({
          description: exercise.description,
          duration: exercise.duration,
          date: date
        });
        
      }
    }
    res.json({
      username: user.username,
      _id: user._id,
      count: logs.length,
      log: logs
    });
  } catch (error) {
    return next({message: error.message});
  }
});

// Error handler
app.use(function (err, req, res, next) {
  console.log(err);
  if (err) {
      res.json({error: err.message});
  }
});

// Unmatched routes handler
app.use(function (req, res) {
  if (req.method.toLowerCase() === "options") {
    res.end();
  } else {
    res.status(404).type("txt").send("Not Found");
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
