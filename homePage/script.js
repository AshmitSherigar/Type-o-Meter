let isAccount = false;
let notification = document.querySelector(".notification");

function showNotification() {
    let toast = document.createElement("div");
    toast.classList.add("toast");

    toast.innerHTML = `
        <span class="material-symbols-outlined">warning</span>
        <div class="content">
            <div class="title">Warning!</div>
            <h4>Please make a account.</h4>
        </div>
        <span class="material-symbols-outlined close-btn">close</span>
    `;

    notification.appendChild(toast);


    setTimeout(() => {
        toast.remove();
    }, 6000);


    toast.querySelector(".close-btn").addEventListener("click", () => {
        toast.remove();
    });
}

function isAccountThere() {
    if (!isAccount) {
        showNotification();
        setInterval(() => {
            showNotification();
        }, 30000);
    }
}

// isAccountThere(); 
document.addEventListener("DOMContentLoaded", function () {
    const timeButtons = document.querySelectorAll(".timed-test .time");

    function selectTime(selectedButton) {
        timeButtons.forEach(button => {
            button.classList.remove("selected-time");
        });
        selectedButton.classList.add("selected-time");
    }

    
    selectTime(timeButtons[0]);

    timeButtons.forEach(button => {
        button.addEventListener("click", function () {
            selectTime(this);
        });
    });
});
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Monday', 'Wednesday', 'Friday'],
        datasets: [{
            label: 'Words Per Minute',
            data: [16, 19, 19, 18, 23, 25],
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light red background
            borderColor: 'rgba(255, 99, 132, 1)', // Red border
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    color: 'black' // X-axis labels in black
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'black' // Y-axis labels in black
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                onClick: () => {
                    null
                }
            },
            tooltip: {
                titleColor: 'white', // Tooltip title in black
                bodyColor: 'white' // Tooltip body text in black
            }
        }
    }
});


document.querySelectorAll(".timed-test .startBtn").forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault(); 

        document.body.classList.add("fade-out"); 

        setTimeout(() => {
            window.location.href = "../wpmTester/wpmTester.html"; 
        }, 300); 
    });
});




async function waitForLocalStorage(key, timeout = 5000) {
    const start = Date.now();
    while (!localStorage.getItem(key)) {
        if (Date.now() - start > timeout) {
            throw new Error("Timeout: localStorage value not set.");
        }
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms before checking again
    }
    return localStorage.getItem(key);
}
// Wait for localStorage key safely
async function waitForLocalStorage(key, timeout = 5000) {
    const start = Date.now();
    while (!localStorage.getItem(key)) {
        if (Date.now() - start > timeout) {
            console.error("Timeout: localStorage value not set.");
            return null;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    return localStorage.getItem(key);
}
// Auto-fetch stored data
(async () => {
    console.log("Waiting for data...");
    const data = await waitForLocalStorage("myData");
    if (data) console.log("Data received:", data);
})();
