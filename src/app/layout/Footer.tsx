export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h3 className="footer__title">Зв'яжіться з нами</h3>
        <ul className="footer__list">
          <li className="footer__item">
            Email: <a href="mailto:support@courseshop.com">support@courseshop.com</a>
          </li>
          <li className="footer__item">
            Телефон: <a href="tel:+380000000000">+38 (000) 000-00-00</a>
          </li>
          <li className="footer__item">Telegram: @courseshop</li>
        </ul>
        <p className="footer__copy">© 2026 CourseShop</p>
      </div>
    </footer>
  );
}