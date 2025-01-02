import React from 'react';
import { Bar } from 'react-chartjs-2';

const RevenueChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.date), 
        datasets: [
            {
                label: 'Revenue',
                data: data.map(item => item.amount), 
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div>
            <Bar data={chartData} />
        </div>
    );
};

export default RevenueChart;