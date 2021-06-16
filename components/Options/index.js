import { useEffect, useState } from "react";
import {
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  Grid,
  Input,
  Slider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "150px",
    width: "100%",
    padding: "32px 64px",
  },
  switchText: {
    fontWeight: 500,
    marginRight: "16px",
  },
  slider: {
    paddingTop: "26px",
  },
}));

const Options = () => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);
  const [duration, setDuration] = useState(5);

  const handleSliderChange = (event, newValue) => {
    setDuration(newValue);
  };

  const handleInputChange = (event) => {
    setDuration(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (duration < 1) {
      setDuration(1);
    } else if (duration > 10) {
      setDuration(10);
    }
  };

  return (
    <div className={classes.container}>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="end"
            control={
              <Switch
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                color="primary"
              />
            }
            label="Activate waiting page"
            labelPlacement="start"
            classes={{ label: classes.switchText }}
          />
        </FormGroup>
      </FormControl>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginTop: "12px" }}
      >
        <Grid item xs>
          <Slider
		  	disabled={!checked}
            value={duration}
            onChange={handleSliderChange}
            className={classes.slider}
            max={10}
            min={1}
            step={1}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={duration}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 10,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Options;
