import React from "react";
import InputSlider from "./InputSlider";
import { SketchPicker } from "react-color";
import { Grid } from "@material-ui/core";

export default function ShadowParamsInput({
  index,
  handleValueChange,
  handleColorChange,
  color,
  shadow,
}) {
  const offsetSliderParams = {
    minVal: -50,
    maxVal: 50,
    // defaultVal: 10,
  };
  const effectSliderParams = {
    minVal: 0,
    maxVal: 50,
    // defaultVal: 10,
  };
  const { blur, spread, hOffset, vOffset } = shadow;

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <InputSlider
          params={offsetSliderParams}
          name="hOffset"
          label="X-offset"
          value={hOffset}
          handleOnChange={(event, value, name) =>
            handleValueChange(event, value, name, index)
          }
        />

        <InputSlider
          params={offsetSliderParams}
          name="vOffset"
          label="Y-offset"
          value={vOffset}
          handleOnChange={(event, value, name) =>
            handleValueChange(event, value, name, index)
          }
        />

        <InputSlider
          params={effectSliderParams}
          name="blur"
          label="blur"
          value={blur}
          handleOnChange={(event, value, name) =>
            handleValueChange(event, value, name, index)
          }
        />

        <InputSlider
          params={effectSliderParams}
          name="spread"
          label="spread"
          value={spread}
          handleOnChange={(event, value, name) =>
            handleValueChange(event, value, name, index)
          }
        />
      </Grid>

      <Grid item xs={6}>
        <SketchPicker
          color={color}
          onChange={(color) => handleColorChange(color, index)}
        />
      </Grid>
    </Grid>
  );
}
