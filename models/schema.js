import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
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

const forecastSchema = new mongoose.Schema({
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

export const Forecast = mongoose.model('Forecast', forecastSchema)