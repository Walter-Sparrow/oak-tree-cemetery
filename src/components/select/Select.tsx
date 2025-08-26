import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./select.module.scss";
import classNames from "classnames";
import Arrow from "@/assets/svg/arrow.svg?react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  multiple?: boolean;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
  classNameDropdown?: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      multiple = false,
      placeholder = "Select...",
      className,
      classNameInput,
      classNameDropdown,
      value,
      onChange,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>(
      Array.isArray(value) ? value : value ? [value] : []
    );
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
      let newSelected: string[];
      if (multiple) {
        if (selected.includes(optionValue)) {
          newSelected = selected.filter((v) => v !== optionValue);
        } else {
          newSelected = [...selected, optionValue];
        }
      } else {
        newSelected = [optionValue];
        setIsOpen(false);
      }
      setSelected(newSelected);
      onChange?.(multiple ? newSelected : newSelected[0]);
    };

    const displayValue = multiple
      ? selected
          .map((v) => options.find((o) => o.value === v)?.label)
          .join(", ")
      : options.find((o) => o.value === selected[0])?.label || "";

    return (
      <div
        className={classNames(styles.select, className, {
          [styles["select--open"]]: isOpen,
        })}
        ref={(node) => {
          containerRef.current = node;
          if (ref) {
            if (typeof ref === "function") ref(node);
            else ref.current = node;
          }
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={classNames(styles.select__display, classNameInput)}>
          {displayValue || placeholder}
          <Arrow
            className={classNames(styles.select__arrow, {
              [styles["select__arrow--open"]]: isOpen,
            })}
          />
        </div>
        {isOpen && (
          <div
            className={classNames(styles.select__dropdown, classNameDropdown)}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={classNames(styles.select__option, {
                  [styles["select__option--selected"]]: selected.includes(
                    option.value as string
                  ),
                  [styles["select__option--multiple"]]: multiple,
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option.value as string);
                }}
              >
                {multiple && (
                  <input
                    type="checkbox"
                    className={styles.select__checkbox}
                    checked={selected.includes(option.value as string)}
                    readOnly
                  />
                )}
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
