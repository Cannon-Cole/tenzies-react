import "./App.css";
import Die from "./components/Die";
import React from "react";

function App() {
  const [random_numbers, set_random_numbers] = React.useState(new_dice());

  function roll_dice() {
    set_random_numbers(new_dice());
  }

  function new_dice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return newDice;
  }

  return (
    <main>
      <div className="die-grid">
        {random_numbers.map((x) => (
          <Die value={x.value} />
        ))}
      </div>
      <button className="roll-button" type="button" onClick={roll_dice}>
        Roll
      </button>
    </main>
  );
}

export default App;
