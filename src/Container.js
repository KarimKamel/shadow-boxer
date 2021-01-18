import React, { useState } from "react";
import { render } from "react-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    backgroundColor: "gray",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  object: {
    backgroundColor: "red",
    width: "200px",
    height: "200px",
    boxShadow: (shadow) =>
      `${shadow.vOffset}px ${shadow.hOffset}px ${shadow.spread}px ${shadow.color}`,
  },
});

export default function Container({ children, ...props }) {
  const [bgc, setBgc] = useState("purple");
  const [shadow, setShadow] = useState({
    vOffset: "10",
    hOffset: "10",
    spread: "10",
    color: "red",
  });
  const classes = useStyles(shadow);
  const handleSubmit = () => {};
  return (
    <div className={classes.root}>
      <form>
        <input type="text" name="hoffset" placeholder="hOffset"></input>
      </form>
      {console.log({ children })}
      <div className={classes.object}></div>
    </div>
  );
}

// Container.defaultProps = {
//   hOffset =
// };
