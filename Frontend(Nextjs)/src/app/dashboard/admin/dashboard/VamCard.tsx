"use client";
import WeatherPanel from "../../../../../components/view/PanelWeather/WeatherPanel";
import { useState, lazy, Suspense, useEffect } from "react";
import VappCard from "../../../../../components/view/TCardMeteorologi/VappCard";
import Header from "../../../../../components/share/Header";
import Loader from "../../../../../components/ui/loader/index"

const Page= () =>{
  const [showDefaultCard, setShowDefaultCard] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [city, setCity] = useState("");

  const handleFormSubmit = (city: string) => {
    if (city === '') {
      setShowDefaultCard(true);
      setCity('');
    } else {
      setCity(city);
      setShowDefaultCard(false);
    }
  };
  return (
   <>
    <Header onFormSubmit={handleFormSubmit}  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className="w-full mx-auto max-w-screen-2xl h-screen md:p-2 2xl:p-0"> 
          <main className="overflow-hidden">
            {showDefaultCard ? (<VappCard />) : 
            (
              <div className="Api">
                <WeatherPanel city={city} />
              </div>
            )}
          </main>
        </div> 
      </>
  );
}
export default Page;
