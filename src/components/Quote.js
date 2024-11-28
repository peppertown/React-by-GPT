import React from "react";
import "../styles/Quote.css";

const Quote = () => {
  const quotes = [
    "Lorem ipsum dolor sit amet, consectetur",
    "Another inspirational quote here",
    "Keep moving forward!",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="quote">
      <p>{randomQuote}</p>
    </div>
  );
};

export default Quote;
