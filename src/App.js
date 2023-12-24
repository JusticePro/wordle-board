//import logo from './logo.svg';

import './App.css';

import WordleAnswer from './components/WordleAnswer';

function App() {
  return (
    <div className="App">
      <p className='App-Title'>WORDLE<br />B O A R D</p>
      <WordleAnswer />
    </div>
  );
}

export default App;
