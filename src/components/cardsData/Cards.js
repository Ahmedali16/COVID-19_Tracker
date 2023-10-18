import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

const formatNumber = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}m`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  } else {
    return value;
  }
};

export default function Cards({
  casesCard,
  handleCardClick,
  recoveredCard,
  handleRecovered,
  deathCard,
  handleDeath,
  data,
}) {
  return (
    <>
      <Stack sx={{ flexDirection: { xs: "column", sm: "row" } }} gap={2} my={3}>
        <Card
          sx={{
            width: "100%",
            cursor: "pointer",
            borderTop: casesCard ? "7px solid red" : "1px solid transparent",
            boxShadow: "0 0 3px rgba(255, 0, 0, 0.5)",
            transition: "0.3s",
          }}
          onClick={handleCardClick}
          tabIndex="0"
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Corona Cases
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {data?.todayCases !== 0 ? (
                <Typography color="red" fontWeight={600} variant="h4">
                  +{formatNumber(data?.todayCases)}
                </Typography>
              ) : (
                <Typography color="red" fontWeight={600} variant="h4">
                  No Cases
                </Typography>
              )}
            </Typography>
            <Typography variant="body2">
              +{formatNumber(data?.cases)} total
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: "100%",
            cursor: "pointer",
            borderTop: recoveredCard
              ? "7px solid green"
              : "1px solid transparent",
            boxShadow: "0 0 3px green",
            transition: "0.3s",
          }}
          onClick={handleRecovered}
          tabIndex="0"
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Recovered
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {data?.todayRecovered !== 0 ? (
                <Typography color="green" fontWeight={600} variant="h4">
                  +{formatNumber(data?.todayRecovered)}
                </Typography>
              ) : (
                <Typography color="green" fontWeight={600} variant="h4">
                  No Recovered
                </Typography>
              )}
            </Typography>
            <Typography variant="body2">
              +{formatNumber(data?.recovered)} total
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: "100%",
            cursor: "pointer",
            borderTop: deathCard
              ? "7px solid #ed752f"
              : "1px solid transparent",
            boxShadow: "0 0 3px #ed752f",
            transition: "0.3s",
          }}
          onClick={handleDeath}
          tabIndex="0"
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Deaths
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {data?.todayDeaths !== 0 ? (
                <Typography color="#ed752f" fontWeight={600} variant="h4">
                  +{formatNumber(data?.todayDeaths)}
                </Typography>
              ) : (
                <Typography color="#ed752f" fontWeight={600} variant="h4">
                  No Death
                </Typography>
              )}
            </Typography>
            <Typography variant="body2">
              +{formatNumber(data?.deaths)} total
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}
