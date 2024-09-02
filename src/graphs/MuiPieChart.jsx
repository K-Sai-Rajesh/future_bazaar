import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
    { value: 5, label: '', color: "#8921C7" },
    { value: 10, label: '', color: "#D32F2F" }
];


export default function PieArcLabel() {
    return (
        <PieChart
            series={[
                {
                    arcLabel: (item) => `${item.label} (${item.value})`,
                    arcLabelMinAngle: 45,
                    data,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    // startAngle: -90,
                    // endAngle: 180,
                    // cx: 150,
                    // cy: 150,
                },
            ]}
            slotProps={{
                legend: {
                    // direction: direction,
                    hidden: true,
                    // position: { vertical, horizontal },
                    itemGap: -4,
                    markGap: 10,
                    itemMarkWidth: 10,
                    itemMarkHeight: 10,
                },
            }}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                },
            }}
            width={window.innerWidth * 0.5}
            height={window.innerHeight * 0.5}

        />
    );
}
