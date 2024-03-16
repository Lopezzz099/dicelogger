import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Sword = ({ className, size = defaultIconProps.size, color = defaultIconProps.color }: IconProps) => {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M21.6663 4.33337V9.75004L11.9163 17.3334L7.58301 21.6667L4.33301 18.4167L8.66634 14.0834L16.2497 4.33337H21.6663Z" stroke={ color } stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M7.04199 12.4583L13.542 18.9583" stroke={ color } stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>
  )
}

export default Sword;