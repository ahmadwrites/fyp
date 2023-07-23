import React from "react";
import { Box, Button, Typography } from "@mui/material";

const TutorialStep = ({
  tutorial,
  activeStep,
  handleBack,
  //   isStepOptional,
  handleSkip,
  steps,
  handleNext,
  handleReset,
}) => {
  return (
    <Box>
      <Box
        sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: { xs: 2, md: 2 },
          borderRadius: 4,
          bgcolor: "#fff",
          mt: 4,
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            textAlign: "center",
          }}
          color="text.primary"
          variant="h5"
          marginBottom={{ xs: ".5rem", md: "1rem" }}
        >
          {tutorial.title}
        </Typography>
        <Box
          component="img"
          sx={{
            width: "100%",
            objectFit: "contain",
            height: { xs: "300px", md: "250px", xl: "450px" },
          }}
          src={tutorial.img}
        ></Box>
        <Typography variant={"subtitle1"} sx={{ textAlign: "center" }} mt={4}>
          {tutorial.desc}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            variant="contained"
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {/* {isStepOptional(activeStep) && (
          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
            Skip
          </Button>
        )} */}
          {activeStep === steps.length ? (
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TutorialStep;
