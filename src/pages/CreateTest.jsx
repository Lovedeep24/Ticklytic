import React from 'react'
import { useRef ,useState} from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Step, Stepper, useStepper } from "@/components/ui/stepper";

const steps = [
  { label: "Cerate Test" },
  { label: "Add Questions" },
  { label: "Publish Test" },
] 

export default function CreateTest() {
    const [options, setOptions] = useState(['', '', '', '']);
    const [questionText, setQuestionText] = useState('');
        const [correctOption, setCorrectOption] = useState('');
  const testNameRef=useRef();
  const descriptionRef=useRef();
  const durationRef=useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (options.some(option => option.trim() === '') || questionText.trim() === '') {
      setError("All fields are mandatory");
      return;
    }
    try {
      const response = await axios.post("http://localhost:9000/insertquestions", {
        questionText,
        options,
        correctOption,
      });
      if (response.status === 201) {
        setError("New question inserted successfully");
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectOption('');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("All fields are mandatory");
        } else if (error.response.status === 400) {
          setError("Must give 4 options");
        } else if (error.response.status === 409) {
          setError("Question already exists in the database");
        } else {
          setError("Internal server error");
        }
      } else {
        setError("Network error");
      }
    }
  };

  const handleCreation = async () => {
      const testName = testNameRef.current.value;
      const description = descriptionRef.current.value;
      const duration = duration.current.value;
      if(!testName || !description || !duration)
      { 
        alert("All fields are mandatory");
        return;
      }
      try {
          const response = await axios.post("http://localhost:9000/createTest", {
              testName,
              description,
              duration,
          }); 
          if (response.status === 200) {
              console.log('Test created successfully');
              testNameRef.current.value = '';
              descriptionRef.current.value = '';
              durationRef.current.value = '';
              alert('Test created successfully');
          }
          else if(response.status === 401){
              alert('Please provide a test name and description');
          }
      } catch (error) {
          console.error(error);
          alert('Test creation failed');
      }
  }
  function Footer() {
    const {
      nextStep,
      prevStep,
      resetSteps,
      hasCompletedAllSteps,
      isLastStep,
      isOptionalStep,
      isDisabledStep,
    } = useStepper();
                                    
    return (
      <>
        {hasCompletedAllSteps && (
          <div className="bg-secondary text-primary my-2 flex h-40 items-center justify-center rounded-md border">
            <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
          </div>
        )}
        <div className="flex w-full justify-end gap-2">
          {hasCompletedAllSteps ? (
            <Button size="sm" onClick={resetSteps}>
              Reset
            </Button>
          ) : (
            <>
              <Button
                disabled={isDisabledStep}
                onClick={prevStep}
                size="sm"
                variant="secondary"
              >
                Prev
              </Button>
              <Button size="sm" onClick={nextStep}>
                {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
              </Button>
            </>
          )}
        </div>
      </>
    );
  }
  
  return (
    <>
    <div className="h-screen p-5 font-sans bg-gray-100 ">
      <div className='NAV'>
         <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              <div className="bg-secondary text-primary my-2 flex h-40 items-center justify-center rounded-md border">
                <h1 className="text-xl">
                  Step
                  {index + 1}
                </h1>
              </div>
            </Step>
          );
        })}
        <Footer />
      </Stepper>
    </div>
      </div>
      <div className="body">
        
      </div>
      {/* <div>
      <Button variant="outline" aria-label="Open account menu">
          <CircleUserRound  size={20} strokeWidth={2} aria-hidden="true" />
        </Button>
      </div>

       <div className='testBox'>
           <label>Test Name</label>
           <input type='text' placeholder='Test Name' ref={testNameRef} />
           <label>Description</label>
           <input type='text' placeholder='Description' ref={descriptionRef} />
           <label>Duration</label>
           <input type='number' placeholder='Duration' ref={durationRef} />
       </div>
       <div className=" border-2">
     <button onClick={handleCreation} className="h-20 w-40 p-3 m-2 border-none rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-700 focus:outline-none">Create Test</button>
   </div>
   </div>

   <div>
   <form onSubmit={handleSubmit}>
        <input
        className="w-full p-2 my-2 rounded-md text-base border border-gray-300"
          type="text"
          placeholder="Enter Question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        {options.map((option, index) => (
          <input
          className="w-full p-2 my-2 rounded-md text-base border border-gray-300"
            key={index}
            type="text"
            placeholder={`Enter Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <div>
          <label htmlFor="correctOption">Correct Option Index (0-3): </label>
          <input
            type="number"
            id="correctOption"
            value={correctOption}
            onChange={(e) => setCorrectOption(Number(e.target.value))}
            min="0"
            max="3"
          />
        </div>
        <button className="px-4 py-2 rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-600" type="submit">Submit</button>
      </form> */}
   </div>

   
   </>
  
  )
}
