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

    // Set default selection to 1-minute test
    selectTime(timeButtons[0]);

    timeButtons.forEach(button => {
        button.addEventListener("click", function () {
            selectTime(this);
        });
    });
});

