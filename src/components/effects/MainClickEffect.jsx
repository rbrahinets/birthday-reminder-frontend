import {useEffect, useState} from 'react';
import anime from 'animejs';
import './Effect.css';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MainClickEffect = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (e) => {
    const x = e.clientX;
    const y = e.clientY + window.scrollY;

    const randomColor = getRandomColor();

    setClickCount((prevCount) => prevCount + 1);

    const scaleFactor = clickCount >= 3 ? 2 : 1;

    const particles = Array.from({length: 100}).map(() => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.top = `${y}px`;
      particle.style.left = `${x}px`;
      particle.style.background = randomColor;
      document.body.appendChild(particle);
      return particle;
    });

    anime({
      targets: particles,
      translateX: () => anime.random(-100, 100) * scaleFactor,
      translateY: () => anime.random(-100, 100) * scaleFactor,
      scale: [1 * scaleFactor, 0],
      opacity: [1, 0],
      easing: 'easeOutQuad',
      duration: 1000,
      complete: () => particles.forEach((particle) => particle.remove()),
    });

    if (clickCount >= 3) {
      setClickCount(0);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [clickCount]);

  return null;
};

export default MainClickEffect;
