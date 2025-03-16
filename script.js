document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("liXiContainer");
    const replayButton = document.getElementById("replayButton");
    const startButton = document.getElementById("startButton");
    const sendReportButton = document.getElementById("sendReportButton");
    const playerNameInput = document.getElementById("playerName");
    const noteList = document.getElementById("noteList");

    let playerName = "";
    let notes = [];
    const googleSheetURL = "https://script.google.com/macros/s/AKfycbwmx3gsMV2xf3JRZnfZYkfZrYGXISY1bdNvT0VSLGW6pmOTGjO34qyuCI883dq370bFaQ/exec"; // Thay thế bằng URL Web App của bạn
    //const googleSheetURL = "https://docs.google.com/spreadsheets/d/1YTFyoz3MAQCa3earS9nSbuPlg5e58KRK6TLKeVzFYkk/edit?gid=0#gid=0";
    startButton.addEventListener("click", function () {
        playerName = playerNameInput.value.trim();

        if (playerName === "") {
            alert("Vui lòng nhập tên của bạn trước!");
            return;
        }

        playerNameInput.disabled = true;
        startButton.disabled = true;
        generateLiXi();
        replayButton.style.display = "inline-block"; 
        sendReportButton.style.display = "inline-block"; // Hiển thị nút gửi báo cáo
    });

    function generateLiXi() {
        container.innerHTML = "";
        const numLiXi = 1;
        for (let i = 0; i < numLiXi; i++) {
            let liXi = document.createElement("div");
            liXi.classList.add("li-xi");

            let money = document.createElement("div");
            money.classList.add("money");
            let amount = (Math.floor(Math.random() * (20000 - 1000 + 1)) + 2000);
            money.textContent = amount + " VND";

            liXi.appendChild(money);

            liXi.addEventListener("click", function () {
                if (!liXi.classList.contains("opened")) {
                    liXi.classList.add("opened");

                    let noteText = `${playerName} đã nhận: ${amount} VND 🎉`;
                    notes.push(noteText);

                    let noteItem = document.createElement("li");
                    noteItem.textContent = noteText;
                    noteList.appendChild(noteItem);

                    // Gửi dữ liệu vào Google Sheet
                    sendToGoogleSheet(playerName, amount);
                }
            });

            container.appendChild(liXi);
        }
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
        }).then(response => console.log("Dữ liệu đã được gửi tới Google Sheet"))
          .catch(error => console.error("Lỗi:", error));
    }
});
