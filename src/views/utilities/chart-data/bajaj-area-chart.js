// ===========================|| DASHBOARD - BAJAJ AREA CHART ||=========================== //
let type = 'area';
let height = 95;
let options = {
    chart: {
        id: 'support-chart',
        sparkline: {
            enabled: true
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 1
    },
    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: 'Ticket '
        },
        marker: {
            show: false
        }
    }
}

const chartData = [{
    type, height, options,
    series: [
        {
            data: [11, 8, 11, 11, 10, 11, 11]
        }
    ]
},
{
    type, height, options,
    series: [
        {
            ddata: [11, 11, 11, 11, 11, 11, 11]
        }
    ]
}, {
    type, height, options,
    series: [
        {
            data: [11, 9, 11, 11, 10, 11, 11]
        }
    ]
}, {
    type, height, options,
    series: [
        {
            data: [11, 11, 11, 11, 10, 11, 11]
        }
    ]
}, {
    type, height, options,
    series: [
        {
            data: [6, 11, 11, 11, 10, 11, 11]
        }
    ]
}, {
    type, height, options,
    series: [
        {
            data: [11, 11, 11, 11, 11, 11, 11]
        }
    ]
}, {
    type, height, options,
    series: [
        {
            data: [11, 1, 11, 55, 11, 11, 11]
        }
    ]
}]

export default chartData;
