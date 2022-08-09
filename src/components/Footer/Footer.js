import "./Footer.scss";

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const year = "";
  return (
    <section className="footer">
      <p className="footer__text">{`Copyright © ${
        currentYear === 2022 ? "2022" : `2022-${currentYear}`
      } Joe Shandley`}</p>
    </section>
  );
};

export default Footer;
