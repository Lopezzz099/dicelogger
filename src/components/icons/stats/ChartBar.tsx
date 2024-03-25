import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const ChartBar = ({
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
          d="M3.25 14.0833C3.25 13.796 3.36414 13.5205 3.5673 13.3173C3.77047 13.1141 4.04602 13 4.33333 13H8.66667C8.95398 13 9.22953 13.1141 9.4327 13.3173C9.63586 13.5205 9.75 13.796 9.75 14.0833V20.5833C9.75 20.8707 9.63586 21.1462 9.4327 21.3494C9.22953 21.5525 8.95398 21.6667 8.66667 21.6667H4.33333C4.04602 21.6667 3.77047 21.5525 3.5673 21.3494C3.36414 21.1462 3.25 20.8707 3.25 20.5833V14.0833Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.75 9.74996C9.75 9.46264 9.86414 9.18709 10.0673 8.98393C10.2705 8.78076 10.546 8.66663 10.8333 8.66663H15.1667C15.454 8.66663 15.7295 8.78076 15.9327 8.98393C16.1359 9.18709 16.25 9.46264 16.25 9.74996V20.5833C16.25 20.8706 16.1359 21.1462 15.9327 21.3493C15.7295 21.5525 15.454 21.6666 15.1667 21.6666H10.8333C10.546 21.6666 10.2705 21.5525 10.0673 21.3493C9.86414 21.1462 9.75 20.8706 9.75 20.5833V9.74996Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.25 5.41671C16.25 5.12939 16.3641 4.85384 16.5673 4.65068C16.7705 4.44751 17.046 4.33337 17.3333 4.33337H21.6667C21.954 4.33337 22.2295 4.44751 22.4327 4.65068C22.6359 4.85384 22.75 5.12939 22.75 5.41671V20.5834C22.75 20.8707 22.6359 21.1462 22.4327 21.3494C22.2295 21.5526 21.954 21.6667 21.6667 21.6667H17.3333C17.046 21.6667 16.7705 21.5526 16.5673 21.3494C16.3641 21.1462 16.25 20.8707 16.25 20.5834V5.41671Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.33301 21.6667H19.4997"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default ChartBar;
