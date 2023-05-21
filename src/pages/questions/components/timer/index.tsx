import pauseIcon from '../../../../assets/pause.svg';
import './styles.css';

function Timer() {
  return (
    <div className='timer-container'>
      <h1 className='current-time'>00:00:00</h1>

      <h2 className='overall-time'>00:00:00</h2>

      <img src={pauseIcon} alt='pause timer image' />
    </div>
  );
}

export default Timer;
