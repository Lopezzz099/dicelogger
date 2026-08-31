import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Wand = ({
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
          d="M6.5 22.75L22.75 6.5L19.5 3.25L3.25 19.5L6.5 22.75Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.25 6.5L19.5 9.75"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.74967 3.25C9.74967 3.82464 9.97795 4.37574 10.3843 4.78206C10.7906 5.18839 11.3417 5.41667 11.9163 5.41667C11.3417 5.41667 10.7906 5.64494 10.3843 6.05127C9.97795 6.4576 9.74967 7.0087 9.74967 7.58333C9.74967 7.0087 9.5214 6.4576 9.11507 6.05127C8.70874 5.64494 8.15764 5.41667 7.58301 5.41667C8.15764 5.41667 8.70874 5.18839 9.11507 4.78206C9.5214 4.37574 9.74967 3.82464 9.74967 3.25Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.5837 14.0833C20.5837 14.6579 20.8119 15.209 21.2183 15.6153C21.6246 16.0216 22.1757 16.2499 22.7503 16.2499C22.1757 16.2499 21.6246 16.4782 21.2183 16.8845C20.8119 17.2908 20.5837 17.8419 20.5837 18.4166C20.5837 17.8419 20.3554 17.2908 19.9491 16.8845C19.5427 16.4782 18.9916 16.2499 18.417 16.2499C18.9916 16.2499 19.5427 16.0216 19.9491 15.6153C20.3554 15.209 20.5837 14.6579 20.5837 14.0833Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Wand;
