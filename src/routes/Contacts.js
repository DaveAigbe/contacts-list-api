const express = require('express');
const router = express.Router();
const fs = require('fs');
const contactsObj = require('../data/contacts.json');
const {generateId, duplicateExists} = require('../utils/utilities');

// GET ALL
router.get('/', (req, res) => {
    res.json(contactsObj.contacts);
});

// GET DETAIL
router.get('/:id', (req, res) => {
    const person = contactsObj.contacts.find(contact => contact.id === Number(req.params.id));

    if (person) {
        res.json(person);
    } else {
        res.status(404).send('Contact does not exist.');
    }
});

// GET INFO
router.get('/info', (req, res) => {
    const dateString = new Date(Date.now());
    res.send(`Phonebook has info for ${contactsObj.contacts.length} people. \n ${dateString}`);
});

// POST NEW
router.post('/', (req, res) => {
    const data = req.body;

    const newPerson = {
        id: generateId(contactsObj.contacts),
        name: data.name,
        number: data.number
    };

    if (data) {
        if (!duplicateExists(newPerson, contactsObj.contacts)) {
            const updatedContacts = {'contacts': [...contactsObj.contacts, newPerson]};
            fs.writeFile('./src/data/contacts.json', JSON.stringify(updatedContacts), (err) => {
                if (err) {
                    return console.log(err);
                }
            });
            res.status(201).json(newPerson);
        } else {
            res.status(400).json({error: 'Name must be unique'});
        }
    } else {
        res.status(400).send('Contact is invalid format.');
    }

});

// DELETE DETAIL
router.delete('/:id', (req, res) => {
    const person = contactsObj.contacts.find(contact => contact.id === Number(req.params.id));

    if (person) {
        const updatedContacts = {contacts: contactsObj.contacts.filter(contact => contact !== person)};
        fs.writeFile('./src/data/contacts.json', JSON.stringify(updatedContacts), (err) => {
            if (err) {
                return console.log(err);
            }
        });
        res.status(200).send(`${person.name} has successfully been deleted`);
    } else {
        res.status(404).send('Contact does not exist.');
    }
});

module.exports = router;
