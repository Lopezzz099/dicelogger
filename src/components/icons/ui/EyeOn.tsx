import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const EyeOn = ({ className, size = defaultIconProps.size, color = defaultIconProps.color }: IconProps) => {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22.5" cy="22.5" r="7.5" fill={color} />
      <path d="M39.375 22.5C39.375 22.5 37.5 7.5 22.5 7.5C7.5 7.5 5.625 22.5 5.625 22.5" stroke={color} stroke-width="2" />
    </svg>
  )
}

export default EyeOn;