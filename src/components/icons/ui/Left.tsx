import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Left = ({ className, size = defaultIconProps.size, color = defaultIconProps.color }: IconProps) => {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M42.2667 5.33317L47 10.0665L25.0667 31.9998L47 53.9332L42.2667 58.6665L15.6 31.9998L42.2667 5.33317Z" fill={color}/>
    </svg>
  )
}

export default Left;