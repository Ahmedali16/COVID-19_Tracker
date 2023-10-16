import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const LiveCases_URL = "https://disease.sh/v3/covid-19/countries";

export default function CountryCases() {
  const LiveCases = async () => {
    const response = await axios.get(LiveCases_URL);
    return response.data;
  };
  const { data } = useQuery({
    queryKey: ["sorted"],
    queryFn: LiveCases,
  });

  const sortedData = data ? [...data].sort((a, b) => b.cases - a.cases) : null;

  return (
    <Box width={"100%"}>
      <List
        sx={{
          m: 0,
          borderRadius: 5,
          boxShadow: 10,
          width: "100%",
          overflow: "auto",
          maxHeight: 350,
          bgcolor: "white",

          "& ul": { padding: 0 },
        }}
      >
        <ul>
          {sortedData?.map((item) => (
            <ListItem key={item.country}>
              <ListItemText
                sx={{
                  bgcolor: "#E8E8E8",
                  p: 1,
                  px: 1,
                  my: -0.5,
                  borderRadius: 2,
                }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Box>{item.country}</Box>
                  <Box fontWeight="bold">{numberWithCommas(item.cases)}</Box>
                </Box>
              </ListItemText>
            </ListItem>
          ))}
        </ul>
      </List>
    </Box>
  );
}
