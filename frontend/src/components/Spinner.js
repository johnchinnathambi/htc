export const Spinner = (props) => {
  const { height = "1", stroke = "bg-blue-500" } = props;
  return (
    <div className="absolute w-full top-0 left-0 z-[999]">
      <div className={`h-${height} w-full bg-blue-100 overflow-hidden`}>
        <span className="sr-only">Loading...</span>
        <div
          className={`animate-progress w-full h-full origin-left-right ${stroke}`}
        ></div>
      </div>
    </div>
  );
};