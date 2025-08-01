const useSound = () => {
  const playSound = (soundPath) => {
    const audio = new Audio(soundPath);
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  };

  return playSound;
};

export default useSound; 