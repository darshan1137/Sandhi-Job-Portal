import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  MenuItem,
  Snackbar,
  Card
} from "@mui/material";
import { styled } from "@mui/system";
import { db } from "../Firebase/config.js"; // Ensure this path is correct
import { collection, addDoc } from "firebase/firestore";
import Navbar from "./Navbar.jsx";

const StyledForm = styled("form")({
  marginTop: "2rem",
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
});

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
    requirements: "",
    salary: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "title",
      "company",
      "location",
      "type",
      "description",
    ];
    for (let field of requiredFields) {
      if (!jobData[field]) {
        setSnackbar({
          open: true,
          message: `Please fill out the ${field} field.`,
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await addDoc(collection(db, "jobs"), jobData);
      setSnackbar({ open: true, message: "Job posted successfully!" });
      setJobData({
        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
        requirements: "",
        salary: "",
      });
    } catch (error) {
      console.error("Error posting job: ", error);
      setSnackbar({
        open: true,
        message: "Error posting job. Please try again.",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

 return (
  <>
    <Navbar />
    <Container maxWidth="md" className="mt-10">
      <Card className="p-8 shadow-lg rounded-2xl">
        <Typography variant="h4" component="h1" gutterBottom className="mb-6">
          Post a New Job
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                required
                helperText="Enter the title of the job role"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={jobData.company}
                onChange={handleChange}
                required
                helperText="Enter the company name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                required
                helperText="E.g., Mumbai, Remote"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Job Type"
                name="type"
                value={jobData.type}
                onChange={handleChange}
                required
                helperText="Select full-time, part-time, etc."
              >
                {jobTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={4}
                maxRows={10}
                label="Job Description"
                name="description"
                value={jobData.description}
                onChange={handleChange}
                required
                helperText="Provide detailed information about the role"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Requirements"
                name="requirements"
                value={jobData.requirements}
                onChange={handleChange}
                helperText="List skills and qualifications"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                type="number"
                helperText="Enter numeric salary (e.g., 50000)"
              />
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            className="mt-6 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition"
          >
            Post Job
          </StyledButton>
        </StyledForm>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Container>
  </>
);

};

export default PostJob;
