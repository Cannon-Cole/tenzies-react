import "./App.css";
import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";

function App() {
  const [random_numbers, set_random_numbers] = React.useState(new_dice());

  function roll_dice() {
    set_random_numbers((ran_nums) => {
      return ran_nums.map((item) => {
        if (!item.isHeld) {
          return { ...item, value: Math.ceil(Math.random() * 6) };
        } else {
          return item;
        }
      });
    });
  }

  function new_dice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function die_click(die) {
    set_random_numbers((ran_nums) => {
      return ran_nums.map((item) => {
        if (die === item.id) {
          return { ...item, isHeld: !item.isHeld };
        } else {
          return item;
        }
      });
    });
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-grid">
        {random_numbers.map((x) => (
          <Die
            key={x.id}
            value={x.value}
            isHeld={x.isHeld}
            die_click={die_click}
            id={x.id}
          />
        ))}
      </div>
      <button className="roll-button" type="button" onClick={roll_dice}>
        Roll
      </button>
    </main>
  );
}

export default App;
