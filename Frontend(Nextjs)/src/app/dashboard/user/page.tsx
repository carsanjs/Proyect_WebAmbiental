'use client'
import VappCard from '../../../../components/view/TCardMeteorologi/VappCard';
// import NavBar from '../../../../components/view/PanelWeather/NavBar'
import WeatherPanel from '../../../../components/view/PanelWeather/WeatherPanel'
import { useState } from 'react';

interface FormData {
  city: string;
}

export default function Dashboard() {
  const [showDefaultCard, setShowDefaultCard] = useState(true);
  const handleFormSubmit = (formData: FormData) => {

    setShowDefaultCard(false);
  };
  return (

    <main className='overflow-hidden'>

 {showDefaultCard ? (
  <VappCard /> 
 ) : (
  <div className="Api"></div>
 )
}
  </main>
  );
}
