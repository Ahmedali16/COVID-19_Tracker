import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

class MapShow extends Component {
  state = {
    initialized: false,
  };

  componentDidMount() {
    this.initializeMap();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.selectedCountry !== prevProps.selectedCountry) {
      this.updateMap();
    }

    const { casesCard } = this.props;
    const { recoveredCard } = this.props;
    const { deathCard } = this.props;

    if (casesCard && this.props.casesCard !== prevProps.casesCard) {
      this.updateMap();
    }

    if (recoveredCard && this.props.recoveredCard !== prevProps.recoveredCard) {
      this.updateMap();
    }

    if (deathCard && this.props.deathCard !== prevProps.deathCard) {
      this.updateMap();
    }
  }

  async initializeMap() {
    if (!this.state.initialized) {
      const mapContainer = document.getElementById("map");
      mapContainer.style.height = "100%";

      const map = L.map("map").setView([30, 70], 4);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      this.map = map;
      this.setState({ initialized: true });
      this.updateMap();
    }
  }

  async updateMap() {
    const { selectedCountry } = this.props;
    const { casesCard } = this.props;
    const { recoveredCard } = this.props;
    const { deathCard } = this.props;

    this.map.eachLayer((layer) => {
      if (layer instanceof L.Circle) {
        this.map.removeLayer(layer);
      }
    });

    try {
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      const casesData = response.data;

      casesData.forEach((country) => {
        const lat = country.countryInfo.lat || 0;
        const long = country.countryInfo.long || 0;

        if (recoveredCard) {
          L.circle([lat, long], {
            color: "#7ed71f",
            fillColor: "#98d592",
            fillOpacity: 0.3,
            radius: Math.sqrt(country.recovered) * 600,
          })
            .bindPopup(
              `<img height=80 width=120 src="${country.countryInfo.flag}" alt="pk"/> <br><b>${country.country}</b><br>Cases: ${country.cases}<br>Deaths: ${country.deaths}<br>Recovered: ${country.recovered}`
            )
            .addTo(this.map);
        } else if (deathCard) {
          L.circle([lat, long], {
            color: "#ed752f",
            fillColor: "#ed752f",
            fillOpacity: 0.3,
            radius: Math.sqrt(country.recovered) * 100,
          })
            .bindPopup(
              `<img height=80 width=120 src="${country.countryInfo.flag}" alt="pk"/> <br><b>${country.country}</b><br>Cases: ${country.cases}<br>Deaths: ${country.deaths}<br>Recovered: ${country.recovered}`
            )
            .addTo(this.map);
        }

        if (casesCard) {
          L.circle([lat, long], {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.3,
            radius: Math.sqrt(country.cases) * 400,
          })
            .bindPopup(
              `<img height=80 width=120 src="${country.countryInfo.flag}" alt="pk"/> <br><b>${country.country}</b><br>Cases: ${country.cases}<br>Deaths: ${country.deaths}<br>Recovered: ${country.recovered}`
            )
            .addTo(this.map);
        }
      });

      const selectedCountryData = casesData.find(
        (country) => country.country === selectedCountry
      );

      if (selectedCountryData) {
        this.map.panTo([
          selectedCountryData.countryInfo.lat,
          selectedCountryData.countryInfo.long,
        ]);
      }
    } catch (error) {
      console.error("Error fetching COVID-19 data", error);
    }
  }

  render() {
    return <div style={{ width: "100%", height: "100%" }} id="map"></div>;
  }
}

export default MapShow;
