"use client";
import WeatherPanel from "../../../../../components/view/PanelWeather/WeatherPanel";
import { useState } from "react";
import VappCard from "../../../../../components/view/TCardMeteorologi/VappCard";
import Header from "../../../../../components/share/Header";

const Page = () => {
  const [showDefaultCard, setShowDefaultCard] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");

  const handleFormSubmit = (city: string) => {
    if (city.trim() === "") {
      setShowDefaultCard(true);
      setCity("");
    } else {
      setShowDefaultCard(false);
      setCity(city.trim());
    }
    
  };
  return (
    <>
      <Header
        onFormSubmit={handleFormSubmit}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="w-full mx-auto max-w-screen-2xl h-screen md:p-2 2xl:p-0">
        <main className="overflow-hidden h-full">
          {showDefaultCard ? (
            <VappCard />
          ) : 
            <WeatherPanel city={city} />
          }
        </main>
      </div>
    </>
  );
};
export default Page;
