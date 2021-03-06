import React, { useState, useCallback } from 'react';
import DrumPad from './components/DrumPad';
import audios from './constants/audioBank';

const App = () => {
  const [text, setText] = useState('Press Button or Key');
  const [volume, setVolume] = useState(100);
  const [mode, setMode] = useState(false);

  const handleSwitch = useCallback(() => {
    setMode(!mode);
  }, [mode]);

  const handleVolume = useCallback(({ target }) => {
    const parsed = Number.parseInt(target.value, 10);
    setVolume(parsed);
  }, []);

  return (
    <div className='container'>
      <header>
        <h1>Drum Machine</h1>
        <p>Front End Libraries Project</p>
      </header>

      <main id='drum-machine'>
        <div id='display' className='display'>{text}</div>
        <div className='drum-pads'>
          {audios[mode ? 1 : 0].map((audio, index) => (
            <DrumPad
              key={index}
              {...audio}
              setText={setText}
              volume={volume / 100}
            />
          ))}
        </div>
      </main>

      <div className='controls'>
        <div className='kit-control'>
          <p className={mode ? 'piano' : 'heater'}>
            {mode ? 'Piano Kit' : 'Heater Kit'}
          </p>
          <label htmlFor='switch'>
            <input id='switch' type='checkbox' onChange={handleSwitch} />
            <span />
            <i className='indicator' />
          </label>
        </div>

        <div className='volume-control'>
          <p className='range-value'>
            Volume<span>{volume}</span>
          </p>
          <input
            type='range'
            min='0'
            max='100'
            step='1'
            className='range'
            defaultValue={volume}
            // onMouseUp={handleVolume}
            onInput={handleVolume}
          />
        </div>
      </div>

      <footer>
        <small>Made with 🤍 by <span>Min Huang</span></small>
      </footer>
    </div>
  );
};

export default App;
