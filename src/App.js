import "./App.css";
// components
// styles
import "./styles/main.css";
//hooks
import { useEffect, useState } from "react";
// theme
import { createTheme, ThemeProvider } from "@mui/material/styles";
// material ui components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
//icons
import CloudIcon from "@mui/icons-material/Cloud";
//External Libraries
import moment from "moment";
//redux library
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./features/weather/weatherApiSlice";
//moment library
import "moment/min/locales";
import { useTranslation } from "react-i18next";
moment.locale("en");

const theme = createTheme({
  typography: {
    fontFamily: "IBM",
  },
});

function App() {
  //redux
  const isLoading = useSelector((state) => {
    return state.weatherApi.isLoading;
  });
  const temp = useSelector((state) => {
    return state.weatherApi.weather;
  });
  const dispatch = useDispatch();
  // states
  const { t, i18n } = useTranslation();
  const [local, setLocal] = useState("en");

  const [timeAndDate, setTimeAndDate] = useState("");
  // start handlers\
  function handleLanguageClick() {
    if (local === "ar") {
      setLocal("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    } else {
      setLocal("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
    setTimeAndDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }
  // end handlers
  useEffect(() => {
    //trying redux
    dispatch(fetchWeather());
  }, []);
  useEffect(() => {
    setTimeAndDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
    i18n.changeLanguage(local);
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" style={{}}>
          {/* start container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            {/* start card */}
            <div
              style={{
                backgroundColor: "rgb(28 52 91/ 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "0px 15px",
                boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.37)",
                width: "100%",
                direction: local === "ar" ? "rtl" : "ltr",
              }}
            >
              {/* start content */}
              <div>
                {/* start city & Time */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    direction: local === "ar" ? "rtl" : "ltr",
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      textTransform: "capitalize",
                      marginRight: local === "en" ? "20px" : "0px",
                      marginLeft: local === "ar" ? "20px" : "0px",
                      fontWeight: "600",
                    }}
                  >
                    {t("Egypt")}
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{ textTransform: "capitalize", fontWeight: "bold" }}
                  >
                    {timeAndDate}
                  </Typography>
                </div>
                {/* end city & Time */}
                <hr />
                {/* start degree & description */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>
                    {/* start temp */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        ""
                      )}
                      <Typography variant="h1" style={{ textAlign: "end" }}>
                        {temp.temperature}
                      </Typography>
                      {/* start todo temp image */}
                      <img src={temp.icon} alt={"test"} />
                      {/* end todo temp image */}
                    </div>
                    {/* end temp */}
                    <Typography variant="h6" style={{}}>
                      {t(temp.description)}
                    </Typography>
                    {/* start min & max */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("min")}: {temp.min}
                      </h5>
                      <h5>|</h5>
                      <h5>
                        {t("max")}: {temp.max}
                      </h5>
                    </div>
                    {/* end min & max */}
                  </div>
                  {/* end degree & description */}
                  <CloudIcon style={{ fontSize: "200px", color: "white" }} />
                </div>
              </div>
              {/* end content */}
            </div>
            {/* end card */}
            {/* start translation button */}
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
              }}
            >
              <Button
                variant="text"
                style={{
                  color: "white",
                  backgroundColor: "rgba(128, 128, 128, 0.349)",
                  padding: "2px 5px",
                  marginTop: "10px",
                  fontWeight: "bold",
                  borderRadius: "6px",
                  textTransform: "capitalize",
                }}
                onClick={handleLanguageClick}
              >
                {local === "en" ? "Arabic" : "English"}
              </Button>
            </div>
            {/* end translation button */}
          </div>
          {/* end container */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
