import styles from "../styles/components/Toggle.module.css";
import { useEffect, useState } from "react";

interface ToggleProps {
  item1: string;
  item2: string;
  onToggle: (item: number) => void;
  selected: 1 | 2;
}

export default function Toggle({ item1, item2, onToggle }: ToggleProps) {
  const [selectedItem, setSelectedItem] = useState(1);
  const [toggleItem1, setToggleItem1] = useState<HTMLElement | null>(null);
  const [toggleItem2, setToggleItem2] = useState<HTMLElement | null>(null);
  const [slider, setSlider] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setToggleItem1(document.getElementById("item1"));
    setToggleItem2(document.getElementById("item2"));
    setSlider(document.getElementById("slider"));
  }, []);

  const addActiveTo = (item: string) => {
    if (item === item1) {
      if (slider) slider.style.transform = "translateX(0)";
    } else {
      if (slider) slider.style.transform = "translateX(100%)";
    }
  };

  const handleToggle = () => {
    if (selectedItem === 1) {
      setSelectedItem(2);
      onToggle(2);
      addActiveTo(item2);
    } else {
      setSelectedItem(1);
      onToggle(1);
      addActiveTo(item1);
    }
  };

  return (
    <div className={styles.toggleBar} onClick={handleToggle}>
      <div className={`${styles.toggle} ${styles.active}`} id="item1">
        <p>{item1}</p>
      </div>
      <div className={styles.slider} id="slider" />
      <div className={styles.toggle} id="item2">
        <p>{item2}</p>
      </div>
    </div>
  );
}
