import React, { useState, useEffect } from 'react';

const LoadingSpinner: React.FC = () => {
  const [loadingText, setLoadingText] = useState<string>('');

  useEffect(() => {
    const texto = '  Vambiental ';
    const arr = texto.split('');
    let i = 0;

    const intervalId = setInterval(() => {
      if (i === arr.length - 1) {
        setLoadingText((prevText) => prevText + arr[i]);
        clearInterval(intervalId);
      } else {
        setLoadingText((prevText) => prevText + arr[i]);
        i++;
      }
    }, 50); // Ajusta la velocidad

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-4xl font-bold text-center">
        <div className="inline-block animate-spin mr-2"></div>
        {loadingText}
      </div>
    </div>
  );
};

export default LoadingSpinner;
