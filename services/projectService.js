const Project = require('../models/project');
var ObjectID = require('mongoose').Types.ObjectId; 

const addProject = async data => { return await new Project(data).save() }

// const getProjects = async () => { return await Project.find({}) }
 const getProjects = async () => { 
    return await Project.aggregate([
        { $match: {}},
        {
            $lookup:{
                from: 'users',
                localField: 'createdBy',
                foreignField: '_id',
                as: 'created'
            },
            
        },
        // { "$unwind": "$created" },
        {
            $project:{
                _id:1,
                name:1,
                createdBy :{ "$setUnion": [ '$created.firstName', '$created.lastName'] },
                // createdBy: '$created.firstName' + '$created.lastName',
                createdAt:1,
                updatedAt:1,
                
            }
        },
        
    ]) 
}


const getOneProject = async projectID => { return await Project.findById(projectID) }

const deleteProject = async projectID => { 
    var deleted = false
    await Project.findByIdAndRemove(projectID, function (err, docs) { if (err){ } else  deleted = true })
    return deleted;
}

module.exports = {
    addProject,
    getProjects,
    getOneProject,
    deleteProject
}