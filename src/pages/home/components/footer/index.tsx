function Footer() {
  return (
    <footer className='flex items-center justify-center w-full relative mt-[30px] pt-[14px] px-9 pb-[18px] bg-footer-gradient md:px-[18px] py-[38px]'>
      <div className='h-[60px] w-full absolute top-[-60px] bg-footer-blend' />

      <p className="text-[10px] font-light font-['Open_Sans'] md:text-[13px]">
        © {new Date().getFullYear()} HenriqueSenaDev. Todos os Direitos
        Reservados.
      </p>
    </footer>
  );
}

export default Footer;
