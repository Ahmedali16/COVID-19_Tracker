import React from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Countries_URL = "https://disease.sh/v3/covid-19/countries";

function NavBar({ selectedCountry, handleCountryChange }) {
  const CountriesName = async () => {
    const response = await axios.get(Countries_URL);
    return response.data;
  };

  const { data: countriesData } = useQuery({
    queryKey: "CountriesData",
    queryFn: CountriesName,
  });

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <MenuItem value="worldWide">worldWide</MenuItem>
              {countriesData?.map((item) => (
                <MenuItem key={item.country} value={item.country}>
                  {item.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}

export default NavBar;
