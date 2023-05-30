import React from "react";
import "../index.css";

function Footer() {
  return (
    <footer className="footer">
      {/* динамическое обновление года в футере */}
      <h2 className="footer__title">
        © {new Date().getFullYear()} Mesto Russia
      </h2>
    </footer>
  );
}

export default Footer;
