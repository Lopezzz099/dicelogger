import React, { useState, ReactNode } from "react";
import styles from "./Accordion.module.css";
import Up from "@/components/icons/ui/Up";
import Down from "@/components/icons/ui/Down";

interface AccordionProps {
  maxCharacters: number;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ maxCharacters, children }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!isExpanded);
  };

  const paragraphContent = React.Children.only(children) as React.ReactElement;
  const contentText = paragraphContent.props.children as string;

  const isContentTooLong =
    typeof contentText === "string" && contentText.length > maxCharacters;

    const lines = typeof children === 'string' ? children.split('\n') : [children];

  return (
    <div className={styles.accordionContainer}>
      <div
        className={styles.content}
        style={{ maxHeight: isExpanded ? "none" : "100px" }}
      >
        {children}
      </div>
      {isContentTooLong && (
        <>
          <div className={styles.buttonContainer}>
            {!isExpanded ? (
              <button className={styles.button} onClick={toggleAccordion}>
                <Down size={30} />
              </button>
            ) : (
              <button className={styles.button} onClick={toggleAccordion}>
                <Up size={30} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Accordion;
