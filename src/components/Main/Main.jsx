import React, { useState } from "react";
import NavBar from "../navBar/NavBar";
import { Box, Stack, Typography } from "@mui/material";
import CountryCases from "../LiveCases/CountryCases";
import ChartCases from "../chart/ChartCases";
import { useQueryClient } from "@tanstack/react-query";
import Cards from "../cardsData/Cards";
import MapShow from "../map/MapShow";

function Main() {
  const queryClient = useQueryClient();
  const [selectedCountry, setSelectedCountry] = useState("worldWide");
  const [casesCard, setCasesCard] = useState(true);
  const [recoveredCard, setRecoveredCard] = useState(false);
  const [deathCard, setDeathCard] = useState(false);

  const handleCardClick = () => {
    setDeathCard(false);
    setRecoveredCard(false);
    setCasesCard(!casesCard);
  };

  const handleRecovered = () => {
    setCasesCard(false);
    setDeathCard(false);
    setRecoveredCard(!recoveredCard);
  };

  const handleDeath = () => {
    setRecoveredCard(false);
    setCasesCard(false);
    setDeathCard(!deathCard);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    queryClient.invalidateQueries(["CountryData", selectedCountry]);
  };

  const myBgColor = casesCard
    ? "red"
    : recoveredCard
    ? "green"
    : deathCard
    ? "#ed752f"
    : "black";
  return (
    <>
      <Stack
        width={"100%"}
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Stack
          direction={"column"}
          sx={{ width: { xs: "unset", md: "100%" } }}
          p={3}
        >
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
          >
            <Typography variant="h4" color={"#8b0000"} fontWeight={"bold"}>
              COVID-19 TRACKER
            </Typography>
            <Box>
              <NavBar
                selectedCountry={selectedCountry}
                handleCountryChange={handleCountryChange}
              />
            </Box>
          </Stack>

          <Cards
            selectedCountry={selectedCountry}
            casesCard={casesCard}
            handleCardClick={handleCardClick}
            recoveredCard={recoveredCard}
            handleRecovered={handleRecovered}
            deathCard={deathCard}
            handleDeath={handleDeath}
          />
          <Box boxShadow={10} borderRadius={5} height={"500px"} p={2}>
            <MapShow
              selectedCountry={selectedCountry}
              casesCard={casesCard}
              recoveredCard={recoveredCard}
              deathCard={deathCard}
            />
          </Box>
        </Stack>

        <Stack
          bgcolor={"#ffffff"}
          p={2}
          m={2}
          justifyContent={"center"}
          sx={{
            maxWidth: {
              xs: "95%",
              md: "30%",
            },
            width: {
              xs: "unset",
              md: "100%",
            },
          }}
          height={"100%"}
          alignItems={"center"}
          boxShadow={5}
          borderRadius={5}
          flexShrink={2}
        >
          <Typography variant="h5" fontWeight={"bold"} color={"#8b0000"} my={2}>
            Live Cases By Country
          </Typography>
          <CountryCases />
          <ChartCases
            casesCard={casesCard}
            recoveredCard={recoveredCard}
            deathCard={deathCard}
          />
        </Stack>
      </Stack>

      <Typography
        bgcolor={myBgColor}
        color={"white"}
        p={2}
        textAlign={"center"}
        variant="h6"
      >
        Copyright © 2023. Developed By <b> "Ahmed Ali"</b>
      </Typography>
    </>
  );
}
export default Main;
