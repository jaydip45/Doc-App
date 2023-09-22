const jwt = require('jsonwebtoken');
const tokenSchema = require('../schema/tokenSchema');
const moment = require('moment'); 

const secretKey = 'your-secret-key'; 

let dailyTokenCount = 0;
const maxTokensPerDay = 4;

const resetDailyTokenCount = () => {
  const now = moment();
  const endOfDay = moment().endOf('day');

  if (now.isAfter(endOfDay)) {
    dailyTokenCount = 0;
  }
};

const addToken = async (req, res) => {
  try {
    resetDailyTokenCount();

    if (dailyTokenCount >= maxTokensPerDay) {
      return res.status(400).json({ error: 'Daily token limit exceeded' });
    }

    const { name, age, contact, gender } = req.body;

    const token = jwt.sign(
      { tokenNumber: dailyTokenCount + 1, name, age, contact, gender },
      secretKey
    );

    // console.log('Token created:', token);

    const newToken = new tokenSchema({
      tokenNumber: dailyTokenCount + 1, 
      name,
      age,
      contact,
      gender,
    });

    // console.log('New token document:', newToken);

    await newToken.save();

    dailyTokenCount++;

    res.json({ tokenNumber: dailyTokenCount, user: { name, age, contact, gender } });
  } catch (error) {
    console.error('Error in adding token:', error);
    res.status(500).json({ error: 'Error generating token', err: error.message });
  }
};


const getAllToken = (req, res) => {


    tokenSchema.find((err, data) => {
        if (err) {
            res.status(500).json({
                message: "Error in fetching Token",
                err: err
            })
        }
        else {
            if (data != null || data != undefined || data.length != 0) {
                res.status(200).json({
                    message: "Token fetched successfully",
                    data: data
                })
            }
            else {
                res.status(404).json({
                    message: "Token not found",
                })
            }
        }
    })

}


const updateToken = (req, res) => {

    const id = req.params.id
    tokenSchema.findByIdAndUpdate(id, req.body, (err, data) => {
        if (err) {
            res.status(404).json({
                message: "Token is not update",
            })
        }
        else {
            res.status(200).json({
                message: "Token is update successfully",
            })
        }
    })


}


const deleteToken = (req, res) => {

    const id = req.params.id
    tokenSchema.findByIdAndDelete(id, req.body, (err, data) => {
        if (err) {
            res.status(404).json({
                message: "Token is not remove",
            })
        }
        else {
            res.status(200).json({
                message: "Token is remove successfully",

            })
        }
    })


}


module.exports = {
  addToken,
  deleteToken,
  updateToken,
  getAllToken
}