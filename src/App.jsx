import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/custom/Header.jsx";
import Hero from "./components/custom/Hero.jsx";
import CreateTrip from "./components/routes/plan-a-trip/CreateTrip.jsx";
import Mytrips from "./components/routes/my-trips/[tripId]/Mytrips.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { LogInContext } from "./Context/LogInContext/Login.jsx";
import Footer from "./components/custom/Footer.jsx";
import Alltrips from "./components/routes/all-trips/Alltrips.jsx";
import toast from "react-hot-toast";
import gsap from "gsap";
import ProgressBar from "./components/constants/ProgressBar.jsx";
import { useRefContext } from "./Context/RefContext/RefContext.jsx";
import HotelDetails from "./components/routes/placesDetails/HotelDetails.jsx";
import PlacesDetails from "./components/routes/placesDetails/PlacesDetails.jsx";
import Banner from "./components/custom/Banner.jsx";

function App() {
  const { user, isAuthenticated } = useContext(LogInContext);
  const [loggedIn, setLoggedIn] = useState(false);

  const location = useLocation();

  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const createTripPageRef = useRef(null);
  const HotelDetailsPageRef = useRef(null);
  const PlaceDetailsPageRef = useRef(null);
  const footerRef = useRef(null);
  const { locationInfoRef } = useRefContext();

  useEffect(() => {
    if (!loggedIn && isAuthenticated) {
      setLoggedIn(true);
      toast.success("Logged In Successfully");
    }
  }, [user]);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "elastic.out(1,1)" } });

    // Header
    timeline.from(headerRef.current, { delay: 0.5, opacity: 0, y: -100 });

    // Hero
    const heading = heroRef.current?.querySelector(".heading");
    const desc = heroRef.current?.querySelector(".desc");
    const buttons = heroRef.current?.querySelector(".buttons");
    const marquee = heroRef.current?.querySelector(".marquee");
    if (heading && desc && buttons && marquee) {
      timeline
        .from(heading, { opacity: 0, y: 100 })
        .from(desc, { opacity: 0, y: 100 }, "-=0.3")
        .from(buttons, { opacity: 0, y: 100 }, "-=0.3")
        .from(marquee, { y: 100, opacity: 0 }, "-=0.3");
    }

    // Create Trip Page
    const text = createTripPageRef.current?.querySelector(".text");
    const place = createTripPageRef.current?.querySelector(".place");
    const day = createTripPageRef.current?.querySelector(".day");
    const budget = createTripPageRef.current?.querySelector(".budget");
    const people = createTripPageRef.current?.querySelector(".people");
    const createTripBtn =
      createTripPageRef.current?.querySelector(".create-trip-btn");
    if (text && place && day && budget && people && createTripBtn) {
      timeline
        .from(text, { opacity: 0, y: 100 })
        .from(place, { opacity: 0, y: 100 }, "-=0.3")
        .from(day, { opacity: 0, y: 100 }, "-=0.3")
        .from(budget, { opacity: 0, y: 100 }, "-=0.3")
        .from(people, { opacity: 0, y: 100 }, "-=0.3")
        .from(createTripBtn, { opacity: 0, y: 100 }, "-=0.3");
    }

    // Location info
    const location = locationInfoRef?.current?.querySelector(".location");
    const carousel = locationInfoRef?.current?.querySelectorAll(".carousel");
    const locationInfo =
      locationInfoRef?.current?.querySelector(".location-info");
    if (location && carousel && locationInfo) {
      timeline
        .from(location, { opacity: 0, y: 100 })
        .from(carousel, { opacity: 0, y: 100 })
        .from(locationInfo, { opacity: 0, y: 100 });
    }

    // Hotels-Details
    const hotelDetails =
      HotelDetailsPageRef?.current?.querySelector(".hotel-details");
    const mapLocation =
      HotelDetailsPageRef?.current?.querySelector(".map-location");
    const hotelMap = HotelDetailsPageRef?.current?.querySelector(".hotel-map");
    const nearbyPlaces =
      HotelDetailsPageRef?.current?.querySelector(".nearby-places");
    const placesList =
      HotelDetailsPageRef?.current?.querySelector(".places-list");
    if (hotelDetails && mapLocation && hotelMap && nearbyPlaces && placesList) {
      timeline
        .from(hotelDetails, { opacity: 0, y: 100 })
        .from(mapLocation, { opacity: 0, y: 100 })
        .from(hotelMap, { opacity: 0, y: 100 })
        .from(nearbyPlaces, { opacity: 0, y: 100 })
        .from(placesList, { opacity: 0, y: 100 });
    }

    // Places-Details
    const placeDetails =
      HotelDetailsPageRef?.current?.querySelector(".place-details");
    const mapLocationPlace = HotelDetailsPageRef?.current?.querySelector(
      ".map-location-place"
    );
    const placeMap = HotelDetailsPageRef?.current?.querySelector(".place-map");
    const nearbyLocations =
      HotelDetailsPageRef?.current?.querySelector(".nearby-locations");
    const locationList =
      HotelDetailsPageRef?.current?.querySelector(".location-list");
    if (
      placeDetails &&
      mapLocationPlace &&
      placeMap &&
      nearbyLocations &&
      locationList
    ) {
      timeline
        .from(placeDetails, { opacity: 0, y: 100 })
        .from(mapLocationPlace, { opacity: 0, y: 100 })
        .from(placeMap, { opacity: 0, y: 100 })
        .from(nearbyLocations, { opacity: 0, y: 100 })
        .from(locationList, { opacity: 0, y: 100 });
    }

    // Footer
    timeline.from(footerRef.current, { opacity: 0, y: 100 });

    return () => {
      timeline.kill();
    };
  }, [location.pathname]);

  return (
    <>
      <ProgressBar />
      <Banner/>
      <div className="app tracking-tighter min-w-[320px]">
        <Header headerRef={headerRef} />
        <div className="container max-w-[1024px] w-full min-w-[320px] h-auto">
          <Routes>
            <Route path="/" element={<Hero heroRef={heroRef} />} />
            <Route
              path="/plan-a-trip"
              element={<CreateTrip createTripPageRef={createTripPageRef} />}
            />
            <Route
              path="/my-trips/:tripId"
              element={isAuthenticated ? <Mytrips /> : <Hero />}
            />
            <Route
              path="/all-trips"
              element={isAuthenticated ? <Alltrips /> : <Hero />}
            />
            <Route
              path="/details-for-hotel/:lat/:lng"
              element={
                isAuthenticated ? (
                  <HotelDetails HotelDetailsPageRef={HotelDetailsPageRef} />
                ) : (
                  <Hero />
                )
              }
            />
            <Route
              path="/details-for-place/:lat/:lng"
              element={
                isAuthenticated ? (
                  <PlacesDetails PlaceDetailsPageRef={PlaceDetailsPageRef} />
                ) : (
                  <Hero />
                )
              }
            />
          </Routes>
        </div>
        <Footer footerRef={footerRef} />
      </div>
    </>
  );
}

export default App;
