import { useEffect, useState } from "react";

const Message = ({ variant, children }) => {
  const [alert, setAlert] = useState(true);
  const color = {
    danger: "red",
    success: "green",
    warning: "yellow",
    info: "sky",
  };
  const icon = {
    danger: 'error',
    success: 'check_circle',
    warning: 'warning',
    info: 'info',
  };
  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [alert]);

  return (
    alert && (
      <div className={`fixed top-0 right-0 ${variant}`} role="alert">
        <div
          className={`flex items-center w-full max-w-xs p-4 text-gray-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 bg-${color[variant]}-100`}
          role="alert"
        >
          <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${color[variant]}-500 bg-blue-100 rounded-lg`}>
            <span className="material-symbols-rounded">{icon[variant]}</span>
          </div>
          <div className="ms-3 text-gray-800 text-sm font-normal">
            {children}
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
      </div>
    )
  );
};

export default Message;
