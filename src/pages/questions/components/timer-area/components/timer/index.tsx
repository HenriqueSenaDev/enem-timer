import pauseIcon from '../../../../../../assets/pause.svg';
import "./styles.css";

interface IProps {
  currentMilis: number;
  overaalMilis: number;
  isPaused: boolean;
  setIsPaused: (conditional: boolean) => void;
  isRunning: boolean;
}

function Timer({ currentMilis, overaalMilis, isPaused, setIsPaused }: IProps) {
  function milisToFormattedTime(milis: number) {
    function doubleDigitTimeCheck(value: number) {
      return value >= 10 ? `${value}` : `0${value}`;
    }

    const minutes = Math.floor(milis / 1000 / 60);
    const seconds = Math.floor((milis - (1000 * 60 * minutes)) / 1000);
    const milisseconds = milis - ((1000 * 60 * minutes) + (1000 * seconds));

    const fomarttedMinutes = doubleDigitTimeCheck(minutes);
    const formattedSeconds = doubleDigitTimeCheck(seconds);
    const formattedMilisseconds = milisseconds != 0 ? milisseconds.toString().substring(0, 2) : '00';

    return `${fomarttedMinutes}:${formattedSeconds}:${formattedMilisseconds}`;
  }

  return (
    <div className='timer-container'>
      <h1 className='current-time'>
        {milisToFormattedTime(currentMilis)}
      </h1>

      <h2 className='overall-time'>
        {milisToFormattedTime(overaalMilis)}
      </h2>

      <img
        src={pauseIcon}
        alt='pause timer image'
        onClick={() => setIsPaused(!isPaused)}
      />
    </div>
  );
}

export default Timer;
