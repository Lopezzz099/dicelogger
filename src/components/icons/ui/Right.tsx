import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Right = ({ className, size = defaultIconProps.size, color = defaultIconProps.color }: IconProps) => {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.7333 58.6666L16 53.9332L37.9333 31.9999L16 10.0666L20.7333 5.33325L47.4 31.9999L20.7333 58.6666Z" fill={color}/>
    </svg>
  )
}

export default Right;