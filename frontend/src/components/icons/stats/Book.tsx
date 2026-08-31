import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Book = ({
  className,
  size = defaultIconProps.size,
  color = defaultIconProps.color,
}: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M3.25 20.5834C4.73219 19.7276 6.41352 19.2771 8.125 19.2771C9.83648 19.2771 11.5178 19.7276 13 20.5834C14.4822 19.7276 16.1635 19.2771 17.875 19.2771C19.5865 19.2771 21.2678 19.7276 22.75 20.5834"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.25 6.49998C4.73219 5.64424 6.41352 5.19373 8.125 5.19373C9.83648 5.19373 11.5178 5.64424 13 6.49998C14.4822 5.64424 16.1635 5.19373 17.875 5.19373C19.5865 5.19373 21.2678 5.64424 22.75 6.49998"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.25 6.5V20.5833"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 6.5V20.5833"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.75 6.5V20.5833"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Book;
