const validateQuestion = (req, res, next) => {  
    const { questionText, options, correctOption } = req.body;
    if (!questionText || !options || !correctOption) {
        return res.status(402).json({ message: 'All fields are mandatory' });
    }
    else if (options.length < 4) {
        return res.status(400).json({ message: 'Must give 4 options' });
    }
    else{
        next();
    }
  
}

module.exports=validateQuestion;