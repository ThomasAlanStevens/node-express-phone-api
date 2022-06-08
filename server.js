const express = require('express')
const cors = require('cors');
const { response } = require('express');
const app  = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<h1>Phonebook has info for ${persons.length} people</h1><br><h2>${new Date()}</h2>`)
})

app.get('/api/persons/:personID', (req, res) => {
    let id = Number(req.params.personID)
    let person = persons.find(person => person.id === id)
    if(person) res.json(person)
    else res.status(404).end()
})

app.post('/api/persons', (req, res) =>{
    let newID =  Math.max(...persons.map(person => person.id)) ? Math.max(...persons.map(person => person.id)) + 1 : 1
    const body = req.body
    
    if(persons.some(person => person.name == req.body.name)){
        return res.status(400).json({
            error: 'Content already exists'
        })
    }

    if(!body.name){
        return res.status(400).json({
            error: 'name is missing'
        })
    }
    if(!body.number){
        return res.status(400).json({
            error: 'number is missing'
        })
    }


    const person = {
        id: newID,
        name: body.name,
        number: body.number,
    }
    persons.push(person)
    res.json(person)
})

app.delete('/api/persons/:personID', (req, res) => {
    let id = Number(req.params.personID)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})