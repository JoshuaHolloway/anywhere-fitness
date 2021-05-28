const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(CORS());

// ==============================================

const classes = [
  {
    student_name: '',
    signedUp: false,
    instructor_name: 'josh',
    type: 'yoga',
    intensity: 'low',
    location: 'okalahoma', 
    date: 'today', 
    max_size: '10', 
    duration: '20', 
  },
  {
    student_name: '',
    signedUp: false,
    instructor_name: 'steve',
    type: 'weights',
    intensity: 'high',
    location: 'texas', 
    date: 'yesterday', 
    max_size: '1', 
    duration: '45', 
  },
];

// ==============================================

app.get('/api/classes', (req, res) => {
  res.status(200).json(classes);
});

// ==============================================

app.get('/api/classes/:id', (req, res) => {
	const c = classes.find(c => c.id.toString() === req.params.id);
	res.status(200).json(c);
});

// ==============================================

app.post('/api/classes', (req, res) => {
	// if (req.body.id !== undefined) classes.push(req.body);
  classes.push(req.body);
	res.status(201).json(classes);
});

// ==============================================

const PORT = 5e3;
app.listen(PORT, () => {
	console.log(`Server listening on port 5000: http://localhost:${PORT}/`);
});