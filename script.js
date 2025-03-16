document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("liXiContainer");
    const replayButton = document.getElementById("replayButton");
    const startButton = document.getElementById("startButton");
    const playerNameInput = document.getElementById("playerName");
    const noteList = document.getElementById("noteList");

    let playerName = "";

    startButton.addEventListener("click", function () {
        playerName = formatName(playerNameInput.value);
        
        if (!playerName) {
            alert("Vui lòng nhập tên hợp lệ!");
            return;
        }

        console.log("Tên người chơi:", playerName);
        console.log("Gọi generateLiXi()...");
        
        playerNameInput.disabled = true;
        startButton.disabled = true;
        generateLiXi();
        replayButton.style.display = "inline-block"; 
    });

    function generateLiXi(isSurprise = false) {
        console.log("Đang tạo lì xì...");
        container.innerHTML = ""; // Xóa lì xì cũ trước khi tạo mới

        let liXi = document.createElement("div");
        liXi.classList.add("li-xi");

        let money = document.createElement("div");
        money.classList.add("money");
        let amount = getRandomAmount(2000, 20000);

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
            }
        });

        container.appendChild(liXi);
    }

    replayButton.addEventListener("click", function () {
        generateLiXi();
    });

    function formatName(name) {
        return name.trim().replace(/\s+/g, " ");
    }

    function getRandomAmount(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function formatCurrency(amount) {
        return amount.toLocaleString("vi-VN");
    }

    function playOpenSound() {
        let audio = new Audio("https://www.fesliyanstudios.com/play-mp3/4389");
        audio.volume = 0.5;
        audio.play().catch(error => console.log("Trình duyệt chặn âm thanh", error));
    }
});
