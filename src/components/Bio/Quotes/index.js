import * as React from "react";

const Quotes = () => {
  const QUOTES_LIST = [
    "The best way to predict the future is to invent it.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "The future is already here — it’s just not evenly distributed.",
    "The future is not a gift, it is an achievement.",
    "The future is not something we enter. The future is something we create.",
  ]
  
  const RandomQuote = () => {
    const random = Math.floor(Math.random() * QUOTES_LIST.length);
    return QUOTES_LIST[random];
  }
  
  return (
    <p className="text-3xl italic">
      <RandomQuote/>
    </p>
  )
};

export default Quotes;
