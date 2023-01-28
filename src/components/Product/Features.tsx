import React from "react";
import styles from "./Features.module.css";
import { ProductCharacteristic } from "@/interfaces/index";

interface IFeature {
  data: ProductCharacteristic[];
}

const Features = ({ data }: IFeature) => (
  <div className={styles.feature}>
    {data.map(({ name, value }: ProductCharacteristic) => (
      <div className={styles.characteristics} key={name}>
        <span className={styles.characteristicsName}>{name}</span>
        <span className={styles.characteristicsDots}></span>
        <span className={styles.characteristicsValue}>{value}</span>
      </div>
    ))}
  </div>
);

export default Features;
