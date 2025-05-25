import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, resetFilters } from '../../store/uiSlice';
import './EnhancedFoodFilter.css';
// import PriceRangeSlider from './PriceRangeSlider'; // To be created
// import CustomToggle from './CustomToggle'; // For Veg/Non-Veg, to be created

// Mock categories, replace with dynamic data if needed
const foodCategories = ["All", "Pizza", "Burger", "Salad", "Pasta", "Sushi", "Indian", "Chinese", "Desserts"];
const sortOptionsAvailable = [
  { value: 'rating_desc', label: 'Rating (High to Low)' },
  { value: 'price_asc', label: 'Price (Low to High)' },
  { value: 'price_desc', label: 'Price (High to Low)' },
  { value: 'name_asc', label: 'Name (A-Z)' },
];

const EnhancedFoodFilter = () => {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state) => state.ui.filters);
  const currentSort = useSelector((state) => state.ui.sortOptions);

  // Local state to manage filter inputs before dispatching (for debounce)
  const [localSearchTerm, setLocalSearchTerm] = useState(currentFilters.searchTerm);
  const [localPriceRange, setLocalPriceRange] = useState(currentFilters.priceRange);
  const [localVegToggle, setLocalVegToggle] = useState(currentFilters.vegetarian); // null, true, false
  const [selectedCategories, setSelectedCategories] = useState(currentFilters.categories);

  // Debounce function
  const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedDispatchSearch = useCallback(
    debounce((value) => dispatch(setFilter({ filterName: 'searchTerm', value })), 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedDispatchSearch(localSearchTerm);
  }, [localSearchTerm, debouncedDispatchSearch]);
  
  // Handle direct dispatches for non-debounced filters
  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    if (category === "All") {
        setSelectedCategories([]);
        dispatch(setFilter({ filterName: 'categories', value: [] }));
    } else {
        const updatedCategories = newCategories.filter(c => c !== "All");
        setSelectedCategories(updatedCategories);
        dispatch(setFilter({ filterName: 'categories', value: updatedCategories }));
    }
  };

  const handleVegToggleChange = (value) => { // value: null, true, false
    setLocalVegToggle(value);
    dispatch(setFilter({ filterName: 'vegetarian', value }));
  };
  
  const handlePriceChange = (newRange) => { // newRange: [min, max]
    setLocalPriceRange(newRange);
    // Debounce or dispatch directly based on slider behavior
    dispatch(setFilter({ filterName: 'priceRange', value: newRange }));
  };

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split('_');
    dispatch(setFilter({ filterName: 'sortOptions', value: { sortBy, sortOrder } }));
  };
  
  const handleResetFilters = () => {
    dispatch(resetFilters());
    setLocalSearchTerm('');
    setLocalPriceRange([0,100]);
    setLocalVegToggle(null);
    setSelectedCategories([]);
  };

  return (
    <div className="enhanced-food-filter-container section-padding">
      <div className="container">
        <h3 className="filter-title">Find Your Perfect Meal</h3>
        <div className="filter-controls-grid">
          {/* Search Bar */}
          <div className="filter-group search-filter">
            <label htmlFor="search-food">Search</label>
            <input 
              type="text" 
              id="search-food"
              placeholder="Search by name or ingredient..." 
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)} 
            />
          </div>

          {/* Veg/Non-Veg Toggle (Placeholder for CustomToggle) */}
          <div className="filter-group veg-toggle-filter">
            <label>Dietary Preference</label>
            <div className="veg-options">
                 <button onClick={() => handleVegToggleChange(null)} className={localVegToggle === null ? 'active' : ''}>All</button>
                 <button onClick={() => handleVegToggleChange(true)} className={localVegToggle === true ? 'active veg' : 'veg'}>Veg</button>
                 <button onClick={() => handleVegToggleChange(false)} className={localVegToggle === false ? 'active non-veg' : 'non-veg'}>Non-Veg</button>
            </div>
            {/* <CustomToggle value={localVegToggle} onChange={handleVegToggleChange} /> */}
          </div>

          {/* Price Range Slider (Placeholder) */}
          <div className="filter-group price-filter">
            <label htmlFor="price-range">Price Range: ${localPriceRange[0]} - ${localPriceRange[1]}</label>
            {/* <PriceRangeSlider value={localPriceRange} onChange={handlePriceChange} /> */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={localPriceRange[1]} // Simplified: only controls max price for now
              onChange={(e) => handlePriceChange([localPriceRange[0], parseInt(e.target.value)])} 
              className="price-slider-input"
            />
          </div>
          
          {/* Sort Dropdown */}
          <div className="filter-group sort-filter">
            <label htmlFor="sort-by">Sort By</label>
            <select 
              id="sort-by" 
              value={`${currentSort.sortBy}_${currentSort.sortOrder}`} 
              onChange={handleSortChange}
            >
              {sortOptionsAvailable.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="filter-group category-filter">
          <label>Categories</label>
          <div className="category-tabs">
            {foodCategories.map(category => (
              <button 
                key={category} 
                onClick={() => handleCategoryChange(category)}
                className={`category-tab ${(selectedCategories.includes(category) || (category === "All" && selectedCategories.length === 0)) ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <button onClick={handleResetFilters} className="reset-filters-btn">Reset All Filters</button>
      </div>
    </div>
  );
};

export default EnhancedFoodFilter;