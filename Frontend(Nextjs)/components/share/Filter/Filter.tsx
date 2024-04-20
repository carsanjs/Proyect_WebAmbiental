import React, { useState } from "react";

// Componente del diálogo
const FilterDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(""); 

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);

  };

  return (
    <div className={`dialog ${isOpen ? "open" : ""}`}>
      <div className="dialog-content">
        <button
          className={selectedFilter === "today" ? "active" : ""}
          onClick={() => handleFilterChange("today")}
        >
          Hoy
        </button>
        <button
          className={selectedFilter === "yesterday" ? "active" : ""}
          onClick={() => handleFilterChange("yesterday")}
        >
          Ayer
        </button>
        <button
          className={selectedFilter === "week" ? "active" : ""}
          onClick={() => handleFilterChange("week")}
        >
          Esta semana
        </button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default FilterDialog;