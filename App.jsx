import { useState } from 'react'
import './App.css'
import Hinter from './Hinter'
import Guesser from './Guesser';
import Card from './card';
// still need to add:  start screen (with rules), randomize words/colors, 
// done: remove double check cards, win condition, game over condition/screen

const wordsUnshuffle = [
  'sun', 'ice', 'hot', 'cold', 'fast', 'slow', 'big', 'tiny', 'run', 'stop',
  'fire', 'wet', 'dry', 'dark', 'glow', 'open', 'shut', 'high', 'low', 'soft',
  'toe', 'aligator', 'mouse', 'turtle', 'rabbit', 'China', 'pepper', 'cook',

  'bridge', 'shout', 'forest', 'climb', 'silver', 'ocean', 'glance', 'rocket', 
  'dance', 'sketch', 'planet', 'wander', 'hammer', 'bright', 'window', 'travel', 
  'flame', 'market', 'listen', 'growth', 'spring', 'anchor', 'cloud', 'silent', 
  'noisy', 'brave', 'fearful', 'simple', 'complex', 'ancient', 'modern', 'active', 
  'stagnant', 'gentle', 'harsh', 'wisdom', 'folly', 'justice', 'unfair', 'shadow', 
  'spirit', 'vessel', 'quartz', 'rhythm', 'timber', 'valley', 'winter', 'summer', 
  'autumn', 'spring', 'breeze', 'stormy', 'stable', 'shaky', 'hidden', 'visible', 
  'honest', 'deceit', 'gather', 'scatter', 'create', 'destroy', 'smooth', 'rugged',
  'ditch', 'bye', 'riddle', 'eagle', 'owl',  

  'adventure', 'beautiful', 'dangerous', 'enormous', 'frighten', 'grateful', 
  'happiness', 'invisible', 'knowledge', 'lightning', 'mountain', 'neighbor', 
  'orchestra', 'passenger', 'question', 'radiant', 'structure', 'together', 
  'universe', 'victory', 'optimism', 'Canada', 'America', 'blueprint'
];
const colorsUnshuffle = ['blue', 'blue', 'red', 'red', 'blue',
                'blue', 'blue', 'red', 'red', 'blue',
                'blue', 'blue', 'red', 'red', 'black',
                'blue', 'blue', 'red', 'red', 'red',
                'blue', 'blue', 'red', 'red', 'red'
];

const shuffledWords = wordsUnshuffle.sort(() => Math.random() - 0.5);
const words = [[],[],[],[],[]];

const shuffledColors = colorsUnshuffle.sort(() => Math.random() - 0.5);
const colors = [[],[],[],[],[]];

for (let j = 0; j < 5; j++){
  for (let i = 0; i < 5; i++){
    words[j][i] = shuffledWords[i + j*5];
    colors[j][i]=shuffledColors[i + j*5];
  }
}

function App() {
  const [score, setScore] = useState(0);
  const [recievedHint, setRecievedHint] = useState('');
  const [recievedGuessNum, setRecievedGuessNum] = useState('');
  const [mode, setMode] = useState('giveHint');
  const [globalRevealedCards, setGlobalRevealedCards] = useState(new Set());
  const [gameStatus, setGameStatus] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [startScreen, setStartScreen] = useState(true);

  return (
    <>
      {startScreen ? 
      (<>
        <h1 className='names'><u className='code'>Code</u>names</h1>
        <div>
          <h2><u>Rules</u></h2>
          <p>Codenames is a card game where 2 players must work together. One player will be <i>Hint-master</i>,
          and the other will be the <i>Guesser</i>. 
          </p>          
          <p>The <i>Hint-master</i> will see a grid of 25 random words. Some cards are blue, some are red,
          and one is black. The goal is to help the <i>Guesser</i> figure out which cards are blue. By providing
          1 word hints and the number of associated words to that hint, this can be accomplished. +1 score if a 
          blue card is clicked, and -1 point for a red. But be careful, as the game will end if the black card 
          is clicked...
          </p>
          <div className='sample-cards'>
            <Card label='+1 Point (good)' className='blue'/> <Card label='-1 Point (bad)' className='red'/> <Card label='Game Over' className='black'/>
          </div>
          <p>
            The <i>Guesser</i> cannot see which cards are which color, so they must pick carefully. The turn
            ends when a red card is clicked, and the game ends when a black card is clicked. The Guesser should not look at 
            the screen when it is the hint-master's turn, and the hint-master should not speak when it is the Guesser's 
            turn. Before starting the game, the designated hint-master should be the only one looking at the screen.
          </p>
          <Card label="Let's go!" onClick={() => setStartScreen(false)}/>
        </div>
      </>) 
      :(<>
        <Card label='Rules' className='rules'
        onClick={() => alert(`Rules: 
There are 25 cards: 12 blue, 12 red, and 1 black.
2 Players will work together to try and guess all of the blue cards.
Hint-master: Knows which cards are which color, and provides hints to help identify the cards.
Guesser: Must guess which card is which color based on the hint and number of associated words as given by the hint-master.`)}/>
        <h2 className='score'>Score: {score}</h2>
        {gameStatus == null ? 
          (mode == 'giveHint' ? 
          <Hinter colors={colors} words={words} sendHint={setRecievedHint} sendMode={setMode} 
          sendGuessNum={setRecievedGuessNum} revealedCards={globalRevealedCards}/> :
          
          <Guesser colors={colors} hint={recievedHint} sendMode={setMode} maxGuesses={recievedGuessNum} changeScore={setScore}
          words={words} setGameStatus ={setGameStatus} revealedCards={globalRevealedCards} setRevealedCards={setGlobalRevealedCards}
          correctGuesses={correctGuesses} setCorrectGuesses={setCorrectGuesses}/>)  
            :(
              <>      
                <h1>Game Over</h1>
                {gameStatus == 'gameWon' ? 
                  <h2>Your team has successfully guessed all of the blue cards, accumulating a total of {score} points!</h2>:
                  (<h2>Your team selected the black card... you lost!</h2>)
                  
                }
                <Card label ='Play Again' onClick={() => window.location.reload()}/>
              </>
            )
        }
      </>)}
    </>
  )
}//end of App()
export default App
