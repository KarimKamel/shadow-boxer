import ColorPicker from "material-ui-color-picker";

<ColorPicker
  name="color"
  defaultValue="#000"
  // value={this.state.color} - for controlled component
  onChange={(color) => console.log(color)}
/>;
