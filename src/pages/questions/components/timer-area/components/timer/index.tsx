import { milisToFormattedTime } from '../../utils/timer-utils';
import { ReactComponent as HideTimeVector } from '../../../../../../assets/hide-time.svg';
import pauseIcon from '../../../../../../assets/pause.svg';
import "./styles.css";

interface IProps {
  currentMilis: number;
  overaalMilis: number;
  isPaused: boolean;
  setIsPaused: (conditional: boolean) => void;
  isTimeHidden: boolean;
}

function Timer({ currentMilis, overaalMilis, isPaused, setIsPaused, isTimeHidden }: IProps) {
  return (
    <div className='timer-container'>
      {isTimeHidden
        ? <HideTimeVector className='hide-time' />
        : <>
          <h1 className='current-time'>
            {milisToFormattedTime(currentMilis).substring(1)}
          </h1>

          <h2 className='overall-time'>
            {milisToFormattedTime(overaalMilis).substring(1)}
          </h2>
        </>
      }

      <img
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
