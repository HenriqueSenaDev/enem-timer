import { ReactComponent as HideTimeVector } from '../../../../../../assets/hide-time.svg';
import { formatQuestionMillis } from '../../../../../../utils/formatters/questions';
import pauseIcon from '../../../../../../assets/pause.svg';

interface IProps {
  currentMilis: number;
  overaalMilis: number;
  isPaused: boolean;
  setIsPaused: (conditional: boolean) => void;
  isTimeHidden: boolean;
}

function Timer({ currentMilis, overaalMilis, isPaused, setIsPaused, isTimeHidden }: IProps) {
  return (
    <div className="flex flex-col items-center justify-center font-['IBM_Plex_Mono'] leading-[1.2] tracking-[1px] relative h-[190px] lg:absolute lg:top-0 lg:left-0 lg:w-[372px]">
      {isTimeHidden
        ? <HideTimeVector className='h-[130%] w-auto lg:scale-[1.2] -translate-y-[10%] lg:m-auto' />
        : <>
          <h1 className='text-[52px] font-light lg:text-[76px]'>
            {formatQuestionMillis(currentMilis).substring(1)}
          </h1>

          <h2 className='text-[30px] font-light opacity-75 lg:text-5xl'>
            {formatQuestionMillis(overaalMilis).substring(1)}
          </h2>
        </>
      }

      <img
        className='mt-[10px] w-5 h-auto cursor-pointer lg:w-7'
        src={pauseIcon}
        alt='pause timer image'
        onClick={() => {
          if (overaalMilis == 0) return alert('Inicie para pausar.');
          setIsPaused(!isPaused);
        }}
      />
    </div>
  );
}

export default Timer;
