import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Up = ({ className, size = defaultIconProps.size, color = defaultIconProps.color }: IconProps) => {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M59.0333 42.9666L54.3 47.6999L32.3667 25.7666L10.4333 47.7L5.70001 42.9666L32.3667 16.2999L59.0333 42.9666Z" fill={color} />
    </svg>
  )
}

export default Up;