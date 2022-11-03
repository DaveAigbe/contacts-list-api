const unknownEndpoint = (req, res) => {
    res.status(404).json({error: 'Endpoint does not exist'})
}

const generateId = (contacts) => {
    if (contacts) {
        return contacts.length + 1;
    } else {
        return 1;
    }
};

const duplicateExists = (person, contacts) => {
    if (person.name && person.number) {
        const findDuplicate = contacts.find(contact => contact.name === person.name);
        return !!findDuplicate;
    }
    return false;
};

module.exports = {unknownEndpoint, generateId, duplicateExists}
