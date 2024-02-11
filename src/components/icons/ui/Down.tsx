import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Down = ({ className, size = defaultIconProps.size, color = defaultIconProps.color }: IconProps) => {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.70001 21.0334L10.4333 16.3L32.3667 38.2334L54.3 16.3L59.0333 21.0334L32.3667 47.7L5.70001 21.0334Z" fill={color} />
    </svg>
  )
}

export default Down;