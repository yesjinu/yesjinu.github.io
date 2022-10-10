import * as React from "react"

const Grid = (props) => {
  const { children, className } = props;
  
  return (
    <div
      className={`mx-auto grid max-w-screen-md grid-flow-row grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 md:px-10 lg:grid-cols-3 ${className}`}
    >
      {children}
    </div>
  );
};

export default Grid;
