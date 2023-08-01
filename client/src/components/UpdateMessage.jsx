import React, { useEffect } from "react";

const UpdateMessage = ({ message, onHide }) => {
  // Automatically hide the message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onHide]);

  return (
    <div className="mt-2 text-green-600 font-bold">{message}</div>
  );
};

export default UpdateMessage;
