import { Box, Slider, Button, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';

const Sidebar: React.FC = () => {
    const [value, setValue] = useState<number[]>([399, 10000]);
    const [minValue, setMinValue] = useState<number>(399);
    const [maxValue, setMaxValue] = useState<number>(11100);

    const handleChange = (_event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setValue(newValue);
            setMinValue(Math.floor(newValue[0]));
            setMaxValue(Math.ceil(newValue[1]));
        }
    };

    const handleApply = () => {
        // Handle the apply button logic here
    };

    const valuetext = (value: number) => {
        return `$${value}`;
    };

    const categories = [
        { name: 'Extension', href: '#' },
        { name: 'Mobile Phone Cases', href: '#' },
        { name: 'Power Banks', href: '#' },
        { name: 'Headsets', href: '#' },
        { name: 'Charger And data cable', href: '#' },
    ];

    return (
        <div className="bg-white shadow-md p-4 w-80 mr-6">
            <h2 className="text-gray-900 font-bold mb-4">Product Categories</h2>
            <div className="space-y-4">
                {categories.map((category, index) => (
                    <div key={index} className="text-gray-600 hover:text-gray-900">
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
                        getAriaValueText={valuetext}
                        min={399}
                        max={11100}
                        sx={{
                            color: 'purple',  // Change the slider track and thumb to purple
                            '& .MuiSlider-thumb': {
                                backgroundColor: 'white', // Thumb color
                            },
                            '& .MuiSlider-track': {
                                backgroundColor: '#311b92', // Track color
                            },
                            '& .MuiSlider-rail': {
                                backgroundColor: '#ddd', // Optional: Rail color (gray by default)
                            },
                        }}
                    />

                </Box>
                <div className="flex pl-6 space-x-6">
                    <Button
                        variant="outlined"
                        onClick={handleApply}
                        sx={{
                            padding: "6px 12px",
                            fontSize: "0.875rem",
                            minWidth: "100px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            backgroundColor: 'white',
                            color: 'gray',  // Font color
                            border: '1px solid lightgray'  // Light gray border
                        }}

                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleApply}
                        sx={{ padding: "6px 12px", fontSize: "0.875rem", minWidth: "100px", backgroundColor: '#4B0082' }}
                    >
                        Apply
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;