const baseUrl = "https://valorant-api.com/v1/";
const language = "language=id-ID";
const agentsEndPoint = `${baseUrl}agents`;
const mapsEndPoint = `${baseUrl}maps`;
const weaponsEndPoint = `${baseUrl}weapons`;

const contents = document.querySelector(".gallery .box-container");

function getMaps() {
    fetch(`${mapsEndPoint}/?${language}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            contents.innerHTML = "";
            data.data.forEach((map) => {
                contents.innerHTML += `
                <div class="box">
                <img src="${map.splash}" alt="" style="object-fit: cover; width: 100%; height:100%;">
                <div class="content">
                    <h3>${map.displayName}</h3>
                    <p>${map.coordinates}</p>
                    <a href="#" class="btn" onclick="getMapMore('${map.uuid}')">see more</a>
                </div>
            </div>
                `;
                document.getElementById("agent").innerHTML = contents.innerHTML;
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

function getMapMore(uuid) {
    fetch(`${mapsEndPoint}/${uuid}/?${language}`)
        .then((response) => response.json())
        .then((resJsonn) => {
            console.log(resJsonn);
            displayImage = document.querySelector(
                ".mapsIntro"
            ).style.backgroundImage = "url(" + resJsonn.data.splash + ")";
            contents.innerHTML = "";
            contents.innerHTML += ` 
            <div class="box">
            <img src="${resJsonn.data.displayIcon}" alt="" style="object-fit: cover; width: 100%;">
            <div class="content">
                <h3>${resJsonn.data.displayName}</h3>
                <p>${resJsonn.data.coordinates}</p>
                <a href="#" class="btn">see more</a>
            </div>
        </div>
            `;
        })
        .catch((error) => {
            console.log(error);
        });
}
document.addEventListener("DOMContentLoaded", function() {
    getMaps();
});