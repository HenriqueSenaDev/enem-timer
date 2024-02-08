import { useState } from "react";
import { IEssayTimeOption } from "../../types/essay";
import EssayTimeModal from "./components/essay-time-modal";
import EssayTimerArea from "./components/essay-timer-area";

function Essay() {
  const [isTimeModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [timeOption, setTimeOption] = useState<IEssayTimeOption>({
    timeLabel: '',
    milliseconds: 0,
  });

  return (
    <div className='flex justify-center items-center flex-col'>
      {isTimeModalOpen && (
        <EssayTimeModal
          setIsModalOpen={setIsModalOpen}
          setTimeOption={setTimeOption}
        />
      )}

      <div className='w-full px-[22px] pt-[22px] pb-9 min-h-[100vh] flex flex-col items-center lg:pt-8 lg:pb-[5%] lg:max-w-[900px] xl:max-w-[1000px] 2xl:max-w-[1160px]'>
        <div className='self-baseline'>
          <h1 className='text-lg font-normal mb-2 lg:text-3xl'>
            Redação
          </h1>

          <p className='text-xs lg:text-lg'>
            {timeOption.timeLabel}
          </p>
        </div>

        <EssayTimerArea duration={timeOption.milliseconds} />
      </div>
    </div>
  );
}

export default Essay;
