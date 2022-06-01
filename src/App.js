import "./App.css";
import Die from "./components/Die";
import React from "react";

function App() {
  const [random_numbers, set_random_numbers] = React.useState(
    random_ten_numbers()
  );

  function random_ten_numbers() {
    let random_array = [];
    for (let i = 0; i < 10; i++) {
      random_array.push(Math.floor(Math.random() * 6) + 1);
    }
    return random_array;
  }

  function roll_dice() {
    set_random_numbers(random_ten_numbers());
  }
  return (
    <main>
      <div className="die-grid">
        {random_numbers.map((x) => (
          <Die value={x} />
        ))}
      </div>
      <button className="roll-button" type="button" onClick={roll_dice}>
        Roll
      </button>
    </main>
  );
}

export default App;
