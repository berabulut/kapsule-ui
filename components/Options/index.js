import { useEffect, useState } from "react";
import {
  Switch,
  FormControlLabel,
  Grid,
  Input,
  Slider,
  TextField,
  withStyles,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "150px",
    width: "100%",
    padding: "32px 64px",
    [theme.breakpoints.down("xs")]: {
      padding: "24px 16px 0px 16px;",
    },
  },
  switchText: {
    fontWeight: 500,
    marginRight: "16px",
  },
  slider: {
    paddingTop: "26px",
  },
}));

export const TextArea = withStyles({
  root: {
    width: "100%",
    background: "#F5F5F5",
    color: "#808080",
    border: "1px solid #F5F5F5;",
    "& .MuiFormLabel-root": {
      color: "#808080",
    },
    "& .MuiOutlinedInput-root": {
      color: "#808080",
      fontWeight: "450",
      "&:hover fieldset": {
        borderColor: "#00ADB5",
      },
    },
  },
})(TextField);





const Options = ({ setOptions }) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);
  const [duration, setDuration] = useState(5);
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    setOptions((prev) => ({ ...prev, checked: checked }));
  }, [checked]);

  useEffect(() => {
    setOptions((prev) => ({ ...prev, duration: duration }));
  }, [duration]);

  useEffect(() => {
    setOptions((prev) => ({ ...prev, message: message }));
  }, [message]);

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item container justify="center" style={{ marginBottom: "12px" }}>
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
            style={{ marginLeft: "0px", marginRight: "0px" }}
          />
        </Grid>
        <Grid item container spacing={3}>
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
              disabled={!checked}
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
          <Grid item container justify="center" xs={12}>
            <TextArea
              disabled={!checked}
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              inputProps={{ spellCheck: "false" }}
              onChange={(event) => setMessage(event.target.value)}
            />
          </Grid>
        </Grid>
        {/* */}
      </Grid>
    </div>
  );
};

export default Options;
