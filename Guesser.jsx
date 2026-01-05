import Card from './card'
import { useState } from 'react'

function Guesser({colors, words, hint, maxGuesses, sendMode, changeScore, setGameStatus, revealedCards, setRevealedCards, correctGuesses, setCorrectGuesses}){
    const rows = [0,1,2,3,4];
    const [selectCard, setSelectCard] = useState(null);
    const [cardLocation, setCardLocation] = useState([null,null]);
    const [guesses, setGuesses] = useState(0);
    const guessesToWin = 11;

    const toggleReveal = (word) => {
        setRevealedCards(prevSet => {
            const newSet = new Set(prevSet);
            newSet.add(word);
            return newSet;
        });
    };

    const check = () => {
        if (revealedCards.has(words[cardLocation[0]][cardLocation[1]])){
            alert("This card has already been guessed - select another!");
            return;
        }
        toggleReveal(words[cardLocation[0]][cardLocation[1]]);
        if(colors[cardLocation[0]][cardLocation[1]]=='blue'){
            setGuesses(prevNum => prevNum + 1)
            changeScore(score => score + 1);
            setCorrectGuesses(prev => prev + 1);
            if (correctGuesses == guessesToWin) setGameStatus('gameWon');
        }else if(colors[cardLocation[0]][cardLocation[1]]=='red'){
            changeScore(score => score - 1);
            setGuesses(0)
            setTimeout(() => {
                // This code runs after 60ms
                alert('A red card has been clicked! Pass the device to the hint master.');
                sendMode('giveHint');
            }, 60);
        }else {
                setTimeout(() => {
                    // This code runs after 60ms
                    alert('The black card has been clicked!');
                    setGameStatus('gameLost');
            }, 60);
        }

        if (guesses == maxGuesses && colors[cardLocation[0]][cardLocation[1]]!='red' && maxGuesses && colors[cardLocation[0]][cardLocation[1]]!='black' && guesses != guessesToWin) {
            setTimeout(() => {
                alert(`You have used up all ${parseInt(maxGuesses)+1} guesses. Please pass the device to the hint master for the next hint!`)
                sendMode('giveHint')
            }, 60)
        }
    }

    return (
        <>
            <div className='card-grid'>
                {rows.map((r,j) => (
                    <div key={j} className='row-div'>
                        {colors[j].map((c,i) => (
                            <Card key={words[j][i]}
                            label={words[j][i]}
                            onClick={()=>{
                                setSelectCard(words[j][i]);
                                setCardLocation([j,i])
                            }}
                            className={`
                                ${revealedCards.has(words[j][i]) ? colors[j][i] : 'unselected-card'}   
                                ${selectCard == words[j][i] ? 'selected-card' : ''}
                            `}
                            />    
                        ))
                        }
                    </div>
                ))
                }
            </div>
            <div className='guesser-ui'>
                <h1 className='hint-display'>{hint} ({maxGuesses}) 
                    {selectCard != null ? <Card label='Check' onClick={check} className ='check-button'/> : ''}
                    <Card label='Pass' className='check-button' onClick={() => {
                        alert('You have chosen to pass. Please give the device to the hint-master.');
                        sendMode('giveHint');
                        }}/> 
                </h1> 
            </div>
            <h2 className ='guesses-left'>Guesses Left: {parseInt(maxGuesses) - parseInt(guesses) + 1}</h2>
        </>
    )
}

export default Guesser