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
            alert("Vui lòng nhập tên hợp lệ trước khi bắt đầu!");
            return;
        }

        playerNameInput.disabled = true;
        startButton.disabled = true;
        generateLiXi();
        replayButton.style.display = "inline-block"; 
    });

    function generateLiXi(isSurprise = false) {
        container.innerHTML = "";
        const numLiXi = 1;

        for (let i = 0; i < numLiXi; i++) {
            let liXi = document.createElement("div");
            liXi.classList.add("li-xi");

            let money = document.createElement("div");
            money.classList.add("money");
            let amount = getRandomAmount(2000, 20000);
            
            let isHuong = Math.random() < 0.3; // 30% tỉ lệ "Lì xì hường"
            let isSuper = Math.random() < 0.2; // 20% tỉ lệ "Siêu lì xì"

            if (isSurprise) {
                // Nếu là lì xì bất ngờ, chọn giữa "Lì xì hường" hoặc "Siêu lì xì"
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

                    // 25% tỉ lệ xuất hiện "Lì xì bất ngờ" sau khi mở lì xì thường
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
    }

    replayButton.addEventListener("click", function () {
        generateLiXi();
    });

    function formatCurrency(amount) {
        return amount.toLocaleString("vi-VN");
    }

    function playOpenSound() {
        let audio = new Audio("https://www.fesliyanstudios.com/play-mp3/4389");
        audio.play();
    }
});

