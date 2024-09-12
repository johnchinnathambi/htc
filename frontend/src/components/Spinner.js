export const Spinner = (props) => {
  const { height = "1", color = "blue" } = props;
  return (
    <div className="w-full">
      <div className={`h-${height} w-full bg-${color}-100 overflow-hidden`}>
        <span className="sr-only">Loading...</span>
        <div
          className={`animate-progress w-full h-full origin-left-right bg-${color}-500`}
        ></div>
      </div>
    </div>
  );
};