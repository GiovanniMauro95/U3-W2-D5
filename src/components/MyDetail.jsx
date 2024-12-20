import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Row, Col, Spinner, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Sunrise, SunsetFill } from "react-bootstrap-icons";
import { fetch5DayForecast, fetchCurrentWeather } from "../redux/actions";

const WeatherDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const city = location.state ? location.state.city : null;

  useEffect(() => {
    if (city) {
      dispatch(fetchCurrentWeather(city.lat, city.lon));
      dispatch(fetch5DayForecast(city.lat, city.lon));
    }
  }, [city, dispatch]);

  const weatherData = useSelector((state) => state.detail.currentWeather.data);
  const forecastData = useSelector((state) => state.detail.fiveDayForecast.data);
  const loading = useSelector((state) => state.detail.currentWeather.loading);

  const renderForecast = () => {
    if (!forecastData) return null;
    return (
      <Row className="mt-4 justify-content-center">
        <h3 className="my-3 text-center">5-Day Forecast</h3>
        {forecastData.map((forecast, index) => (
          <Col key={`forecast-${index}`} xs={12} md={6} lg={4} xl={2} className="mb-4">
            <Card className="border-0 shadow-lg p-4">
              <Card.Body>
                <h6 className="text-center mb-3">
                  {new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "numeric",
                    day: "numeric",
                  })}
                </h6>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <img
                    className="bg-info border rounded-pill me-3"
                    src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt="img"
                    style={{ width: "60px", height: "60px" }}
                  />
                  <div>
                    <span className="fw-bold fs-4">{Math.round(forecast.main.temp)}°C</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const UnixSunriseTime = weatherData ? weatherData.sys.sunrise : null;
  const risedate = UnixSunriseTime ? new Date(UnixSunriseTime * 1000) : null;
  const risehours = risedate ? risedate.getHours() : null;
  const riseminutes = risedate ? risedate.getMinutes() : null;

  const UnixSunsetTime = weatherData ? weatherData.sys.sunset : null;
  const setdate = UnixSunsetTime ? new Date(UnixSunsetTime * 1000) : null;
  const sethours = setdate ? setdate.getHours() : null;
  const setminutes = setdate ? setdate.getMinutes() : null;

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card className="border-0 rounded">
            {loading ? (
              <div className="text-center m-3 border-0 rounded-0 ">
                <Spinner animation="border" variant="info" role="status" className="fs-4 text-center  "></Spinner>
              </div>
            ) : weatherData ? (
              <div>
                <Card.Body className="bg-info-subtle text-start border-0 rounded">
                  <Card.Title className="fs-2 ps-2 p-1">
                    {weatherData.name} , {weatherData.sys.country}
                  </Card.Title>
                  <div className="d-flex justify-content-center justify-content-md-start ms-md-4">
                    <img
                      className="bg-info border rounded-pill mb-2 mt-3 "
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                      alt="img"
                    ></img>
                  </div>
                  <Card.Text className="fs-3 text-center text-md-end me-md-5 my-1 fw-bold  ">
                    {weatherData.weather[0].main.toUpperCase()}
                  </Card.Text>
                  <Row className="flex-column-reverse flex-md-row ">
                    <Col>
                      <Card.Text className="fs-5 ms-5 my-5">
                        Temperatura {weatherData.main.temp}°C
                        <Card.Text className="fs-6 text-secondary m-0">
                          Temperatura Massima {weatherData.main.temp_max} °C
                        </Card.Text>
                        <Card.Text className="fs-6 text-secondary m-0">
                          Temperatura Minima {weatherData.main.temp_min} °C
                        </Card.Text>
                        <Card.Text className="fs-6 text-secondary m-0">
                          Temperatura Percepita {weatherData.main.feels_like} °C
                        </Card.Text>
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text className="fs-5 text-center text-md-end me-md-5">
                        {weatherData.weather[0].description}
                      </Card.Text>
                    </Col>
                  </Row>
                  <Row className="text-center fs-5">
                    <Col xs={12} sm={6}>
                      Alba <Sunrise className="mx-1" />
                      {risehours}:{riseminutes}
                    </Col>
                    <Col xs={12} sm={6}>
                      Tramonto <SunsetFill className="mx-1" />
                      {sethours}:{setminutes}
                    </Col>
                  </Row>
                </Card.Body>
                {renderForecast()}
              </div>
            ) : null}
          </Card>
        </Col>
      </Row>
      <div className="d-flex justify-content-center mt-3 pb-3">
        <Link to={"/"}>
          <Button variant="info" className="text-white">
            Torna alla Ricerca
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default WeatherDetail;
