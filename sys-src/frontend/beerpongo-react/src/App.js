import './App.css';
import GameMenu from './components/GameMenu';
import Field from './components/Field';
import EndOfRound from './components/EndOfRound';

function App() {
  return (
    <div className="App">
      <GameMenu></GameMenu>
        <Field></Field>
      <EndOfRound></EndOfRound>
    </div>
  );
}

export default App;
