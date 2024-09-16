import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

export const Candidate = () => {
  const timer = 30;
  const [timeLeft, setTimeLeft] = useState(timer);
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false)
  const [wrongCount, setWrongCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const getQuestions = () => {
    axios.get("http://localhost:2000/api/getquestions").then((res) => {
      const sorted = res.data.sort((a, b) => b.difficulty - a.difficulty);
      setQuestions(sorted);
      const middle = sorted.length % 2 === 0 ? Math.floor(sorted.length / 2) -1 : Math.floor(sorted.length / 2);
      setCurrentIndex(middle);
    });
  }
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    getQuestions();
  },[])

  useEffect(() => {
    if (start) {
      setTimeLeft(timer);
    }
  }, [start]);

  useEffect(() => {
    if (completed) {
        setStart(false);
        setCompleted(false)
      }
    let time;
    if (start && timeLeft > 0) {
      time = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } 
    else if (timeLeft === 0) {
      handleTimerExpiry();
    }

    return () => clearInterval(time);
  }, [start, timeLeft, completed]);


  const handleTimerExpiry = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setWrongCount(wrongCount+1);
      setTimeLeft(timer);
    } else {
      console.log("No more questions left");
      setStart(false);
      const middle = questions.length % 2 === 0 ? Math.floor(questions.length / 2) -1 : Math.floor(questions.length / 2);
      setCurrentIndex(middle);
      setCompleted(true)
    }
  };

  const checkAnswer = (value, answer) => {
    if (value === answer) {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setCorrectCount(correctCount+1);
      } else {
        setCompleted(true);
      }
    } else {
      handleTimerExpiry(); 
    }
    setTimeLeft(timer); 
  };


  return (
    <div className='m-auto w-10/12 mt-10 rounded-md h-[75%] bg-gray-100 '>
        <h2 className=' text-sm p-2 text-gray-500'>You have 30 seconds to answer each question, when the timer runs out, you will go down a level of difficulty.</h2>
        <div className='w-full p-2 flex gap-2'>
            {!start ? (
          <button onClick={() => setStart(true)} className='tracking-tight bg-green-400 hover:bg-green-500 transition-all px-4 p-2 rounded-md text-green-700 font-semibold'>Begin Questions</button>
            ) :
            <div>
                <h2 className='text-gray-500 text-sm'>Question {currentIndex+1} out of {questions.length}</h2>
                <h1 className='text-sm font-bold'>
                    You have {timeLeft} seconds left.
                </h1>
                <div className='w-full mt-4 m-auto'>
                    {currentQuestion &&
                    <div>
                    <h1 className='text-3xl mb-2'>{currentQuestion.question}</h1>
                    <div className='flex flex-col gap-2'>
                        <button onClick={() => checkAnswer(currentQuestion.answerA, currentQuestion.correctAnswer)} className='w-full p-2 bg-gray-50'>Choice A: <b>{currentQuestion.answerA}</b></button>
                        <button onClick={() => checkAnswer(currentQuestion.answerB, currentQuestion.correctAnswer)} className='w-full p-2 bg-gray-50'>Choice A: <b>{currentQuestion.answerB}</b></button>
                        <button onClick={() => checkAnswer(currentQuestion.answerC, currentQuestion.correctAnswer)} className='w-full p-2 bg-gray-50'>Choice A: <b>{currentQuestion.answerC}</b></button>
                        <button onClick={() => checkAnswer(currentQuestion.answerD, currentQuestion.correctAnswer)} className='w-full p-2 bg-gray-50'>Choice A: <b>{currentQuestion.answerD}</b></button>
                    </div>
                    </div>
                    }
                </div>
            </div>
            }
        </div>
      </div>
  )
}
