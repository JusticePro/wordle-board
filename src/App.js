//import logo from './logo.svg';

import './App.css';

import WordleAnswer from './components/WordleAnswer';

function App() {
  return (
    <div className="App">
      <p className='App-Title'>WORDLE<br />B O A R D</p>
      <WordleAnswer />
      <p className='Credits'>
        Front-End Development - <a href='https://github.com/supergamersgames' target="_blank">SuperGamersGames</a>
      <br/>
        Back-End Development - <a href='https://github.com/justicepro' target="_blank">JusticePro</a>
      <br/>
        Hosted by <a href='https://www.cloudflare.com/' target="_blank">CloudFlare</a>
      <br/>
      <br/>
      Plus by arjuazka from <a href="https://thenounproject.com/browse/icons/term/plus/" target="_blank" title="Plus Icons">Noun Project</a> (CC BY 3.0)
      </p>
    </div>
  );
}

export default App;
