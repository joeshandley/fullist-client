import "./Footer.scss";

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const year = "";
  return (
    <section className="footer">{`Copyright © ${
      currentYear === 2022 ? "2022" : `2022-${currentYear}`
    } Joe Shandley`}</section>
  );
};

export default Footer;
