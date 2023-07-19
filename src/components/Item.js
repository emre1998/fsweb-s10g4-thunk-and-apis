import React from "react";

function Item({ data }) {
  return (
    <div className="shadow-md bg-white text-center flex flex-col ">
      <h1 className="text-2xl bg-slate-100  ">TODAY'S ACTIVITY</h1>

      <div className="text-left">
        <h2 className="font-mono text-m text-blue-700 mb-1">
          Activity: {data.activity}
        </h2>
        <h2 className="font-mono text-m text-blue-700 mb-1">
          Type: {data.type}
        </h2>
        <h2 className="font-mono text-m text-blue-700 mb-1">
          Participants: {data.participants}
        </h2>
        <h2 className="font-mono text-m text-blue-700 mb-1">
          Price: {data.price}
        </h2>
        <h2 className="font-mono text-m text-blue-700 mb-1">
          Accessibility: {data.accessibility}
        </h2>
      </div>
    </div>
  );
}

export default Item;
