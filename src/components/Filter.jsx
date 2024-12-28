import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Filter.css";

const Filter = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedModel, setSelectedModel] = useState("Select brand first");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [priceRange, setPriceRange] = useState([1, 100000000]);
  const navigate = useNavigate();


  const loadBrands = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/brands");
      const data = await response.json();

      if (data.success) {
        setBrands(data.brands);
      } else {
        console.error("Error fetching brands:", data.message);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  
  const loadConditions = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/conditions");
      const data = await response.json();

      if (data.success) {
        setConditions(data.conditions);
      } else {
        console.error("Error fetching conditions:", data.message);
      }
    } catch (error) {
      console.error("Error fetching conditions:", error);
    }
  };

  const loadModels = async (brand) => {
    if (brand === "All") {
      setModels([]);
      setSelectedModel("Select brand first");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/models?brand=${brand}`);
      const data = await response.json();

      if (data.success) {
        setModels(data.models);
        setSelectedModel(data.models[0] || "Select brand first");
      } else {
        console.error("Error fetching models:", data.message);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };


  useEffect(() => {
    loadBrands();
    loadConditions();
  }, []);


  useEffect(() => {
    loadModels(selectedBrand);
  }, [selectedBrand]);

  const handleSearch = () => {
    if (selectedModel === "Select brand first") {
      console.warn("Please select a valid brand and model before searching.");
      return;
    }

    console.log("Searching with:", {
      selectedBrand,
      selectedModel,
      selectedCity,
      selectedCondition,
      priceRange,
    });
  };


  const sell = () => {
    navigate("/Postcar");
  };

  return (
    <div className="filter">
      <div className="car-filter">
        <div className="filter-container">
          <div className="filter-group">
            <label>Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="All">All</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={selectedBrand === "All"}
            >
              <option value="Select brand first">Select brand first</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="All">All</option>
              {["City A", "City B", "City C"].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>


          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="filter-container">
          <div className="filter-group price-range">
            <label>Price Range</label>
            <input
              type="range"
              min="1"
              max="100000000"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([
                  Math.min(Number(e.target.value), priceRange[1]),
                  priceRange[1],
                ])
              }
            />
            <input
              type="range"
              min="1"
              max="100000000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Math.max(Number(e.target.value), priceRange[0]),
                ])
              }
            />
            <div className="price-range-display">{`Selected Price Range: ${priceRange[0]} BDT - ${priceRange[1]} BDT`}</div>
          </div>

          <div className="filter-group">
            <label>Condition</label>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
            >
              <option value="All">All</option>
              {conditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>

          <div className="additional-features">
            <span>Didn’t find what you were looking for?</span>
            <button onClick={sell}>Sell Cars</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
