import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Minus = ({
  className,
  size = defaultIconProps.size,
  color = defaultIconProps.color,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth="2"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill={"none"} />
      <path d="M5 12l14 0" />
    </svg>
  );
};

export default Minus;


/*
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
*/