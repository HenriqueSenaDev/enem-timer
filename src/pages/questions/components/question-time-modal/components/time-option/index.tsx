import './styles.css';

interface IProps {
  title: string;
  description: string;
  extraNote: string;
  time: string;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (newActiveIndex: number) => void;
  setQuestionSpecification: (newQuestionSpecification: string) => void;
}

function TimeOption({
  title,
  description,
  extraNote,
  time,
  index,
  activeIndex,
  setActiveIndex,
  setQuestionSpecification,
}: IProps) {
  function getQuestionSpecification() {
    let questionSpecification = `${title}: ${description}`;
    questionSpecification += ` - ${time}`;
    if (extraNote != '') questionSpecification += ` (${extraNote})`;

    return questionSpecification;
  }

  function selectOption() {
    setQuestionSpecification(getQuestionSpecification());
    setActiveIndex(index);
  }

  return (
    <div
      className='time-option'
      onClick={selectOption}
      style={index == activeIndex ? { backgroundColor: '#121a62' } : {}}
    >
      <div className='time-option-description'>
        <h1>{title}</h1>

        <p>{description}</p>
      </div>

      <div className='time-option-duration'>
        <p>{extraNote}</p>

        <h1>{time}</h1>
      </div>
    </div>
  );
}

export default TimeOption;
