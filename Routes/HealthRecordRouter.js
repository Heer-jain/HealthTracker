const router = require("express").Router()
const mongoose = require("mongoose")
const HealthRecordModel = require("../Models/HealthRecord")

router.post('/', async(req, res)=>{
    try{
        const healtRecord = req.body
        const newHealthRecord = new HealthRecordModel(healtRecord)
        const savedRecord = await newHealthRecord.save()
        return res.status(201).send({success: true, result: savedRecord, message: "Record added successfully"})
    }catch(error){
        console.log(error)
        return res.status(500).send({success: false, error: "Unable to insert record"})
    }
})

router.get('/', async(req, res)=>{
    try {
        const healthRecords = await HealthRecordModel.find({})
        return res.status(201).send({success: true, result: healthRecords})
    } catch (error) {
        return res.status(500).send({success: false, error: "Can't able to fetch records"})
    }
})

router.get('/record/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const healthRecords = await HealthRecordModel.findById(id)
        return res.status(201).send({success: true, result: healthRecords})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "Can't able to fetch records"})
    }
})


router.delete('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const healthRecord = await HealthRecordModel.findOneAndDelete(id)
        if(!healthRecord) return res.status(404).send({success: false, error: "Record not found"})
        return res.status(201).send({success: true, message: "Record delete successfully"})
    } catch (error) {
        return res.status(500).send({success: false, error: "Record is not deleted"})
    }
})

router.put('/:id', async(req, res) => {
    try {
        const {id} = req.params
        const updateData = req.body
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid ID format" });
          }
        const healthRecord = await HealthRecordModel.findByIdAndUpdate({_id : id},
            updateData,             
            { new: true },  
        )
        if(!healthRecord) return res.status(404).send({success: false, error: "Record not found"})
        return res.status(201).send({success: true, message: "Record updated successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "Record is not updated"})
    }
})

router.get('/recent', async(req, res)=>{
    try {
        const records = await HealthRecordModel.find().limit(7)
        return res.status(201).send({success: true, result: records})
    } catch (error) {
        return res.status(500).send({success: false, error: "Record not found"})
    }
})

router.get('/search', async (req, res) => {
    try {
      const { date, heartRate } = req.query;
        let query = {};
      if (date) {
        query.date = new Date(date);
      }
      if (heartRate) {
        query.heartRate = { $gte: parseInt(heartRate) };  // Greater than or equal to
      }
      const records = await HealthRecordModel.find(query);
      res.json(records);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Failed to search health records' });
    }
  });

module.exports = router