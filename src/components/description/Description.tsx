import { Fragment } from "react/jsx-runtime";
import styles from "./description.module.scss";

interface DescriptionItem {
  label: string;
  value: string | string[];
}

interface DescriptionProps {
  items: DescriptionItem[];
}

export function Description({ items }: DescriptionProps) {
  return (
    <div className={styles.description}>
      {items.map((item) => (
        <div key={item.label} className={styles.description__item}>
          <span className={styles.description__label}>{item.label}:</span>
          {!Array.isArray(item.value) ? (
            <span className={styles.description__value}>{item.value}</span>
          ) : (
            <div className={styles.description__values}>
              {item.value.map((value, i) => (
                <Fragment key={value}>
                  <span key={value} className={styles.description__value}>
                    {value}
                  </span>
                  {i !== item.value.length - 1 && (
                    <span className={styles.description__divider}>/</span>
                  )}
                </Fragment>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
