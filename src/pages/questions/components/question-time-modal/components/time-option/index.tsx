import { useContext } from 'react';
import { TimerContext } from '../../../../../../contexts/timer';
import './styles.css';

interface IProps {
  title: string;
  description: string;
  extraNote: string;
  time: string;
}

function TimeOption({ title, description, extraNote, time, }: IProps) {
  const { setTimeOptionInfo } = useContext(TimerContext);

  function assembleQuestionSpecification() {
    let questionSpecification = `${title} | ${description} - ${time}`;
    if (extraNote) questionSpecification += ` (${extraNote})`;

    return questionSpecification;
  }

  function selectOption() {
    setTimeOptionInfo({
      timeSpecification: assembleQuestionSpecification(),
      time
    });
  }

  return (
    <button className='time-option'onClick={selectOption}>
      <div className='time-option-description'>
        <h1>{title}</h1>

        <p>{description}</p>
      </div>

      <div className='time-option-duration'>
        <p>{extraNote}</p>

        <h1>{time}</h1>
      </div>
    </button>
  );
}

export default TimeOption;
