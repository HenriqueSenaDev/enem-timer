import { IQuestionTime } from '../../../../../../types/timer';
import { ReactComponent as HideTableVector } from '../../../../../../assets/hide-table.svg';

interface IProps {
  questionsTime: IQuestionTime[];
  isTimeHidden: boolean;
}

function TimeTable({ questionsTime, isTimeHidden }: IProps) {
  function getTimeColor(timeString: string) {
    return timeString.at(0) === '+'
      ? 'text-[rgb(8,230,8)]'
      : 'text-[rgb(255,19,19)]';
  }

  return (
    <div className="flex flex-col items-center py-4 px-5 bg-[#13174B] rounded-xl w-full max-w-[260px] font-['Poppins'] font-light h-[35vh] max-h-[35vh] overflow-y-auto flex-[0.7] lg:absolute lg:py-6 lg:px-7 lg:max-w-[290px] lg:right-0 lg:min-h-[55vh]">
      <div className='w-full flex items-center justify-around pb-[10px] border-b-[1px] border-solid border-white relative lg:pb-4'>
        <span className='text-sm w-[56px] text-center lg:text-sm lg:w-[78px]'>
          Questão
        </span>

        <div className='h-[18px] border-l-[1px] border-solid border-white absolute left-[50%] -translate-x-[50%]' />

        <span className='text-sm w-[56px] text-center lg:text-sm lg:w-[78px]'>
          Geral
        </span>
      </div>

      {
        isTimeHidden
          ? <HideTableVector className='w-[65%] h-auto translate-y-[50%]' />
          : questionsTime.map(({ current, overall }, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-evenly font-['IBM_Plex_Mono'] text-[14px] mt-3 lg:mt-[18px] lg:text-[15px]"
            >
              <span
                className={`${getTimeColor(current)} m-auto`}
              >
                {current}
              </span>

              <span className={`${getTimeColor(overall)} m-auto`}>
                {overall}
              </span>
            </div>
          ))
      }
    </div >
  );
}

export default TimeTable;
