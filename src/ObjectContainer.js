import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import ShadowParamsInput from "./ShadowParamsInput";
import TabPanel from "./TabPanel";
import PhoneIcon from "@material-ui/icons/Phone";
import Button from "@material-ui/core/Button";

const useStyles = createUseStyles({
  root: {
    backgroundColor: "gray",
    height: "100vh",
    width: "100vw",
  },
  mySquare: {
    flexGrow: 1,
    maxWidth: 500,
  },
  tab: {
    flexDirection: "row !important",
    maxWidth: "30% !important",
    justifyContent: "space-around !important",
    "& svg": {
      order: 1,
      "&:hover": {
        transform: "scale(1.2)",
      },
    },
  },
  object: {
    margin: "auto",
    backgroundColor: "red",
    marginBottom: "3rem",
    marginTop: "3rem",
    width: "200px",
    height: "200px",
    boxShadow: (shadow) => {
      let shadowString = "";
      for (let i = 0; i < shadow.length; i++) {
        shadow[i].hOffset = shadow[i].hOffset || 10;
        shadow[i].vOffset = shadow[i].vOffset || 10;
        shadow[i].blur = shadow[i].blur || 10;
        shadow[i].spread = shadow[i].spread || 10;
        shadow[i].color = shadow[i].color || "rgb(0,0,0)";
        shadowString += `${shadow[i].hOffset}px ${shadow[i].vOffset}px ${shadow[i].blur}px ${shadow[i].spread}px ${shadow[i].color}`;
        if (i < shadow.length - 1) {
          shadowString += ",";
        }
      }
      return shadowString;
    },
  },
});

export default function ObjectContainer({ children, ...props }) {
  const [shadow, setShadow] = useState([{}, {}]);
  const [value, setValue] = useState(0);
  const [color, setColor] = useState([]);
  const classes = useStyles(shadow);

  const handleValueChange = (e, value, name, index) => {
    let shadowClone = [...shadow];
    shadowClone[index] = { ...shadowClone[index], [name]: value };
    setShadow(shadowClone);
  };

  const handleIconClick = (event, index) => {
    shadow.splice(index, 1);
    setShadow([...shadow]);
  };

  const handleColorChange = (value, index) => {
    console.log(value, index);
    const { r, g, b } = value.rgb;
    shadow[index].color = `rgb(${r},${g},${b})`;
    setShadow([...shadow]);
    const colorClone = [...color];
    colorClone[index] = value.rgb;
    setColor([...colorClone]);
  };
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const ButtonInTabs = ({ className, onClick, children }) => {
    return (
      <Button className={className} onClick={onClick} children={children} />
    );
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper square className={classes.mySquare}>
          {" "}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.object}></div>
            </Grid>
          </Grid>
          <Tabs
            value={value}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
          >
            {/* {[<Tab label={1} />, <Tab label={2} />]} */}
            {shadow.map((s, i) => (
              <Tab
                key={i}
                className={classes.tab}
                classes={{ wrapper: classes.tab }}
                label={i}
                icon={
                  <PhoneIcon onClick={(event) => handleIconClick(event, i)} />
                }
              />
            ))}
          </Tabs>
          {shadow.map((s, i) => (
            <TabPanel key={i} value={value} index={i}>
              <ShadowParamsInput
                key={i}
                index={i}
                color={color[i]}
                handleValueChange={handleValueChange}
                handleColorChange={handleColorChange}
              />
            </TabPanel>
          ))}
          {/* {shadow.map((s, i) => (
              <>
                <Tab label={value} />
                <TabPanel value={value} index={i}>
                  
                </TabPanel>
              </>
            ))} */}
        </Paper>
      </Container>
    </div>
  );
}
