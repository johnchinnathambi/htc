import { useEffect, useState } from "react";

const Message = ({ variant, children }) => {
  const [alert, setAlert] = useState(true);
  const variantClasses = {
    danger: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
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
      <div className="fixed top-0 right-0" role="alert">
        <div
          className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${variantClasses[variant]}`}
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <span className="material-symbols-rounded">warning</span>
            <span className="sr-only">Alert</span>
          </div>
          <div className="ms-3 text-sm font-normal">{children}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-default"
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
