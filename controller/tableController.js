const Meeting = require('../models/meetingTable');
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
exports.allTable = async (req, res) => {
    try {
        const selectedDate = req.query.date || getCurrentDate();
        const startOfDay = new Date(selectedDate);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDate);
        endOfDay.setUTCHours(23, 59, 59, 999);
        const meetings = await Meeting.find({
        startTime: {$gte: startOfDay, $lt: endOfDay }
        }).sort({ startTime: 1 });
        res.json(meetings);
        console.log(meetings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.addTable = async (req, res) => {
    const { member, startTime, endTime,status,club } = req.body;
    try {
      const newMeeting = new Meeting({
        member,
        startTime : new Date(startTime),
        endTime: new Date(endTime),
        status,
        club
      });
      await newMeeting.save();
      res.status(201).json({ message: 'success' });
    } catch (error) {
      res.status(500).json({ message: 'fail' });
    }
}