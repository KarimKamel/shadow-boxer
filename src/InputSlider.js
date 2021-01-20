import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: -50,
    label: "-50px",
  },

  {
    value: -25,
    label: "-25px",
  },
  {
    value: 0,
    label: "0px",
  },

  {
    value: 25,
    label: "25px",
  },

  {
    value: 50,
    label: "50px",
  },
];

function valuetext(value) {
  return `${value}px`;
}

export default function InputSlider(props) {
  const classes = useStyles();
  const { maxVal, minVal, defaultVal } = props.params;
  const { label, name } = props;
  const { handleOnChange } = props;

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        {label}
      </Typography>
      <Slider
        name={name}
        defaultValue={defaultVal}
        min={minVal}
        max={maxVal}
        onChange={(e, v) => {
          handleOnChange(e, v, name);
        }}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </div>
  );
}
