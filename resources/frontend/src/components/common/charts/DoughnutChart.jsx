import React from "react";
import { TEChart } from "tw-elements-react";
import {Doughnut} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const generateColors = (count) => {
    return Array.from({ length: count }, (_, i) =>
        `hsl(${(i * 360) / count}, 70%, 60%)`
    );
};
const DoughnutChart = ({details}) => {
    const keys = details.length > 0 ? Object.keys(details[0]) : []
    const amountTitle = keys[1]
    const categoryTitle = keys[2]
    
    const incomesDetails = details.reduce((acc, income) => {
        if(!acc[income[categoryTitle]]){
            
            acc[income[categoryTitle]] = income[amountTitle]
            return acc
        }
        
        acc[income[categoryTitle]] = acc[income[categoryTitle]] + income[amountTitle]
        return acc
    }, {})
    
    const chartData = {
        labels : Object.keys(incomesDetails).map(key => key),
        datasets : [
            {
                data : Object.values(incomesDetails).map(value => value),
                backgroundColor: generateColors(details.length),
                hoverBackgroundColor: generateColors(details.length).map((color) =>
                    color.replace("60%", "50%")
                ),

            }
        ]
    }
    return(
        <>
            <div className="w-[350px] h-[350px] m-auto">
                <Doughnut data={chartData}/>
            </div>
        </>
    )
}

export default DoughnutChart
