const convertBtn = document.getElementById("convert");
const reverseBtn = document.getElementById("reverse");
const reverseBtnIcon = document.getElementById("reverse").querySelector("i");
const resetBtn = document.getElementById("reset");
const instructionDiv = document.getElementById("instruction");
const rowHeader = document.getElementById("rowHeader");

const calculation = document.getElementById("calculation");

let isCelcius = true;

const errors = {
    invalidData: "Input must be a number",
    empty: "Input cannot be empty"
};

let valueObj;

convertBtn.addEventListener("click", convert);
resetBtn.addEventListener("click", reset);
reverseBtn.addEventListener("click", reverse);

function convert() {
    const celciusInput = document.getElementById("celcius");
    const fahrenheitInput = document.getElementById("fahrenheit");
    const celciusLabel = document.getElementById("labelCelcius");
    const fahrenheitLabel = document.getElementById("labelFahrenheit");

    fahrenheitLabel.style.display = "none";
    celciusLabel.style.display = "none";

    let sum;

    if (isCelcius) {
        if (checkError(celciusInput, celciusLabel).error) {
            return;
        } else {
            sum = (valueObj.value * 9) / 5 + 32;
            fahrenheitInput.value = sum;
            calculation.innerHTML = `${sum}&deg;C = (${sum}&deg;C * 9 / 5) + 32`;
        }
    } else {
        if (checkError(fahrenheitInput, fahrenheitLabel).error) {
            return;
        } else {
            sum = ((valueObj.value - 32) * 5) / 9;
            celciusInput.value = sum;
            calculation.innerHTML = `${sum}&deg;F = (${sum}&deg;F - 32) * 5 / 9`;
        }
    }
}

function checkError(inputElement, labelElement) {
    let error = false;

    switch (true) {
        case inputElement.value === "":
            labelElement.innerHTML = errors.empty;
            labelElement.style.display = "block";
            error = true;
            break;
        case isNaN(inputElement.value):
            labelElement.innerHTML = errors.invalidData;
            labelElement.style.display = "block";
            error = true;
            break;
    }

    if (error) {
        valueObj = {
            value: "",
            error: true
        };
        return valueObj;
    } else {
        valueObj = {
            value: Number(inputElement.value),
            error: false
        };
        return valueObj;
    }
}

function reset() {
    const celciusInput = document.getElementById("celcius");
    const fahrenheitInput = document.getElementById("fahrenheit");
    const celciusLabel = document.getElementById("labelCelcius");
    const fahrenheitLabel = document.getElementById("labelFahrenheit");

    celciusInput.value = "";
    fahrenheitInput.value = "";
    calculation.innerHTML = "";
}

function changeElementAttribute(
    inputElement,
    inputValues,
    labelElement,
    labelId
) {
    inputElement.setAttribute("id", inputValues[0]);
    inputElement.setAttribute("placeholder", inputValues[1]);
    inputElement.setAttribute("name", inputValues[2]);
    labelElement.setAttribute("id", labelId);
}

function reverse() {
    const celciusInput = document.getElementById("celcius");
    const fahrenheitInput = document.getElementById("fahrenheit");
    const celciusLabel = document.getElementById("labelCelcius");
    const fahrenheitLabel = document.getElementById("labelFahrenheit");

    fahrenheitLabel.style.display = "none";
    celciusLabel.style.display = "none";

    fahrenheitInput.value = "";
    celciusInput.value = "";
    calculation.innerHTML = "";

    if (isCelcius) {
        reverseBtnIcon.style.animation = "rotate 200ms linear";
        reverseBtnIcon.style.color = "white";
        reverseBtn.style.backgroundColor = "black";

        fahrenheitInput.readOnly = true;
        celciusInput.readOnly = false;

        rowHeader.querySelector("p").innerHTML =
            "Masukkan suhu derajat Fahrenheit (&deg;F) ke kotak dibawah, lalu klik tombol Convert untuk mendapatkan hasil konversi dalam bentuk Celcius (&deg;C).";
        instructionDiv.querySelector("label").innerHTML =
            "How to Convert from Fahrenheit (&deg;F) to Celcius (&deg;C)";
        instructionDiv.querySelectorAll("p")[0].innerHTML =
            "Suhu <span>S</span> dalam derajat Fahrenheit (&deg;F) sama dengan suhu <span>S</span> dalam derajat Celcius (&deg;C) kurang 32 di kali 5 di bagi 9.";
        instructionDiv.querySelectorAll("p")[1].innerHTML =
            "<span>S</span><sub>(&deg;C)</sub> = (<span>S</span><sub>(&deg;F)</sub> - 32) x 5 / 9";
        instructionDiv.querySelectorAll("p")[2].innerHTML =
            "<span>S</span><sub>(&deg;C)</sub> = (<span>S</span><sub>(&deg;F)</sub> - 32) x 1.8";

        isCelcius = false;
    } else {
        fahrenheitInput.readOnly = false;
        celciusInput.readOnly = true;

        reverseBtnIcon.style.animation = "rotateBack 200ms linear";
        reverseBtnIcon.style.color = "black";
        reverseBtn.style.backgroundColor = "#f0f0f0";

        rowHeader.querySelector("p").innerHTML =
            "Masukkan suhu derajat Celcius (&deg;C) ke kotak dibawah, lalu klik tombol Convert untuk mendapatkan hasil konversi dalam bentuk Fahrenheit (&deg;F).";
        instructionDiv.querySelector("label").innerHTML =
            "How to Convert from Celcius (&deg;C) to Fahrenheit (&deg;F)";
        instructionDiv.querySelectorAll("p")[0].innerHTML =
            "Suhu <span>S</span> dalam derajat Fahrenheit (&deg;F) sama dengan suhu <span>S</span> dalam derajat Celcius (&deg;C) kali 9 / 5 tambah 32.";
        instructionDiv.querySelectorAll("p")[1].innerHTML =
            "<span>S</span><sub>(&deg;F)</sub> = (<span>S</span><sub>(&deg;C)</sub> x 9 / 5) + 32";
        instructionDiv.querySelectorAll("p")[2].innerHTML =
            "<span>S</span><sub>(&deg;F)</sub> = (<span>S</span><sub>(&deg;C)</sub> x 1.8) + 32";

        isCelcius = true;
    }

    changeElementAttribute(
        fahrenheitInput,
        ["celcius", "Celcius", "celcius"],
        celciusLabel,
        "labelFahrenheit"
    );
    changeElementAttribute(
        celciusInput,
        ["fahrenheit", "Fahrenheit", "fahrenheit"],
        fahrenheitLabel,
        "labelCelcius"
    );
}
