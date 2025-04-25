const Signup=require("../models/SignupModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { toast } = require("sonner");

//LOGIN
const login=async(req,res)=>{
    const {email,password,role}=req.body;

    if(!email || !password)
        {
            res.status(300).json("No email or password");
        }

    try 
    {
        const User=await Signup.findOne({email});

        if(!User)
            {
                res.status(403).json("Do not Exist");
            }
        else
            {
                if(await bcrypt.compare(password,User.password))
                    {
                        if(User.role!==role)
                        {
                            res.status(401).json("Not allowed");
                        }
                        const accessToken=jwt.sign({
                        user: 
                            {
                                username : User.name,
                                id:User.id,
                                email : User.email,
                                role:User.role,
                            }
                        },process.env.JWT_SECRET,
                        {expiresIn:"1hr"})
                        res.status(200).json({accessToken, userId:User.id});
                    }
                else
                    {
                        res.status(400).json("wrong password");
                    }
            }
    } 
    catch (error) 
        {
            res.status(404);
        }
};


const signup=async(req,res)=>{
    const {name,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    // console.log(hashedPassoword);
    if(!name || !email || !password )
    {
       return res.status(404).json("All fields are mandatory");
    }

    try 
    {
        const existingUser=await Signup.findOne({email});
        if(existingUser)
            {
          
                res.status(400).json("User already exist");
            
            }
        else
            {
               await Signup.create({
                    name,
                    email,
                    password:hashedPassword,
                   });      
               res.status(200).json("user has been created successfully");
               toast.success("Account created successfully");
            }
    } 
    catch (error) 
    {
        toast.error("Something went wrong. Please try again later.");
        res.status(500).json("Internal Server Error");
    }
   
    }
module.exports={login,signup}