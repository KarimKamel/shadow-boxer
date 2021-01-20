import React from "react";
import InputSlider from "./InputSlider";
import { HuePicker } from "react-color";
import { Grid } from "@material-ui/core";

export default function ShadowParamsInput({
  index,
  handleValueChange,
  handleColorChange,
  color,
}) {
  const shadowSliderParams = {
    minVal: -50,
    maxVal: 50,
    defaultVal: 10,
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <InputSlider
          params={shadowSliderParams}
          name="hOffset"
          label="horizonatal offset"
          handleOnChange={(event, value, name) =>
            handleValueChange(event, value, name, index)
          }
        />

        <InputSlider
          params={shadowSliderParams}
          name="vOffset"
          label="vertical offset"
          handleOnChange={(event, value, name) =>
            handleValueChange(event, value, name, index)
          }
        />

        <InputSlider
          params={shadowSliderParams}
          name="blur"
          label="blur"
          handleOnChange={(event, value, name) =>
            handleValueChange(event, value, name, index)
          }
        />

        <InputSlider
          params={shadowSliderParams}
          name="spread"
          label="spread"
          handleOnChange={(event, value, name) =>
            handleValueChange(event, value, name, index)
          }
        />
      </Grid>

      <Grid container>
        <Grid item xs={6}>
          <HuePicker
            color={color}
            onChange={(color) => handleColorChange(color, index)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
