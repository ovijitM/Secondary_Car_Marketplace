import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./Filter.css";

const Filter = () => {
  const [brands] = useState(["Brand A", "Brand B", "Brand C"]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedModel, setSelectedModel] = useState("Select brand first");
  const [cities] = useState(["City A", "City B", "City C"]);
  const [conditions] = useState(["New", "Used", "Certified"]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [priceRange, setPriceRange] = useState([1, 100000000]);
  const navigate = useNavigate();


  useEffect(() => {
    if (selectedBrand === "Brand A") {
      setModels(["Model A1", "Model A2"]);
    } else if (selectedBrand === "Brand B") {
      setModels(["Model B1", "Model B2"]);
    } else {
      setModels([]);
    }
    setSelectedModel("Select brand first");
  }, [selectedBrand]);


  const handleSearch = () => {
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
    <>
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
                {cities.map((city) => (
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
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
              />
              <input
                type="range"
                min="1"
                max="100000000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
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

              <button onClick={sell} >sell cars</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
