
import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Done = ({ className, size = defaultIconProps.size, color = defaultIconProps.color }: IconProps) => {
  return (
    <svg className={className} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" fill={color}/>
    </svg>
  )
}

export default Done;