import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    `https://api-birthday-reminder-5xlo.onrender.com`
                );
                setData(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <React.Fragment>
            <h1>Birthday Reminder</h1>
            <div>{data ? data.title : 'Wait...'}</div>
        </React.Fragment>
    );
};

export default App;
