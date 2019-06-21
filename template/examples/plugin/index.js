import React from "react";
import ReactDOM from "react-dom";

import MediaControlCard from "./js/MediaControlCard";

[...document.querySelectorAll(".apexreact")].forEach(function(el) {
  ReactDOM.render(<MediaControlCard />, el);
});
