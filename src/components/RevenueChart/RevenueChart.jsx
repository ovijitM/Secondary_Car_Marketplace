import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

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

RevenueChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired
    })).isRequired
};

export default RevenueChart;