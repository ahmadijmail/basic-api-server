"use strict";
const express = require("express");

//in this line we are taking the routing functionality from express

const { food } = require("../models/index");


const foodRouter = express.Router();
//add routes
foodRouter.get("/food", getfood);
foodRouter.get("/food/:id", getonefood);
foodRouter.post("/addfood", createfood);
foodRouter.put("/food/:id", updatefood);
foodRouter.delete("/food/:id", deletefood);

async function getfood(req, res) {
    //get me everything it might be an array of objects
    //findAll means go to the database and return them all behind the scenes it will do SELECT * FROM people;
    // console.log(People);
    const allfood = await food.findAll();
    res.status(200).json(allfood);
}
//if we want to find one

async function getonefood(req, res) {
    //just make sure to parse it into int because it will be a number but in string format
    const foodId = parseInt(req.params.id);
    // because findOne can have more than one condition we gonna do it like
    let findfood = await food.findOne({ where: { id: foodId } });
    res.status(200).json(findfood);
}

// for adding new record
async function createfood(req, res) {
    //adding a person to DB or File or whatever
    //regarding the success status for the post it is not 200 it's from 200's family it's 201 once you added something and it's successfully created
    let newfood = req.body;
    let addfood = await food.create(newfood);
    res.status(201).json(addfood);
}

async function updatefood(req, res) {
    //just make sure to parse it into int because it will be a number but in string format
    let foodId = parseInt(req.params.id);
    let updatefood = req.body; //the one that the form will send to us from the frontend
    //to update the person i need to find it first then update it
    let foundfood = await food.findOne({ where: { id: foodId } });
    if (foundfood) {

        let updatedfood = await foundfood.update(updatefood);
        res.status(201).json(updatedfood);
    } else {
        // throw new Error('there is not such id');
        res.status(404);
    }
}
async function deletefood(req, res) {
    //just make sure to parse it into int because it will be a number but in string format
    let foodId = parseInt(req.params.id);
    let deletefood = await food.destroy({ where: { id: foodId } });

    //if we have the name id instead of personId we can use a short cut
    //   let deletePerson = await People.destroy({ where: { id } });

    res.status(204).json(deletefood); //it will return the id of the deleted person
}


module.exports = foodRouter;
