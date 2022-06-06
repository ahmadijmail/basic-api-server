"use strict";
const express = require("express");

//in this line we are taking the routing functionality from express

const { clothes } = require("../models/index");


const clothesRouter = express.Router();
//add routes
clothesRouter.get("/", handelhome);
clothesRouter.get("/clothes", getclothes);
clothesRouter.get("/clothes/:id", getoneclothes);
clothesRouter.post("/addclothes", createclothes);
clothesRouter.put("/clothes/:id", updateclothes);
clothesRouter.delete("/clothes/:id", deleteclothes);


 function handelhome(req, res) {
   
    res.status(200).send('Hello User');
}

async function getclothes(req, res) {
    //get me everything it might be an array of objects
    //findAll means go to the database and return them all behind the scenes it will do SELECT * FROM people;
    // console.log(People);
    const allclothes = await clothes.findAll();
    res.status(200).json(allclothes);
}
//if we want to find one

async function getoneclothes(req, res) {
    //just make sure to parse it into int because it will be a number but in string format
    const clothesId = parseInt(req.params.id);
    // because findOne can have more than one condition we gonna do it like
    let findclothes = await clothes.findOne({ where: { id: clothesId } });
    res.status(200).json(findclothes);
}

// for adding new record
async function createclothes(req, res) {
    //adding a person to DB or File or whatever
    //regarding the success status for the post it is not 200 it's from 200's family it's 201 once you added something and it's successfully created
    let newclothes = req.body;
    let addclothes = await clothes.create(newclothes);
    res.status(201).json(addclothes);
}

async function updateclothes(req, res) {
    //just make sure to parse it into int because it will be a number but in string format
    let clothesId = parseInt(req.params.id);
    let updateclothes = req.body; //the one that the form will send to us from the frontend
    //to update the person i need to find it first then update it
    let foundclothes = await clothes.findOne({ where: { id: clothesId } });
    if (foundclothes) {

        let updatedclothes = await foundclothes.update(updateclothes);
        res.status(201).json(updatedclothes);
    } else {
        // throw new Error('there is not such id');
        res.status(404);
    }
}
async function deleteclothes(req, res) {
    //just make sure to parse it into int because it will be a number but in string format
    let clothesId = parseInt(req.params.id);
    let deleteclothes = await clothes.destroy({ where: { id: clothesId } });

    //if we have the name id instead of personId we can use a short cut
    //   let deletePerson = await People.destroy({ where: { id } });

    res.status(204).json(deleteclothes); //it will return the id of the deleted person
}


module.exports = clothesRouter;
