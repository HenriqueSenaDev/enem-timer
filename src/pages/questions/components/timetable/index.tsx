import './styles.css';

interface IProps {
  questionsTime: {
    general: string;
    current: string;
  }[];
}

function TimeTable({ questionsTime }: IProps) {
  function getTimeColor(timeString: string) {
    return timeString.at(0) === '+' ? 'green' : 'red';
  }

  return (
    <div className='time-table-card'>
      <div className='table-header'>
        <span>Questão</span>

        <div className='vertical-line' />

        <span>Geral</span>
      </div>

      {questionsTime.map(({ current, general }) => (
        <div className='question-time'>
          <span className={getTimeColor(current)}>{current}</span>

          <span className={getTimeColor(general)}>{general}</span>
        </div>
      ))}
    </div>
  );
}

export default TimeTable;
