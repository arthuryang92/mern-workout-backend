const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

const getWorkouts = async (req,res)=>{
    try{
       const user_id = req.user._id
        const workouts = await Workout.find({user_id}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch(error){
        res.status(400).json({error:error.message})
    }
}

const getWorkout = async (req,res)=>{
    const { id } = req.params
  
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }
    const workout = await Workout.findById(id) 
       
        if(!workout){
            return res.status(404).json({error:'No such workout'})
        }
        res.status(200).json(workout)
}

const createWorkout = async (req,res)=>{
    const {title,load,reps} = req.body
    let singleDetails = []

    if(!title){
        singleDetails.push('title')
    }
    if(!load){
        singleDetails.push('load')
    }
    if(!reps){
        singleDetails.push('reps')
    }

    if(singleDetails.length > 0){
        return res.status(400).json({ error: 'please fill up all form', singleDetails})
    }


    try{
        const user_id = req.user._id
        const workout = await Workout.create({title,load,reps,user_id})
        res.status(200).json(workout)
    } catch(error){
        res.status(400).json({error:error.message})
    }
} 

const deleteWorkout = async (req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"No such workout"})
    }
    const workout = await Workout.findOneAndDelete({_id:id})
       

        if(!workout){
            return res.status(404).json({error:'No such workout'})
        }
        res.status(200).json(workout)   
    
} 

const updateWorkout = async (req,res)=>{
    const { id } = req.params
    const {title,load,reps} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"No such workout"})
    }

    
        const workout = await Workout.findOneAndUpdate({_id:id},{...req.body})
        if(!workout){
            return res.status(400).json({error:error.message})
        }
        res.status(200).json(workout)
    
       
    
} 

module.exports = {createWorkout, getWorkouts, getWorkout,deleteWorkout,updateWorkout} 