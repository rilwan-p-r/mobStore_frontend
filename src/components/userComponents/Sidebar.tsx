import { Box, Slider, Button, OutlinedInput } from '@mui/material';
import { X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
    const [value, setValue] = useState<number[]>([399, 10000]);
    const [minValue, setMinValue] = useState<number>(399);
    const [maxValue, setMaxValue] = useState<number>(11100);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const handleChange = (_event: Event, newValue: number | number[]) => {
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
            {/* Mobile Filter Button */}
            <button
                className="md:hidden fixed bottom-4 right-4 bg-purple-950 text-white px-4 py-2 rounded-full shadow-lg z-50"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
                Filters
            </button>

            <div className={`
                md:block
                ${isMobileFilterOpen ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto' : 'hidden'}
                md:relative md:bg-transparent md:p-0
                bg-white shadow-md p-4 w-full md:w-80 md:mr-6
            `}>
                {isMobileFilterOpen && (
                    <button
                        className="md:hidden absolute top-4 right-4"
                        onClick={() => setIsMobileFilterOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </button>
                )}

                <h2 className="text-gray-900 font-bold mb-4">Product Categories</h2>
                <div className="space-y-4">
                    {categories.map((category, index) => (
                        <div key={index} className="text-gray-600 hover:text-gray-900 cursor-pointer">
                            {category.name}
                        </div>
                    ))}
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
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
                    <Box sx={{ width: '100%' }}>
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
                    <div className="flex pl-6 space-x-6">
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
        </>
    );
};

export default Sidebar;