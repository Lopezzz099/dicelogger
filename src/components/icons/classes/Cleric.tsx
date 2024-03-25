import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Cleric = ({
  className,
  size = defaultIconProps.size,
  color = defaultIconProps.color,
}: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M92.4605 7.01123L78.439 24.3712L86.8627 29.6362L100.7 12.5045L92.461 7.01123H92.4605ZM48.66 11.0662H48.6605L43.1575 19.32L103.34 56.9337L108.842 48.68L90.39 37.147L48.66 11.0662ZM101.75 23.2107V18.0807L90.25 31.494L93.4717 33.5647L101.75 23.2107ZM42.25 24.0592V30.7527L59.0293 41.2397L62.6217 36.7917L42.25 24.0592ZM66.4658 39.1942L11.3 107.496L19.5395 112.989L74.89 44.4595L66.4658 39.1945V39.1942ZM80.5383 47.9892V54.6827L101.75 67.9407V61.2472L80.538 47.9897L80.5383 47.9892ZM76 51.1535L22.212 117.595V122.21L76 56V51.1535ZM109.75 55.4315L106.25 60.6815V64.569L109.75 59.319V55.4315ZM10.25 112.204V118.775L17.75 123.619V117.204L10.25 112.204Z"
        fill={color}
      />
    </svg>
  );
};

export default Cleric;
