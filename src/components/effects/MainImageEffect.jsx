import {useEffect, useState} from 'react';
import anime from 'animejs';
import './Effect.css';

const MainImageEffect = () => {
  const [clickCounts, setClickCounts] = useState({});
  const [animating, setAnimating] = useState(false);

  const handleClick = (e) => {
    if (animating) return;

    const image = e.target;
    const imageId = image.src;

    setAnimating(true);
    setClickCounts((prevCounts) => {
      const newCounts = {...prevCounts};
      newCounts[imageId] = (newCounts[imageId] || 0) + 1;
      return newCounts;
    });

    const clickCount = clickCounts[imageId] || 0;
    let animationProps = {
      targets: image,
      easing: 'easeInOutQuad',
      duration: 800,
      complete: () => {
        if (clickCount >= 5) {
          image.style.display = 'none';
        }
        setAnimating(false);
      },
    };

    if (clickCount < 3) {
      animationProps = {
        ...animationProps,
        rotate: '+=360',
        scale: [1, 1.2, 1],
      };
    } else if (clickCount >= 3 && clickCount < 5) {
      animationProps = {
        ...animationProps,
        scale: [1, 1.2, 1],
      };
    } else if (clickCount >= 5) {
      animationProps = {
        ...animationProps,
        opacity: [1, 0],
      };
    }

    anime(animationProps);
  };

  useEffect(() => {
    const images = document.querySelectorAll('img');
    images.forEach((image) => {
      image.addEventListener('click', handleClick);
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener('click', handleClick);
      });
    };
  }, [clickCounts, animating]);

  return null;
};

export default MainImageEffect;
