// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded. Ready for dynamic updates.');

    // Initialize the chart
    const ctx = document.getElementById('resourceChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'CPU Utilization',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }, {
                label: 'Memory Utilization',
                data: [28, 48, 40, 19, 86, 27, 90],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Utilization (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Resource Utilization Over Time'
                }
            }
        }
    });

    // Function to update the last updated time
    function updateLastUpdatedTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const dateString = now.toLocaleDateString();
        document.getElementById('last-updated').textContent = `Last updated: ${dateString} ${timeString}`;
    }

    // Update the time immediately and then every 60 seconds
    updateLastUpdatedTime();
    setInterval(updateLastUpdatedTime, 60000);

    // Function to generate random data for the chart
    function generateRandomData() {
        return Math.floor(Math.random() * 100);
    }

    // Function to update the chart with new data
    function updateChart() {
        const newCPUData = generateRandomData();
        const newMemoryData = generateRandomData();
        
        chart.data.labels.push(new Date().toLocaleTimeString());
        chart.data.datasets[0].data.push(newCPUData);
        chart.data.datasets[1].data.push(newMemoryData);
        
        // Remove the oldest data point if we have more than 7 points
        if (chart.data.labels.length > 7) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
            chart.data.datasets[1].data.shift();
        }
        
        chart.update();
        updateLastUpdatedTime();
        console.log('Chart updated with new data');
    }

    // Update the chart every 5 seconds
    setInterval(updateChart, 5000);
});