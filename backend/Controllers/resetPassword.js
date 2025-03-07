const Signup = require("../models/SignupModel.js");
const resetPassword = async (req, res) => { 
    const {newPassword, confirmNewPassword} = req.body;
    const { password, token } = req.body;
    try {
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await Signup.findOne({ email: decoded.email, resetToken: token });
        if (!user || user.resetTokenExpiration < Date.now()) {
            return res.status(400).json({ message: 'Token is invalid or has expired' });
          }
          else{
            if(!newPassword || !confirmNewPassword)
                {
                    res.status(400).json({message: "Please enter all fields"});
                }
                if(newPassword !== confirmNewPassword)
                {
                    res.status(400).json({message: "Passwords do not match"});
                }
                else{
                    const newPassword=bcrypt.hash(password,10);
                    user.password=newPassword;
                    user.resetToken=null;
                    user.resetTokenExpiration=null;
                    await user.save();
                    res.status(200).json({message: "Password reset successful"});
                }
          }
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
    
}
module.exports=resetPassword;