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
    console.log(`Log ${generateRandomString(24)}`)
  }

  function handleConsoleError() {
    console.error(`Console Error: ${generateRandomString(24)}`)
  }

  function handleUncaughtError() {
    throw `Error ${generateRandomString(24)}`
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
