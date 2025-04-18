const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/cars', require('./routes/cars'));
app.use('/employees', require('./routes/employees'));
app.use('/customers', require('./routes/Customers')); 
app.use('/users', require('./routes/users')); 

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});