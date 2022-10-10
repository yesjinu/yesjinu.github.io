import * as React from "react";

const Quotes = () => {
  const RandomQuote = () => {
    const random = Math.floor(Math.random() * 5);
    
    switch (random) {
      case 0:
        return (<>Take chances, make mistakes, get messy.</>);
      case 1:
        return (<>The future belongs to those who believe in the beauty of their dreams.</>);
      case 2:
        return (<>The future is already here — it’s just not evenly distributed.</>);
      case 3:
        return (<>The future is not a gift, it is an achievement.</>);
      case 4:
        return (<>The future is not something we enter. The future is something we create.</>);
      default:
        return (<>The future is not something we enter. The future is something we create.</>);
    }
  }
  
  return (
    <p className="text-3xl italic">
      <RandomQuote/>
    </p>
  )
};

export default Quotes;
