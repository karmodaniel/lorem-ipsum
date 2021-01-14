const express = require('express');

const Project = require('../models/project'); 

const router = express.Router();

router.get('/projects', async (req, res) => {
    try {

    const projects = await Project.find();
    
    return  res.send(projects);
    } catch ( err ) {
        return res.status(404).send({error: 'Query failed'});
    }
});

router.get('/projects/:id', async (req, res) => {
    try {
    const project = await Project.findById(req.params.id);
    
    return res.send(project)
   
    } catch ( err ) {
        return res.status(404).send({error : 'Project not found'});
    }
})

router.post('/projects', async (req, res) => {
    try {
        const project = await Project.create(req.body);
       
        return res.send({ project });
    } catch ( err ) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.put('/projects/:id', async (req, res) => {
    try {
    const beforeUpdate = await Project.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
        ( error ) ? console.log(error) : console.log(data);
    })
    return res.send(beforeUpdate);

    } catch ( err ) {
        return res.status(404).send({error : 'Project not found'});
    }
    
});

router.delete('/projects/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        return res.status(204).send();
    } catch ( err ) {
        return res.status(404).send({ error: 'Project not found'});
    }
   
});

module.exports = app => app.use('/lorem-invest', router);