const baseUrl = "https://valorant-api.com/v1/";
const language = "language=id-ID";
const agentsEndPoint = `${baseUrl}agents`;
const mapsEndPoint = `${baseUrl}maps`;
const weaponsEndPoint = `${baseUrl}weapons`;

const contents = document.querySelector(".gallery .box-container");
const displayName = document.querySelector(".specsIntro h1");
const desc = document.querySelector(".gallery p .deskripsi");

function getWeapons() {
    fetch(`${weaponsEndPoint}/?${language}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            contents.innerHTML = "";
            data.data.forEach((weapon) => {
                contents.innerHTML += `
                <div class="box">
                <img src="${weapon.displayIcon}" alt="">
                <div class="content">
                    <h3>${weapon.displayName}</h3>
                    <p>${weapon.description}</p>
                    <a href="#" class="btn" onclick="getWeaponAbilities('${weapon.uuid}')">see more</a>
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

function getWeaponAbilities(uuid) {
    fetch(`${weaponsEndPoint}/${uuid}/?abilities&${language}`)
        .then((response) => response.json())
        .then((resJsonn) => {
            contents.innerHTML = "";
            resJsonn.data.abilities.forEach((ability) => {
                contents.innerHTML += `
                <div class="box">
                <img src="${ability.displayIcon}" alt="">
                <div class="content">
                    <h3>${ability.displayName}</h3>
                    <p>${ability.displayName}</p>
                    <a href="#" class="btn">see more</a>
                </div>
            </div>
                `;
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    getMaps();
});