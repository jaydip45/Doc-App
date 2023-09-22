const appointmentSchema = require('../schema/appointmentSchema');


const addAppointment = async (req, res) => {
    try {
        // console.log("Before creating appointment"); // Add this line
        const appointment = new appointmentSchema(req.body);
        // console.log("After creating appointment"); // Add this line
        
        const data = await appointment.save();
        
        // console.log("After saving appointment"); // Add this line

        res.status(201).json({
            message: "Appointment added successfully",
            data: data,
        });
    } catch (err) {
        console.log("Error in adding appointments:", err);
        res.status(500).json({
            message: "Error in adding Appointment",
            error: err.message,
        });
    }
};



const getAllAppointment = (req, res) => {


    appointmentSchema.find((err, data) => {
        if (err) {
            res.status(500).json({
                message: "Error in fetching Apointment",
                err: err
            })
        }
        else {
            if (data != null || data != undefined || data.length != 0) {
                res.status(200).json({
                    message: "Appointment fetched successfully",
                    data: data
                })
            }
            else {
                res.status(404).json({
                    message: "Appointment not found",
                })
            }
        }
    })

}


const updateAppointment = (req, res) => {

    const id = req.params.id
    appointmentSchema.findByIdAndUpdate(id, req.body, (err, data) => {
        if (err) {
            res.status(404).json({
                message: "Appointment is not update",
            })
        }
        else {
            res.status(200).json({
                message: "Appointment is update successfully",
            })
        }
    })


}


const deleteAppointment = (req, res) => {

    const id = req.params.id
    appointmentSchema.findByIdAndDelete(id, req.body, (err, data) => {
        if (err) {
            res.status(404).json({
                message: "Appointment is not remove",
            })
        }
        else {
            res.status(200).json({
                message: "Appointment is remove successfully",

            })
        }
    })


}


module.exports = {
    addAppointment,
    getAllAppointment,
    updateAppointment,
    deleteAppointment
}