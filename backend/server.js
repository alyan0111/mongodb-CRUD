const express = require('express');
const mongoose = require('mongoose');
const FormModel = require('./Mymodel');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend URL
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.set("views", path.join(__dirname, "views"));

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

main()
    .then(() => {
        console.log("Connection is successful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/form');
}

// POST route for handling form submission
app.post("/FormModel", async (req, res) => {
    try {
        // Assuming you want to create a new document using the submitted data
        const newData = await FormModel.create(req.body);
        res.json({ message: "Data submitted successfully", data: newData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// GET route for returning the FormData.js file (This route seems unnecessary)
app.get('/formData', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'FormData.js'));
});

// GET route for fetching data from the database
app.get("/fetchData", async (req, res) => {
    try {
        const data = await FormModel.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// POST route for deleting data
app.post("/deleteData", async (req, res) => {
    try {
        const id = req.body.id;
        const deletedData = await FormModel.deleteOne({ _id: id });
        if (deletedData.deletedCount === 1) {
            res.send("Data deleted successfully");
        } else {
            res.status(404).send("Data not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// POST route for updating data
app.post("/updateData", async (req, res) => {
    try {
        const { id, name, email } = req.body;
        const updatedData = await FormModel.findByIdAndUpdate(id, { name, email }, { new: true });
        if (updatedData) {
            res.json({ message: "Data updated successfully", data: updatedData });
        } else {
            res.status(404).send("Data not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/", (req, res) => {
    res.send("Root is working");
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
