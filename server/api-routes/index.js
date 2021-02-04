import express from 'express';
import addTodoRoutes from './todos';
import addEventRoutes from './events';
import { PythonShell } from 'python-shell';
import { Company } from '../../models/schema'
const router = express.Router();
// addTodoRoutes(router);
// addEventRoutes(router);

//Restful Api
//Getting all
//TODO: directory issue in python DONE
router.get('/company/', async (req, res) => {
    try {
        const companies = await Company.find()
        res.json(companies)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

//Getting one
router.get('/company/:id', getCompany, (req, res) => {
    res.json(res.company)
})

//Creating one
router.post('/company/', async (req, res) => {
    //TODO: Add a loop to insert an array one by one
    const company = new Company({
        companyName: req.body.companyName,
        cPersonName: req.body.cPersonName,
        email: req.body.email,
        ifActive: req.body.ifActive,
        listName: req.body.listName,
        sdate: req.body.sdate,
        edate: req.body.edate,
        interest1: req.body.interest1,
        interest2: req.body.interest2,
        interest3: req.body.interest3
    })
    try {
        const newCompany = await company.save()
        res.status(201).json(newCompany)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Updating one
router.patch('/:id', getCompany, (req, res) => {
    if (req.body.companyName != null) {
        res.company.companyName = req.body.cPersonName
    }
})

//Deleting one
router.delete('/company/:id', getCompany, async (req, res) => {
    try {
        await res.company.remove()
        res.json({ message: 'Company Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// //Connect to Py script
// const {spawn} = require('child_process');
// const childPy = spawn('python', ['D:\\CodeStuff\\InternMainProject\\Forecasting\\mainapp\\server\\api-routes\\hi.py'])

// childPy.stdout.on('data', (data)=> {
//     console.log(`stdout: ${data}`)
// })
// childPy.stderr.on('data', (data)=> {
//     console.log(`stderr: ${data}`)
// })
// childPy.on('close', (code) => {
//     console.log(`child pro exits with code: ${code}`)
// })

async function getCompany(req, res, next) {
    let company
    try {
        company = await Company.findById(req.params.id)
        if (company == null) {
            return res.status(404).json({ message: 'Cannot find comnpany' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.company = company
    next()
}

export default router;