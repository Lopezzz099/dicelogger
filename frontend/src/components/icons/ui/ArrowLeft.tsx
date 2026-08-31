import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const ArrowLeft = ({
  className,
  size = defaultIconProps.size,
  color = defaultIconProps.color,
}: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.7375 13.5L14.1375 21.9L12 24L0 12L12 0L14.1375 2.1L5.7375 10.5H24V13.5H5.7375Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowLeft;
