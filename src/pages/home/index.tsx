import { useState } from 'react';
import HomeCard from './components/homecard';
import Footer from './components/footer/index';
import rightArrow from '../../assets/right-arrow.svg';
import leftArrow from '../../assets/left-arrow.svg';
import questionsIcon from '../../assets/questions.svg';
import infinityIcon from '../../assets/infinity.svg';
import essayIcon from '../../assets/essay.svg';
import './styles.css';

function Home() {
  const [isDesktop, setIsDesktop] = useState<boolean>(
    document.body.clientWidth >= 992,
  );
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(1);

  const cards = [
    <HomeCard
      key='N Questões'
      header='N Questões'
      imgSource={questionsIcon}
      items={['Temporizador', 'Tabela de tempo', 'Número de questões definido']}
      linkTo='/questions'
    />,
    <HomeCard
      key='Questões Infinitas'
      header='Questões Infinitas'
      imgSource={infinityIcon}
      items={['Temporizador', 'Tabela de tempo', 'Número de questões livre']}
      linkTo='/questions/infinity'
    />,
    <HomeCard
      key='Redação'
      header='Redação'
      imgSource={essayIcon}
      items={['Temporizador', 'Saldo de tempo']}
      linkTo='/essay'
    />,
  ];

  window.addEventListener('resize', () =>
    setIsDesktop(document.body.clientWidth >= 992),
  );

  return (
    <div>
      <div className='home-container'>
        <h1 className='main-header'>Enem Timer</h1>

        {!isDesktop && currentCardIndex > 0 && (
          <img
            className='card-left-arrow'
            src={leftArrow}
            alt='left arrow'
            onClick={() => setCurrentCardIndex(currentCardIndex - 1)}
          />
        )}

        <div className='home-cards-area'>
          {isDesktop ? cards : cards[currentCardIndex]}
        </div>

        {!isDesktop && currentCardIndex < 2 && (
          <img
            className='card-right-arrow'
            src={rightArrow}
            alt='right arrow'
            onClick={() => setCurrentCardIndex(currentCardIndex + 1)}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
