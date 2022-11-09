const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const contactsRoute = require('./routes/Contacts')
const {unknownEndpoint} = require('./utils/utilities')
const {newContactToken} = require('./utils/tokens')

const app = express();
const PORT = process.env.PORT || 5000;


morgan.token('contact', newContactToken)


app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contact'))
app.use(cors())

app.use('/api/contacts', contactsRoute)

app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`App is currently listening on ${PORT}`);
});
