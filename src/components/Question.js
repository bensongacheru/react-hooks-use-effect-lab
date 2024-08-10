import React, { useState, useEffect } from 'react';

const Question = ({ question, onAnswered }) => {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Callback function to be called after timeout
    const timerCallback = () => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          onAnswered(false);
          return 10; // Reset to 10 seconds
        } else {
          return prevTime - 1;
        }
      });
    };

    // Set up the timeout
    const timeoutId = setTimeout(timerCallback, 1000);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeRemaining, onAnswered]); // Dependencies array

  return (
    <div>
      <h1>{question.prompt}</h1>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <p>{timeRemaining} seconds remaining</p>
    </div>
  );
};

export default Question;
