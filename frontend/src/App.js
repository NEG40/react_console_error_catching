import './App.css';

function App() {
  function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  function handleLog() {
    console.log(`console.log`)
  }

  function handleConsoleError() {
    console.error(new TypeError("Mimicking a TypeError"))
  }

  function handleUncaughtError() {
    throw `Random uncaught error: ${generateRandomString(24)}`
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleLog}>
          Create Log
        </button>
        <button onClick={handleConsoleError}>
          Create Console Error
        </button>
        <button onClick={handleUncaughtError}>
          Create Uncaught Error
        </button>
      </header>
    </div>
  );
}

export default App;
