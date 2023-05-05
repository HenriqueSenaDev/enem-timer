import './styles.css';

function Footer() {
  return (
    <footer>
      <div className="footer-gradient" />

      <p>© {new Date().getFullYear()} HenriqueSenaDev. Todos os Direitos Reservados.</p>
    </footer>
  );
}

export default Footer;
