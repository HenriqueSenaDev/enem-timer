import { useState } from 'react';
import HomeCard from './components/homecard';
import Footer from './components/footer/index';
import rightArrow from '../../assets/right-arrow.svg';
import leftArrow from '../../assets/left-arrow.svg';
import questionsIcon from '../../assets/questions.svg';
import infinityIcon from '../../assets/infinity.svg';
import essayIcon from '../../assets/essay.svg';

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
      <div className='flex flex-col items-center justify-center text-center h-[100vh] pt-[10vh] overflow-hidden relative lg:pt-16'>
        <h1 className='text-[34px] font-normal min-[390px]:text-[40px] md:text-[52px] lg:mb-[1%]'>
          Enem Timer
        </h1>

        {!isDesktop && currentCardIndex > 0 && (
          <img
            className='absolute aspect-square w-[34px] cursor-pointer -translate-x-[140px] min-[360px]:-translate-x-[160px] md:-translate-x-[180px] lg:hidden'
            src={leftArrow}
            alt='left arrow'
            onClick={() => setCurrentCardIndex(currentCardIndex - 1)}
          />
        )}

        <div className='flex items-center justify-center flex-1 w-full lg:gap-[74px]'>
          {isDesktop ? cards : cards[currentCardIndex]}
        </div>

        {!isDesktop && currentCardIndex < 2 && (
          <img
            className='absolute aspect-square w-[34px] cursor-pointer translate-x-[140px] min-[360px]:translate-x-[160px] md:translate-x-[180px] lg:hidden'
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
