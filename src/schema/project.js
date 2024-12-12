const { default: mongoose } = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    githubUrl: { 
        type: String, 
        required: true, 
        match: /^https?:\/\/github\.com\/.+\/.+$/
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    collaborators: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        } 
    ],
    chatSession: {
        type: String
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports =  projectSchema
