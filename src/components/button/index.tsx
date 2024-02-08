import { ComponentProps } from 'react';

interface IProps extends ComponentProps<'button'> {
  text: string;
  shortcut?: string;
}

function Button({ text, shortcut, className, ...rest }: IProps) {
  return (
    <div className='flex flex-col items-center justify-center lg:gap-[6px]'>
      <button
        className={`${className} text-[11px] bg-[#13174B] hover:bg-opacity-80 py-2 px-6 rounded-lg text-white border-0 cursor-pointer font-['Poppins'] lg:text-[12.5px] lg:py-[9px]`}
        {...rest}
      >
        {text}
      </button>

      <span className="hidden lg:font-['Poppins'] lg:block lg:text-sm lg:text-white lg:opacity-50 tracking-[0.5px]">
        {shortcut}
      </span>
    </div>
  );
}

export default Button;
