import React, { useState } from "react";
import NavBar from "../navBar/NavBar";
import { Box, Stack, Typography } from "@mui/material";
import CountryCases from "../LiveCases/CountryCases";
import ChartCases from "../chart/ChartCases";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cards from "../cardsData/Cards";
import MapShow from "../map/MapShow";
import axios from "axios";
import "../Loader/Loader.css";
import loaderImage from "../images/virus.png";

function Main() {
  const queryClient = useQueryClient();
  const [selectedCountry, setSelectedCountry] = useState("worldWide");
  const [casesCard, setCasesCard] = useState(true);
  const [recoveredCard, setRecoveredCard] = useState(false);
  const [deathCard, setDeathCard] = useState(false);
  const [loader, setLoader] = useState(true);

  const Cases_URL = "https://disease.sh/v3/covid-19/countries";
  const worldWide_URL = `https://disease.sh/v3/covid-19/all`;

  const worldWide = async () => {
    const response = await axios.get(worldWide_URL);
    return response.data;
  };

  const fetchData = async () => {
    if (selectedCountry === "worldWide") {
      setLoader(false);
      return worldWide();
    } else {
      const response = await axios.get(`${Cases_URL}/${selectedCountry}`);
      return response.data;
    }
  };

  const { data, error, isLoading } = useQuery(
    ["CountryData", selectedCountry],
    fetchData
  );

  if (isLoading || loader) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20%",
          }}
        >
          <img
            className="loaderImg"
            src={loaderImage}
            height={80}
            width={80}
            alt="loader"
          />
        </div>
      </>
    );
    // <Typography ml={"45%"} mt={"20%"} className="loader"></Typography>;
  }

  if (error) {
    alert("There are some issues our team has encountered soon");
  }

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
            loader={loader}
            setLoader={setLoader}
            fetchData={fetchData}
            data={data}
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
            isLoading={isLoading}
            casesCard={casesCard}
            recoveredCard={recoveredCard}
            deathCard={deathCard}
            loader={loader}
            setLoader={setLoader}
          />
        </Stack>
      </Stack>

      <Typography bgcolor={"#e8e8e8"} p={2} textAlign={"center"} variant="h6">
        Copyright © 2023. Developed By <b> "Ahmed ali"</b>
      </Typography>
    </>
  );
}
export default Main;
