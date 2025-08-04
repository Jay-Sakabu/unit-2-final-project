import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, } from "chart.js";
import { Pie } from "react-chartjs-2";

// https://blog.logrocket.com/using-chart-js-react/
// https://www.chartjs.org/docs/latest/charts/doughnut.html
// register the pie (arc) element and plugins
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Graph = ({ actualSpending, budgetTargets }) => {
    // labels for each chart
    const actualLabels = ["Needs", "Wants", "Savings", "Unallocated"];
    const targetLabels = ["Needs", "Wants", "Savings"];

    //TODO: These need to be moved over to app.css for light mode compatibility
    const sliceColors = [
        "#c1022bff", // Needs
        "#005791ff", // Wants
        "#b88f29ff", // Savings
        "transparent", // Unallocated
    ];
    const borderColor = "#352e2eff"; 

    // build actual‐spending pie (with Unallocated)
    const actualData = {
        labels: actualLabels,
        datasets: [
            {
                label: "Actual Spending",
                data: actualLabels.map((cat) => actualSpending[cat] || 0),
                backgroundColor: sliceColors,
                borderColor,
            },
        ],
    };

    // build budget‐targets pie (only the first 3 slices)
    const targetData = {
        labels: targetLabels,
        datasets: [
            {
                label: "Budget Targets",
                data: targetLabels.map((cat) => budgetTargets[cat] || 0),
                backgroundColor: sliceColors.slice(0, 3),
                borderColor,
            },
        ],
    };

    return (
        <div
            className="dashboard-graph"
            style={{ display: "flex", justifyContent: "space-around" }}
        >
            <div style={{ width: "35%" }}>
                <Pie
                    data={actualData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Actual Spending",
                            },
                        },
                    }}
                />
            </div>
            <div style={{ width: "35%" }}>
                <Pie
                    data={targetData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Budget Targets",
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Graph;