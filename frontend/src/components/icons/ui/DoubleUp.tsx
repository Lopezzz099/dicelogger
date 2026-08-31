
import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const DoubleUp = ({ className, size = defaultIconProps.size, color = defaultIconProps.color }: IconProps) => {
  return (
    <svg className={className} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="150 -800 650 650">
      <path d="m296-224-56-56 240-240 240 240-56 56-184-183-184 183Zm0-240-56-56 240-240 240 240-56 56-184-183-184 183Z" fill={color} />
    </svg>
  )
}

export default DoubleUp;