import { useState } from "react";
import styles from "./Input.module.css";
import Down from "@/components/icons/ui/Down";
import Up from "@/components/icons/ui/Up";

export type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export type SelectProps = {
  className?: string;
  placeholder?: string;
  value?: string;
  maxHeigth?: string;
  onChange: (v: string) => void;
  options: Option[];
}

const Select = (props: SelectProps) => {

  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  const handleSelect = (value: string) => {
    props.onChange(value);
    setShow(false);
  }

  const className = props.className ? ` ${props.className}` : '';
  return (
    <span className={styles.input + className}>
      <button onClick={handleClick} type='button'>
        <span className={(props.value ? '' : styles.placeholder)}>
          {props.value ? (
            props.value
          ) : (
            props.placeholder ? (
              props.placeholder
            ) : (
              "Selecciona una opción"
            )
          )}
        </span>
        { show ? (
          <Up size={'1em'} />
        ):(
          <Down size={'1em'} />
        )}
      </button>
      <div style={{maxHeight: props.maxHeigth ? props.maxHeigth : '16rem'}} className={styles.selectPopup + (show ? '' : ' ' + styles.hide)}>
        { props.options.length > 0 ? (
          props.options?.map((option, i) => (
            <>
              <button type='button' key={i} onClick={() => handleSelect(option.value)}>
                {option.icon}
                <span>{option.label}</span>
              </button>
              { i < props.options.length - 1 && ( 
                <hr />
              )}
            </>
          ))
        ) : (
          <span className={styles.placeholder}>No hay opciones</span>
        )}
      </div>
    </span>
  )
}

export default Select;