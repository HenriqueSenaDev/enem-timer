import { IQuestionTime } from '../..';
import { ReactComponent as HideTableVector } from '../../../../../../assets/hide-table.svg';
import './styles.css';

interface IProps {
  questionsTime: IQuestionTime[];
  isTimeHidden: boolean;
}

function TimeTable({ questionsTime, isTimeHidden }: IProps) {
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

      {isTimeHidden
        ? <HideTableVector className='hide-table' />
        : questionsTime.map(({ current, overall }, index) => (
          <div key={index} className='question-time'>
            <span className={getTimeColor(current)}>{current}</span>

            <span className={getTimeColor(overall)}>{overall}</span>
          </div>
        ))
      }
    </div>
  );
}

export default TimeTable;
