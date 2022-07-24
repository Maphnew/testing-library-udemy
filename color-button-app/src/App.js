import "./App.css";
import { useState } from "react";

export const replaceCamelWithSpaces = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
};

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const [disabled, setDisabled] = useState(false);
  const newButtonColor = buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";
  const handleClickButton = () => {
    setButtonColor(newButtonColor);
  };
  const handleClickCheckbox = () => {
    setDisabled((disabled) => !disabled);
  };
  return (
    <div>
      <button
        disabled={disabled}
        style={{ backgroundColor: disabled ? "gray" : buttonColor }}
        onClick={handleClickButton}
      >
        Change to {replaceCamelWithSpaces(newButtonColor)}
      </button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onClick={handleClickCheckbox}
      />
      <label htmlFor="disable-button-checkbox">Disabled button</label>
    </div>
  );
}

export default App;
