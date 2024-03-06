'use client'

import React, { useState } from "react";
import styles from "./Input.module.css";
import Down from "@/components/icons/ui/Down";
import Up from "@/components/icons/ui/Up";
import Close from "@/components/icons/ui/Close";

export type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export type MultiSelectProps = {
  showValue?: boolean;
  className?: string;
  placeholder?: string;
  maxHeigth?: string;
  onChange: (v: string) => void;
  selectedOptions: string[];
  options: Option[];
}

const MultiSelect = (props: MultiSelectProps) => {

  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  const handleSelect = (value: string) => {
    props.onChange(value);
    // setShow(false);
  }

  const handleDeSelect = (e: React.MouseEvent<HTMLButtonElement>, option: string) => {
    e.stopPropagation();
    props.onChange(option);
  }

  const selectedOptions = props.selectedOptions.map((option, i) => (
    <button key={i} onClick={(e) => handleDeSelect(e, option)} type="button">
      { props.showValue ? (
        option
      ) : (
        props.options.find(opt => opt.value === option)?.label
      ) }
      <Close />
    </button>
  ))

  const filteredOptions = props.options.filter(option => !props.selectedOptions.includes(option.value))

  const className = props.className ? ` ${props.className}` : '';
  return (
    <span className={styles.input + className}>
      <button className={styles.select}  onClick={handleClick} type='button'>
        <div className={styles.options + ' ' + (props.selectedOptions.length > 0 ? '' : styles.placeholder)}>
          {props.selectedOptions.length > 0 ? (
            selectedOptions
          ) : (
            props.placeholder ? (
              props.placeholder
            ) : (
              "Selecciona opciones"
            )
          )}
        </div>
        {show ? (
          <Up className={styles.icon} size={'1em'} />
        ) : (
          <Down className={styles.icon} size={'1em'} />
        )}
      </button>
      <div style={{ maxHeight: props.maxHeigth ? props.maxHeigth : '16rem' }} className={styles.selectPopup + (show ? '' : ' ' + styles.hide)}>
        { filteredOptions.length > 0 ? (
          filteredOptions.map((option, i) => (
            <React.Fragment key={i}>
              <button type='button' onClick={() => handleSelect(option.value)}>
                {option.icon}
                <span>{option.label}</span>
              </button>
              {i < filteredOptions.length - 1 && (
                <hr />
              )}
            </React.Fragment>
          ))
        ) : (
          <span className={styles.placeholder}>No quedan opciones</span>
        )}
      </div>
    </span>
  )
}

export default MultiSelect;