import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Home = ({ className, size = defaultIconProps.size, color = defaultIconProps.color }: IconProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 -960 960 960" >
      <path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" fill={color} />
    </svg>
  )
}

export default Home;