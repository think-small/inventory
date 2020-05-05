import Chart from "chart.js";
import moment from "moment";
import { getRawData} from "../../utils/DataCleaning";

export const setLayoutSettings = (type, data) => {

    const POSITIVE_COLOR = "#24292e";
    const NEGATIVE_COLOR = "#991a11";
    const HOVER_POSITIVE_COLOR = "#4b555e";
    const HOVER_NEGATIVE_COLOR = "#d12115";
    const PADDING = 20;

    const layoutSettings = {
        barColors: data.data.map((val) => (val >= 0 ? POSITIVE_COLOR : NEGATIVE_COLOR)),
        hoverBarColors: data.data.map((val) =>
            val >= 0 ? HOVER_POSITIVE_COLOR : HOVER_NEGATIVE_COLOR
        ),
        padding: PADDING,
    };

    switch (type) {
        case "usage":
            layoutSettings.titleText = "Usage Data";
            layoutSettings.yLabel = "Amount Used";
            break;
        case "inStock":
            layoutSettings.titleText = "In Stock Data";
            layoutSettings.yLabel = "Amount in Stock";
            break;
        case "received":
            layoutSettings.titleText = "Received Data";
            layoutSettings.yLabel = "Amount Received";
            break;
        default:
            break;
    }
    return layoutSettings;
}

export const setChartSettings = (numOfDays) => {
    const chartSettings = {};

    switch (numOfDays) {
        case 1:
            chartSettings.unit = "hour";
            chartSettings.format = "hh a";
            break;
        case 30:
            chartSettings.unit = "day";
            chartSettings.format = "MMM D";
            break;
        case 365:
            chartSettings.unit = "month";
            chartSettings.format = "MMM YYYY";
            break;
        default:
            chartSettings.unit = "day";
            chartSettings.format = "MMM D";
    }
    return chartSettings;
}

export const createChart = (
    chart, canvas, data,
    displayName, numOfDays, type, itemToDisplay,
    layoutSettings, chartSettings,
    setTransactionHistory, handleShow) => {

    chart = new Chart(canvas, {
        type: "bar",
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: layoutSettings.yLabel,
                    data: data.data,
                    backgroundColor: layoutSettings.barColors,
                    borderColor: layoutSettings.barColors,
                    hoverBackgroundColor: layoutSettings.hoverBarColors,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: layoutSettings.padding,
            },
            title: {
                display: true,
                text: `${displayName} ${layoutSettings.titleText}`,
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [
                    {
                        type: "time",
                        distribution: "series",
                        offset: true,
                        gridLines: {
                            display: false,
                        },
                        time: {
                            unit: chartSettings.unit,
                            displayFormats: {
                                [chartSettings.unit]: chartSettings.format,
                            },
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: layoutSettings.yLabel,
                        },
                    },
                ],
            },
            tooltips: {
                callbacks: {
                    title: (tooltipItem) => {
                        switch (numOfDays) {
                            case 365:
                                return `${tooltipItem[0]["label"]
                                    .split("-")
                                    .slice(0, 2)
                                    .join("-")}`;
                            default:
                                return `${tooltipItem[0]["label"].split("T")[0]}`;
                        }
                    },
                },
                custom: (tooltip) => (tooltip.displayColors = false),
            },
            onClick: (e, item) => {
                if (item[0] && item[0].hasOwnProperty("_model")) {
                    const dateString = item[0]._model.label;
                    const dateObj = new Date(dateString);
                    const momentObj = moment(dateObj);

                    const rawData = getRawData(
                        itemToDisplay.transactions,
                        type,
                        true
                    );
                    const filteredByDateData = rawData
                        .filter((transaction) => {
                            return (
                                moment(transaction.timestamp)
                                    .startOf(chartSettings.unit)
                                    .format() === momentObj.startOf(chartSettings.unit).format()
                            );
                        })
                        .sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));
                    setTransactionHistory([...filteredByDateData]);
                    handleShow();
                }
            },
        },
    });
    return chart;
}