import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
    userEmail: {
        type: String
    },
    companyName: {
        type: String,
        required: true
    },
    cPersonName: {
        type: String,
    },
    email: {
        type: String,
    },
    ifActive: {
        type: Boolean,
    },
    listName: {
        type: String,
    },
    sdate: {
        type: Date,
    },
    edate: {
        type: Date,
    },
    interest1: {
        type: Number,
    },
    interest2: {
        type: Number,
    },
    interest3: {
        type: Number,
    },
})

export const Company = mongoose.model('Company', companySchema)

const studentSchema = new mongoose.Schema({
    userEmail: {
        type: String
    },
    studentName: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    stuState: {
        type: Number,
    },
    interest1: {
        type: Number,
    },
    interest2: {
        type: Number,
    },
    interest3: {
        type: Number,
    },
    note: {
        type: String,
    }
})

export const Student = mongoose.model('Student', studentSchema)

const historySchema = new mongoose.Schema({
    userEmail: {
        type: String
    },
    period: {
        type: String,
        required: true,
    },
    stuNum: {
        type: Number,
    },
    comNum: {
        type: Number,
    },

})

export const HisData = mongoose.model('HisData', historySchema)