import Card from './card'
import { useState } from 'react'

function Hinter({colors,words, sendHint, sendMode, sendGuessNum, revealedCards}){
    const rows = [0,1,2,3,4];
    const [hint, setHint] = useState('');
    const [guessNum, setGuessNum] = useState(1);

    const typingHint = (e) => {
        setHint(e.target.value);
    }

    const clickedGuessNum = (e) => {
        setGuessNum(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        sendMode('makeGuess');
        sendHint(hint);
        sendGuessNum(guessNum);
    }

    return (
        <>
            <div className='card-grid'>
                {rows.map((r,j) => (
                    <div key={j} className='row-div'>
                        {colors[j].map((c,i) => (
                            <Card key={i + j*5}
                            label={words[j][i]}
                            className={`
                                ${c}
                                ${revealedCards.has(words[j][i]) ? 'lowered-opacity' : ''} 
                            `}
                            />    
                        ))
                        }
                    </div>
                ))
                }
            </div>
        <div className='hinter-input'>
            <form onSubmit={onSubmit} >
                <label>
                    <input type="text" 
                    value={hint} 
                    onChange={typingHint}
                    className='modern-input' 
                    placeholder='Enter a One Word Hint'/>
                </label>

                <select value={guessNum} onChange = {clickedGuessNum} className='modern-input modern-input-dropdown'>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
                <Card type='submit' className='send-hint-button' label='ᯓ➤'/>
            </form>
        </div>
        </>
    )
}

export default Hinter