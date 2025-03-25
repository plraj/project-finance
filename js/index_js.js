const ctx = document.getElementById("gaugeChart").getContext("2d");

const data = {
    labels: ["0", "12K", "20K"],
    datasets: [
        {
            data: [12500, 7500],  // Achieved (Yellow) vs Remaining (Gray)
            backgroundColor: ["#FFC107", "#E0E0E0"],
            borderWidth: 0
        }
    ]
};

const config = {
    type: "doughnut",
    data: data,
    options: {
        rotation: -90, // Starts from the left side
        circumference: 180, // Semi-circle
        cutout: "80%", // Donut style
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    }
};

const gaugeChart = new Chart(ctx, config);
