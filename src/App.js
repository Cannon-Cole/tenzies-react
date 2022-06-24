import "./App.css";
import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import useWindowDimensions from "./components/useWindowDimensions";
import Confetti from "react-confetti";

function App() {
  const [dice, set_dice] = React.useState(new_dice());
  const [tenzies, set_tenzies] = React.useState(false);
  const { width, height } = useWindowDimensions();

  React.useEffect(() => {
    let won = true;
    dice.forEach((die) => {
      if (die.value != dice[0].value || die.isHeld == false) {
        won = false;
      }
    });
    if (won) {
      set_tenzies(true);
      console.log("You won!");
    } else {
      set_tenzies(false);
    }
  }, [dice]);

  function roll_dice() {
    if (tenzies) {
      set_tenzies(false);
      set_dice(new_dice());
    } else {
      set_dice((ran_nums) => {
        return ran_nums.map((item) => {
          if (!item.isHeld) {
            return { ...item, value: Math.ceil(Math.random() * 6) };
          } else {
            return item;
          }
        });
      });
    }
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
    set_dice((ran_nums) => {
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
      {tenzies && <Confetti width={width} height={height} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-grid">
        {dice.map((x) => (
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
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
