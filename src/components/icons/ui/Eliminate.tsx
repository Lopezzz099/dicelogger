import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Eliminate = ({
  className,
  size = defaultIconProps.size,
  color = defaultIconProps.color,
}: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_912_148)">
        <path
          d="M3.83398 6.24292H17.5741"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.9873 9.63501V14.7232"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.4219 9.63501V14.7232"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.69336 6.24292L5.55212 16.4192C5.55212 16.869 5.73307 17.3004 6.05517 17.6185C6.37727 17.9366 6.81412 18.1153 7.26964 18.1153H14.1397C14.5952 18.1153 15.0321 17.9366 15.3542 17.6185C15.6763 17.3004 15.8572 16.869 15.8572 16.4192L16.716 6.24292"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.12793 6.24293V3.69886C8.12793 3.47395 8.21841 3.25825 8.37945 3.09921C8.5405 2.94018 8.75893 2.85083 8.98669 2.85083H12.4217C12.6495 2.85083 12.8679 2.94018 13.029 3.09921C13.19 3.25825 13.2805 3.47395 13.2805 3.69886V6.24293"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_912_148">
          <rect
            width="20.6102"
            height="20.3526"
            fill={color}
            transform="translate(0.399414 0.306641)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Eliminate;
