const IconCheck = ({ className = "", width = 11, height = 9, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 11 9"
    className={className}
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      d="M1 4.304L3.696 7l6-6"
    />
  </svg>
);

export default IconCheck;
