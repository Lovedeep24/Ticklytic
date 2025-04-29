const Users = require('../models/SignupModel'); 
// const { Users } = require('lucide-react');
const fetchUsersInfo = async (req, res) => {
    try {
        const data = await Users.find({role:"User"});
            console.log(data);
            res.json(data);
   
    } catch (err) {
        console.error("Error retrieving users information:", err);
        res.status(500).json({ error: 'An error occurred while retrieving the users information' });
    }
};


module.exports = fetchUsersInfo;
