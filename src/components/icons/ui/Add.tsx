import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Add = ({ className, size = defaultIconProps.size, color = defaultIconProps.color }: IconProps) => {
  return (
    <svg className={className} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" fill={color}/>
    </svg>
  )
}

export default Add;