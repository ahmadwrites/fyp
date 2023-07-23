import {
  Box,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import TutorialData from "./TutorialData";
import theme from "../../theme";
import TutorialStep from "./TutorialStep";

const steps = ["Create Game", "Accept Users", "Communicate", "Play"];

const Tutorial = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  //   const isStepOptional = (step) => {
  //     return step === 1;
  //   };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   throw new Error("You can't skip a step that isn't optional.");
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: { xs: "1rem", md: "2rem" }, my: { xs: 4, md: 2 } }}>
        <Typography
          sx={{
            background: `-webkit-linear-gradient(30deg, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`,
            "-webkit-background-clip": "text",
            " -webkit-text-fill-color": "transparent",
            fontWeight: 600,
            textAlign: "center",
          }}
          variant="h4"
          marginBottom={{ xs: "1rem", md: "2rem" }}
        >
          How It Works
        </Typography>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <TutorialStep
            tutorial={TutorialData[TutorialData.length - 1]}
            activeStep={activeStep}
            handleBack={handleBack}
            // isStepOptional={isStepOptional}
            handleSkip={handleSkip}
            steps={steps}
            handleNext={handleNext}
            handleReset={handleReset}
          />
        ) : (
          <TutorialStep
            tutorial={TutorialData[activeStep]}
            activeStep={activeStep}
            handleBack={handleBack}
            // isStepOptional={isStepOptional}
            handleSkip={handleSkip}
            handleReset={handleReset}
            steps={steps}
            handleNext={handleNext}
          />
        )}
      </Box>
    </Container>
  );
};

export default Tutorial;
