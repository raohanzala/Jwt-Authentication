// Spinner.js
import React from 'react';

const Spinner = () => {
    return (
        <div className="flex justify-center gap-2 items-center duration-1000 ">
            <div>Loading</div>
            <div className="animate-spin  h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
    );
}

export default Spinner;
