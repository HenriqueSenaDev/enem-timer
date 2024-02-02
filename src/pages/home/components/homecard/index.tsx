import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

interface IHomeCardProps {
  header: string;
  imgSource: string;
  items: string[];
  linkTo: string;
  style?: CSSProperties;
}

function HomeCard({ header, imgSource, items, linkTo, style }: IHomeCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className='rounded-2xl py-9 px-8 w-[270px] h-[340px] cursor-pointer bg-card hover:bg-card-hover md:w-[300px] md:h-[380px] lg:h-[355px] lg:[&:nth-of-type(2)]:w-[290px] lg:[&:nth-of-type(2)]:-translate-y-[30px]'
      style={style || {}}
      onClick={() => navigate(linkTo)}
    >
      <h1 className='text-xl font-medium md:text-[22px]'>
        {header}
      </h1>

      <div className='mt-[18px] mb-[26px] relative'>
        <div className='bg-[rgba(40,205,241,0.25)] absolute left-[34%] rounded-[50%] w-[67px] aspect-square blur-[6px]' />

        <img className='w-16 aspect-square m-auto' src={imgSource} alt={header} />
      </div>

      <ul className='flex items-center justify-center flex-col gap-5'>
        {items.map(item => (
          <li key={item} className='text-[15px] md:text-lg'>
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeCard;
