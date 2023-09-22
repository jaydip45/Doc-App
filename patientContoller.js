// const doctorSchema = require('../schema/patientSchema');

// const addPatient = (req, res) => {
//     const patient = new patientSchema(req.body)
//     user.save((err, data) => {
//         if (err) {
//             res.status(500).json({
//                 message: "error in adding patient",
//             })
//         }
//         else {
//             res.status(201).json({
//                 message: "patient added successfully",
//                 data: data
//             })
//         }

//     })
// }
// const getAllPatient = (req, res) => {


//     patientSchema.find((err, data) => {
//         if (err) {
//             res.status(500).json({
//                 message: "Error in fetching patient",
//                 err: err
//             })
//         }
//         else {
//             if (data != null || data != undefined || data.length != 0) {
//                 res.status(200).json({
//                     message: "patient fetched successfully",
//                     data: data
//                 })
//             }
//             else {
//                 res.status(404).json({
//                     message: "patient not found",
//                 })
//             }
//         }
//     })

// }


// const updatePatient = (req, res) => {

//     const id = req.params.id
//     patientSchema.findByIdAndUpdate(id, req.body, (err, data) => {
//         if (err) {
//             res.status(404).json({
//                 message: "data is not update",
//             })
//         }
//         else {
//             res.status(200).json({
//                 message: "data is update successfully",
//                 data: data
//             })
//         }
//     })


// }


// const deletePatient = (req, res) => {

//     const id = req.params.id
//     patientSchema.findByIdAndDelete(id, req.body, (err, data) => {
//         if (err) {
//             res.status(404).json({
//                 message: "data is not remove",
//             })
//         }
//         else {
//             res.status(200).json({
//                 message: "data is remove successfully",
//                 data: data
//             })
//         }
//     })


// }


// module.exports = {
//     addPatient,
//     getAllPatient,
//     updatePatient,
//     deletePatient
// }