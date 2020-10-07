import React, { useCallback, useRef, useEffect } from 'react';

const DrumPad = ({ id, keyCode, keyTrigger, url, setText, volume }) => {
  const audio = useRef();
  const formatText = (text) => text.replace(/-/g, ' ').toUpperCase();

  const playAudio = useCallback((element) => {
    element.volume = volume;
    element.currentTime = 0;
    element.play();
  }, [volume]);

  const handleClick = useCallback(() => {
    playAudio(audio.current);
    const parent = audio.current.parentNode;
    setText(formatText(parent.id));
  }, [setText, playAudio]);

  const handleKeyDown = (event) => {
    if (event.repeat) return;
    if (event.keyCode !== keyCode) return;
    
    playAudio(audio.current);
    const parent = audio.current.parentNode;
    parent.classList.add('active');
    setText(formatText(parent.id));
  };

  const handleKeyUp = (event) => {
    if (event.keyCode !== keyCode) return;
    setTimeout(() => {
      const parent = audio.current.parentNode;
      parent.classList.remove('active');
    }, 33);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  });

  return (
    <button id={id} className='drum-pad' onClick={handleClick}>
      {keyTrigger}
      <audio id={keyTrigger} className='clip' src={url} ref={audio} />
    </button>
  );
};

export default DrumPad;
