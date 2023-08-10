import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import { QuizContext } from "../../App";

import * as Yup from "yup";
import { useNavigate } from "react-router";

const Home = () => {
  const navigation = useNavigate();
  const { setName, setMail, setAge, setTracker, setPhone, setSelector } =
    useContext(QuizContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      selectedLanguage: "",
      age: 0,
      trackScore: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      name: Yup.string().required("Required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("Required"),
      selectedLanguage: Yup.string().required("Required"),
      age: Yup.number().positive("Invalid age").required("Required"),
    }),
    onSubmit: (values) => {
      setName(values.name);
      setMail(values.email);
      setPhone(values.phone);
      setAge(values.age);
      setTracker(values.trackScore);
      setSelector(values.selectedLanguage);
      alert("Details Submitted. Starting Quiz...");
      navigation("/question1");
    },
  });

  return (
    <div className="homeContainer">
      <form onSubmit={formik.handleSubmit} className="baseForm">
        <TextField
          id="name"
          label="Enter your name: "
          name="name"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          data-testid="form-name"
        />
        <TextField
          id="mail"
          label="Enter MailID: "
          name="email"
          type="email"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          data-testid="form-mailid"
        />
        <TextField
          id="age"
          label="Enter your age: "
          name="age"
          type="number"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.age}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
          data-testid="form-age"
        />
        <TextField
          id="phone"
          label="Enter your Phone Number: "
          name="phone"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          data-testid="form-phone"
        />
        <em>What language would you like the quiz to be in?</em>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="React JS"
          name="selectedLanguage"
          onChange={formik.handleChange}
          value={formik.values.selectedLanguage}
        >
          <FormControlLabel
            value="ReactJS"
            control={<Radio data-testid="form-language" />}
            label="ReactJS"
          />
          <FormControlLabel
            value="React Native"
            control={<Radio />}
            label="React Native"
          />
          <FormControlLabel value="Java" control={<Radio />} label="Java" />
        </RadioGroup>
        <em className="trackScore">Would you like your score to be tracked?</em>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="false"
          name="trackScore"
          onChange={formik.handleChange}
          value={formik.values.trackScore}
          data-testid="form-trackscore"
        >
          <FormControlLabel value="True" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
        <Button
          type="submit"
          variant="contained"
          disabled={!formik.isValid || !formik.dirty}
          date-testid="form-submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Home;
