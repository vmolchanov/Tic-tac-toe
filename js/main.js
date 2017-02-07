"use strict";

(function () {

    var CROSS = 1;
    var ZERO = 0;

    var items = document.querySelectorAll(".item");
    var cross = "<i class=\"fa fa-times cross\" aria-hidden=\"true\"></i>";
    var zero = "<i class=\"fa fa-circle-o zero\" aria-hidden=\"true\"></i>";
    var isNewGame = false;
    var busyCounter = 0;
    var lines = document.querySelector(".lines");
    var winStat = document.querySelector("#win-score");
    var drawStat = document.querySelector("#draw-score");
    var loseStat = document.querySelector("#lose-score");
    var countOfWin = 0;
    var countOfDraw = 0;
    var countOfLose = 0;

    /**
     * -1 - empty
     * 0 – zero
     * 1 – cross
     */
    var field = [[-1, -1, -1],
                 [-1, -1, -1],
                 [-1, -1, -1]];


    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function () {
            if (!this.classList.contains("busy")) {
                busyCounter++;
                this.innerHTML = cross;
                this.classList.add("busy");
                var itemId = this.id;

                // index - 1 because array from 0 to n-1
                var clickedItemIndex = parseInt(getReverseStr(itemId)) - 1;
                field[Math.floor(clickedItemIndex / 3)][clickedItemIndex % 3] = CROSS;

                var t = setTimeout(function () {

                    var isGameOver = false;

                    if (isWin(field, CROSS)) {
                        isGameOver = true;
                        isNewGame = true;
                        countOfWin++;
                        winStat.innerHTML = countOfWin;
                    } else if (busyCounter === 9) {
                        isGameOver = true;
                        isNewGame = true;
                        countOfDraw++;
                        drawStat.innerHTML = countOfDraw;
                    } else {
                        busyCounter++;
                        computerMove(items);
                    }

                    if (!isGameOver) {
                        if (isWin(field, ZERO)) {
                            isNewGame = true;
                            countOfLose++;
                            loseStat.innerHTML = countOfLose;
                        } else if (busyCounter === 9) {
                            isNewGame = true;
                            countOfDraw++;
                            drawStat.innerHTML = countOfDraw;
                        }
                    }

                }, 300);
            }
        });
    }


    document.body.addEventListener("click", function (event) {
        if (isNewGame) {
            newGame(field, items);
            isNewGame = false;
        }
    });

    /**
     * @param {Array} field
     */
    function isWin(field, sign) {
        // horizontal
        if (field[0][0] === field[0][1] && field[0][0] === field[0][2] && field[0][0] === sign) {
            lines.style.zIndex = "auto";
            document.querySelector(".line-1").classList.add("show");
            return true;
        }
        if (field[1][0] === field[1][1] && field[1][0] === field[1][2] && field[1][0] === sign) {
            lines.style.zIndex = "auto";
            document.querySelector(".line-2").classList.add("show");
            return true;
        }
        if (field[2][0] === field[2][1] && field[2][0] === field[2][2] && field[2][0] === sign) {
            lines.style.zIndex = "auto";
            document.querySelector(".line-3").classList.add("show");
            return true;
        }

        // vertical
        if (field[0][0] === field[1][0] && field[0][0] === field[2][0] && field[0][0] === sign) {
            lines.style.zIndex = "auto";
            document.querySelector(".line-4").classList.add("show");
            return true;
        }
        if (field[0][1] === field[1][1] && field[0][1] === field[2][1] && field[0][1] === sign) {
            lines.style.zIndex = "auto";
            document.querySelector(".line-5").classList.add("show");
            return true;
        }
        if (field[0][2] === field[1][2] && field[0][2] === field[2][2] && field[0][2] === sign) {
            lines.style.zIndex = "auto";
            document.querySelector(".line-6").classList.add("show");
            return true;
        }

        // diagonal
        if (field[0][0] === field[1][1] && field[0][0] === field[2][2] && field[0][0] === sign) {
            lines.style.zIndex = "auto";
            lines.style.transform = "rotate(-45deg)";
            document.querySelector(".line-7").classList.add("show");
            return true;
        }
        if (field[0][2] === field[1][1] && field[0][2] === field[2][0] && field[0][2] === sign) {
            lines.style.zIndex = "auto";
            lines.style.transform = "rotate(45deg)";
            document.querySelector(".line-7").classList.add("show");
            return true;
        }

        return false;
    }


    /**
     * @param {Array} field
     * @returns {Number}
     */
    function chooseEmptyItem(field) {
        var i = getRandomNumber(0, Math.pow(field.length, 2) - 1);

        while (field[Math.floor(i / 3)][i % 3] !== -1) {
            i = getRandomNumber(0, Math.pow(field.length, 2) - 1);
        }

        return i;
    }


    /**
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    function getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }


    /**
     * @param {Object} items
     */
    function computerMove(items) {
        var emptyItem = chooseEmptyItem(field);
        items[emptyItem].innerHTML = zero;
        items[emptyItem].classList.add("busy");

        var itemId = items[emptyItem].id;

        // index - 1 because array from 0 to n-1
        var clickedItemIndex = parseInt(getReverseStr(itemId)) - 1;

        field[Math.floor(clickedItemIndex / 3)][clickedItemIndex % 3] = ZERO;
    }


    /**
     * @param {String} str
     * @returns {String}
     */
    function getReverseStr(str) {
        return str.split("").reverse().join("");
    }


    function newGame(field, items) {
        var line = lines.children;

        for (var i = 0; i < field.length; i++) {
            for (var j = 0; j < field[i].length; j++) {
                field[i][j] = -1;
            }
        }

        for (var i = 0; i < items.length; i++) {
            items[i].innerHTML = "";
            items[i].classList.remove("busy");
        }

        for (var i = 0; i < line.length; i++) {
            line[i].classList.remove("show");
        }

        lines.style.zIndex = "-1";
        lines.style.transform = "none";
        busyCounter = 0;
    }

})();
