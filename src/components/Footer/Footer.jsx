import React from "react";

//import style.css
import "../Footer/style.css";

export default function Footer() {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <div className="footer">
      <div>
        <p>
          Made with React by
          <button
            role="link"
            onClick={() => openInNewTab("https://github.com/guillaumegemelas")}
          >
            Guillaume GEMELAS
          </button>
        </p>
      </div>
    </div>
  );
}
