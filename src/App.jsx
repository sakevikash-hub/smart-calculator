import { useState } from "react";

import {
  FaCalculator,
  FaBackspace,
  FaDivide,
  FaTimes,
  FaMinus,
  FaPlus,
  FaEquals,
  FaPercentage,
  FaTrash,
  FaHistory,
  FaClock,
} from "react-icons/fa";

import "./App.css";

function App() {

  // -----------------------------
  // State
  // -----------------------------

  const [currentNumber, setCurrentNumber] = useState("");

  const [previousNumber, setPreviousNumber] = useState("");

  const [operator, setOperator] = useState("");

  const [history, setHistory] = useState([]);

  const [error, setError] = useState("");


  // -----------------------------
  // Add Number
  // -----------------------------

  const addNumber = (number) => {

    setError("");

    if (number === "." && currentNumber.includes(".")) {
      return;
    }

    if (currentNumber === "0" && number !== ".") {
      setCurrentNumber(number);
      return;
    }

    setCurrentNumber(currentNumber + number);
  };


  // -----------------------------
  // Select Operator
  // -----------------------------

  const selectOperator = (selectedOperator) => {

    setError("");

    if (currentNumber === "" && previousNumber === "") {
      return;
    }

    if (currentNumber === "" && previousNumber !== "") {
      setOperator(selectedOperator);
      return;
    }

    if (previousNumber !== "" && operator !== "") {
      calculate();
    }

    setPreviousNumber(currentNumber);

    setCurrentNumber("");

    setOperator(selectedOperator);
  };


  // -----------------------------
  // Calculate
  // -----------------------------

  const calculate = () => {

    if (
      previousNumber === "" ||
      currentNumber === "" ||
      operator === ""
    ) {
      return;
    }

    const firstNumber = parseFloat(previousNumber);

    const secondNumber = parseFloat(currentNumber);

    let answer;


    switch (operator) {

      case "+":

        answer = firstNumber + secondNumber;

        break;


      case "-":

        answer = firstNumber - secondNumber;

        break;


      case "*":

        answer = firstNumber * secondNumber;

        break;


      case "/":

        if (secondNumber === 0) {

          setError("Cannot divide by zero");

          return;
        }

        answer = firstNumber / secondNumber;

        break;


      default:

        return;
    }


    // Remove unnecessary decimal digits

    answer = Number(answer.toFixed(10));


    // Add calculation to history

    const calculation = {
      expression:
        `${firstNumber} ${operatorSymbol(operator)} ${secondNumber}`,

      result: answer,
    };


    setHistory((oldHistory) => [
      calculation,
      ...oldHistory,
    ]);


    // Show result

    setCurrentNumber(answer.toString());

    setPreviousNumber("");

    setOperator("");

    setError("");
  };


  // -----------------------------
  // Percentage
  // -----------------------------

  const percentage = () => {

    if (currentNumber === "") {
      return;
    }

    const number = parseFloat(currentNumber);

    const result = number / 100;

    setCurrentNumber(result.toString());
  };


  // -----------------------------
  // Delete Last Number
  // -----------------------------

  const deleteNumber = () => {

    setCurrentNumber(
      currentNumber.slice(0, -1)
    );
  };


  // -----------------------------
  // Clear Calculator
  // -----------------------------

  const clearCalculator = () => {

    setCurrentNumber("");

    setPreviousNumber("");

    setOperator("");

    setError("");
  };


  // -----------------------------
  // Operator Symbol
  // -----------------------------

  const operatorSymbol = (value) => {

    if (value === "*") {
      return "×";
    }

    if (value === "/") {
      return "÷";
    }

    if (value === "-") {
      return "−";
    }

    return value;
  };


  // -----------------------------
  // Keyboard Support
  // -----------------------------

  const handleKeyboard = (event) => {

    const key = event.key;


    if (!isNaN(key) || key === ".") {

      addNumber(key);

      return;
    }


    if (
      key === "+" ||
      key === "-" ||
      key === "*" ||
      key === "/"
    ) {

      selectOperator(key);

      return;
    }


    if (key === "Enter" || key === "=") {

      calculate();

      return;
    }


    if (key === "Backspace") {

      deleteNumber();

      return;
    }


    if (key === "Escape") {

      clearCalculator();

      return;
    }


    if (key === "%") {

      percentage();

      return;
    }
  };


  // -----------------------------
  // Display Expression
  // -----------------------------

  const displayExpression = () => {

    if (
      previousNumber !== "" &&
      operator !== ""
    ) {

      return (
        `${previousNumber} ${operatorSymbol(operator)}`
      );
    }

    return "";
  };


  // -----------------------------
  // JSX
  // -----------------------------

  return (

    <div
      className="app"
      tabIndex="0"
      onKeyDown={handleKeyboard}
    >

      <div className="calculator-container">


        {/* =========================
            HEADER
        ========================== */}

        <div className="header">

          <div className="header-icon">

            <FaCalculator />

          </div>


          <div>

            <h1>Calculator</h1>

            <p>Smart Calculation Tool</p>

          </div>

        </div>


        {/* =========================
            MAIN CONTENT
        ========================== */}

        <div className="main-content">


          {/* =========================
              CALCULATOR
          ========================== */}

          <div className="calculator-card">


            {/* DISPLAY */}

            <div
              className={`display ${
                error ? "display-error" : ""
              }`}
            >

              <div className="expression">

                {error
                  ? error
                  : displayExpression()}

              </div>


              <div
                className="result"
                key={currentNumber}
              >

                {currentNumber || "0"}

              </div>

            </div>


            {/* BUTTONS */}

            <div className="buttons">


              {/* ROW 1 */}

              <button
                className="button danger"
                onClick={clearCalculator}
              >

                <FaTrash />

                <span>AC</span>

              </button>


              <button
                className="button secondary"
                onClick={deleteNumber}
              >

                <FaBackspace />

                <span>DEL</span>

              </button>


              <button
                className="button secondary"
                onClick={percentage}
              >

                <FaPercentage />

              </button>


              <button
                className="button operator"
                onClick={() => selectOperator("/")}
              >

                <FaDivide />

              </button>


              {/* ROW 2 */}

              <button
                className="button"
                onClick={() => addNumber("7")}
              >

                7

              </button>


              <button
                className="button"
                onClick={() => addNumber("8")}
              >

                8

              </button>


              <button
                className="button"
                onClick={() => addNumber("9")}
              >

                9

              </button>


              <button
                className="button operator"
                onClick={() => selectOperator("*")}
              >

                <FaTimes />

              </button>


              {/* ROW 3 */}

              <button
                className="button"
                onClick={() => addNumber("4")}
              >

                4

              </button>


              <button
                className="button"
                onClick={() => addNumber("5")}
              >

                5

              </button>


              <button
                className="button"
                onClick={() => addNumber("6")}
              >

                6

              </button>


              <button
                className="button operator"
                onClick={() => selectOperator("-")}
              >

                <FaMinus />

              </button>


              {/* ROW 4 */}

              <button
                className="button"
                onClick={() => addNumber("1")}
              >

                1

              </button>


              <button
                className="button"
                onClick={() => addNumber("2")}
              >

                2

              </button>


              <button
                className="button"
                onClick={() => addNumber("3")}
              >

                3

              </button>


              <button
                className="button operator"
                onClick={() => selectOperator("+")}
              >

                <FaPlus />

              </button>


              {/* ROW 5 */}

              <button
                className="button zero"
                onClick={() => addNumber("0")}
              >

                0

              </button>


              <button
                className="button"
                onClick={() => addNumber(".")}
              >

                .

              </button>


              <button
                className="button equals"
                onClick={calculate}
              >

                <FaEquals />

              </button>

            </div>

          </div>


          {/* =========================
              HISTORY
          ========================== */}

          <div className="history-card">


            <div className="history-header">

              <div className="history-title">

                <FaHistory />

                <h2>History</h2>

              </div>


              <span>

                {history.length}

              </span>

            </div>


            <div className="history-content">

              {history.length === 0 ? (

                <div className="empty-history">

                  <FaClock />

                  <p>No calculations yet</p>

                  <small>
                    Your calculations will appear here
                  </small>

                </div>

              ) : (

                history.map((item, index) => (

                  <div
                    className="history-item"
                    key={index}
                  >

                    <div>

                      <p className="history-expression">

                        {item.expression}

                      </p>

                      <strong>

                        = {item.result}

                      </strong>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="footer">

          <span>React Calculator</span>

          <span>•</span>

          <span>Fast & Simple</span>

        </div>


      </div>

    </div>
  );
}

export default App;