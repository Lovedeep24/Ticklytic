const Signup = require("../models/SignupModel.js");
const transporter=require("../sendEmail.js");
const forgotPassword = async (req, res) => {
    const email = req.body.email;
    try {
        if(!email)
            {
                res.status(400).json({message: "Please enter email"});
            }
            console.log(email);
            const user=await Signup.findOne({email});
            if(!user){
                return res.status(404).json({message: "No User found with this email"});
            }
            else{
                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
                await user.save();
        
                const resetLink = `http://localhost:9000/reset-password/${token}`;
                await transporter.sendMail({
                  to: user.email,
                  subject: 'Password Reset',
                  html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
                });
            
                res.status(200).json({ message: 'Reset email sent' });
            
            }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    
}
module.exports=forgotPassword;