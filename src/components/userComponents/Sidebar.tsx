import { Box, Slider, Button, OutlinedInput } from '@mui/material';
import { X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
    const [value, setValue] = useState([399, 10000]);
    const [minValue, setMinValue] = useState(399);
    const [maxValue, setMaxValue] = useState(11100);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const handleChange = (_event, newValue) => {
        if (Array.isArray(newValue)) {
            setValue(newValue);
            setMinValue(Math.floor(newValue[0]));
            setMaxValue(Math.ceil(newValue[1]));
        }
    };

    const categories = [
        { name: 'Extension', href: '#' },
        { name: 'Mobile Phone Cases', href: '#' },
        { name: 'Power Banks', href: '#' },
        { name: 'Headsets', href: '#' },
        { name: 'Charger And data cable', href: '#' },
    ];

    return (
        <>
            {/* Mobile Filter Button - Improved positioning */}
            <div className="md:hidden">
                <button
                    className="fixed bottom-6 right-6 bg-purple-950 text-white px-6 py-3 rounded-full shadow-lg z-[60] flex items-center justify-center"
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                >
                    <span>Filters</span>
                </button>
            </div>
             {/* Overlay Background */} 
             {isMobileFilterOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-[65] md:hidden"
                    onClick={() => setIsMobileFilterOpen(false)}
                />
            )}


            {/* Sidebar Container */}
            <div className={`
                fixed md:relative inset-y-0 left-0 w-[280px] md:w-auto z-[70]
                bg-white md:bg-transparent
                transform transition-transform duration-300 ease-in-out
                ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                md:block md:p-0
                shadow-lg md:shadow-none
                overflow-y-auto
                h-full
                p-4
            `}>
               {/* Mobile Close Button */}
               {isMobileFilterOpen && (
                    <button
                        className="md:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                        onClick={() => setIsMobileFilterOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </button>
                )}

                {/* Sidebar Content */}
                <div className="mt-12 md:mt-0">
                    <h2 className="text-gray-900 font-bold mb-4 ml-4">Product Categories</h2>
                    <div className="space-y-4">
                        {categories.map((category, index) => (
                            <div key={index} className="text-gray-600 hover:text-gray-900 cursor-pointer ml-4">
                                {category.name}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 border-t border-gray-200 pt-4 mx-4">
                        <h2 className="text-gray-900 font-bold mb-4">Filter By Price</h2>
                        <div className="flex mt-4 space-x-2">
                            <OutlinedInput
                                type="number"
                                value={minValue}
                                onChange={(e) => setMinValue(parseInt(e.target.value))}
                                className="w-full"
                            />
                            <OutlinedInput
                                type="number"
                                value={maxValue}
                                onChange={(e) => setMaxValue(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
                            <Slider
                                getAriaLabel={() => 'Price range'}
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                min={399}
                                max={11100}
                                sx={{
                                    color: 'purple',
                                    '& .MuiSlider-thumb': {
                                        backgroundColor: 'white',
                                    },
                                    '& .MuiSlider-track': {
                                        backgroundColor: '#311b92',
                                    },
                                    '& .MuiSlider-rail': {
                                        backgroundColor: '#ddd',
                                    },
                                }}
                            />
                        </Box>
                        <div className="flex justify-center space-x-4">
                            <Button
                                variant="outlined"
                                sx={{
                                    padding: "6px 12px",
                                    fontSize: "0.875rem",
                                    minWidth: "100px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    backgroundColor: 'white',
                                    color: 'gray',
                                    border: '1px solid lightgray'
                                }}
                            >
                                Reset
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    padding: "6px 12px",
                                    fontSize: "0.875rem",
                                    minWidth: "100px",
                                    backgroundColor: '#4B0082'
                                }}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;