document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("liXiContainer");
    const replayButton = document.getElementById("replayButton");
    const startButton = document.getElementById("startButton");
    const playerNameInput = document.getElementById("playerName");
    const noteList = document.getElementById("noteList");

    let playerName = "";
    const googleSheetURL = "https://script.google.com/macros/s/AKfycbwmx3gsMV2xf3JRZnfZYkfZrYGXISY1bdNvT0VSLGW6pmOTGjO34qyuCI883dq370bFaQ/exec"; // URL Web App của Google Apps Script

    startButton.addEventListener("click", function () {
        playerName = playerNameInput.value.trim();

        if (!playerName) {
            alert("Vui lòng nhập tên hợp lệ!");
            return;
        }

        playerNameInput.disabled = true;
        startButton.disabled = true;
        replayButton.style.display = "inline-block";
        sendReportButton.style.display = "inline-block"; 
        generateLiXi();
    });

    function generateLiXi(isSurprise = false) {
        container.innerHTML = "";

        let liXi = document.createElement("div");
        liXi.classList.add("li-xi");

        let money = document.createElement("div");
        money.classList.add("money");

        let amount = getRandomAmount(2000, 20000);
        let isHuong = Math.random() < 0.3; // 30% tỉ lệ "Lì xì hường"
        let isSuper = Math.random() < 0.2; // 20% tỉ lệ "Siêu lì xì"

        if (isSurprise) {
            isHuong = Math.random() < 0.5;
            isSuper = !isHuong;
        }

        if (isHuong && isSuper) {
            amount *= 10;
            liXi.classList.add("huong-li-xi", "super-li-xi");
        } else if (isHuong) {
            amount *= 2;
            liXi.classList.add("huong-li-xi");
        } else if (isSuper) {
            amount *= 5;
            liXi.classList.add("super-li-xi");
        }

        money.textContent = formatCurrency(amount) + " VND";
        liXi.appendChild(money);

        liXi.addEventListener("click", function () {
            if (!liXi.classList.contains("opened")) {
                liXi.classList.add("opened", "animate");
                playOpenSound();

                let noteText = `${playerName} đã nhận: ${formatCurrency(amount)} VND 🎉`;
                let noteItem = document.createElement("li");
                noteItem.textContent = noteText;
                noteList.appendChild(noteItem);

                // 🔥 TỰ ĐỘNG GỬI DỮ LIỆU LÊN GOOGLE SHEETS
                sendToGoogleSheet(playerName, amount);

                // 25% tỉ lệ xuất hiện "Lì xì đặc biệt" sau khi mở lì xì thường
                if (!isHuong && !isSuper && Math.random() < 0.25) {
                    setTimeout(() => {
                        alert("🎉 Bạn nhận được một lì xì đặc biệt!");
                        generateLiXi(true);
                    }, 1000);
                }
            }
        });

        container.appendChild(liXi);
    }

    replayButton.addEventListener("click", function () {
        generateLiXi();
    });

    function sendToGoogleSheet(name, amount) {
        fetch(googleSheetURL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name, amount: amount })
        })
        .then(() => console.log("✅ Dữ liệu đã được gửi thành công!"))
        .catch(error => console.error("❌ Lỗi gửi dữ liệu:", error));
    }

    function getRandomAmount(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function formatCurrency(amount) {
        return amount.toLocaleString("vi-VN");
    }

    function playOpenSound() {
        let audio = new Audio("https://www.fesliyanstudios.com/play-mp3/4389");
        audio.play();
    }
function sendToGoogleSheet(name, amount) {
        fetch(googleSheetURL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name, amount: amount })
        }).then(response => console.log("Dữ liệu đã được gửi tới Google Sheet"))
          .catch(error => console.error("Lỗi:", error));
    }
});
