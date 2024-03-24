import { IconProps } from "../types";
import defaultIconProps from "../defaultIconProps";

const Rogue = ({
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
        d="M5.89036 18.8198C4.42711 44.8816 20.6346 51.9211 45.4684 49.6718C39.6134 33.8673 27.9639 22.4213 5.89036 18.8198ZM124.547 18.8198C102.473 22.4211 90.8231 33.8673 84.9684 49.6716C109.802 51.9208 126.009 44.8813 124.547 18.8198ZM13.7571 70.8823C18.8261 79.8586 23.9046 87.5138 28.9841 93.8513C53.1791 100.906 77.5991 100.472 102.336 93.5233C107.18 87.2376 111.983 79.6903 116.734 70.8826C86.3191 97.9626 45.2034 96.7468 13.7574 70.8826L13.7571 70.8823ZM97.3514 99.5473C76.2019 104.584 55.1646 104.956 34.2964 100C55.5729 122.713 76.8146 122.384 97.3514 99.5471V99.5473Z"
        fill={color}
      />
    </svg>
  );
};

export default Rogue;
