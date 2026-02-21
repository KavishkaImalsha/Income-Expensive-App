import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {useEffect, useRef} from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const generateColors = (count) => {
    return Array.from({ length: count }, (_, i) =>
        `hsl(${(i * 360) / count}, 70%, 60%)`
    );
};

const DoughnutChart = ({ details }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);
    if (!details || details.length === 0) {
        return <p className="text-center text-gray-500">No data available for the chart</p>;
    }

    const keys = Object.keys(details[0]);
    const amountTitle = keys[1];
    const categoryTitle = keys[2];

    const incomesDetails = details.reduce((acc, { [categoryTitle]: category, [amountTitle]: amount }) => {
        acc[category] = (acc[category] || 0) + amount;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(incomesDetails),
        datasets: [
            {
                data: Object.values(incomesDetails),
                backgroundColor: generateColors(Object.keys(incomesDetails).length),
                hoverBackgroundColor: generateColors(Object.keys(incomesDetails).length).map((color) =>
                    color.replace("60%", "50%")
                ),
            },
        ],
    };

    return (
        <div className="w-full h-auto max-w-[400px] mx-auto">
            <Doughnut data={chartData} />
        </div>
    );
};

export default DoughnutChart;
