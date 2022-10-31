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
                <img src="${weapon.displayIcon}" alt="" style="width:80%; height:auto; margin-top: 8rem;">
                <div class="content">
                    <h3>${weapon.displayName}</h3>
                    <p>${weapon.category}</p>
                    <a href="#" class="btn" onclick="getWeaponMore('${weapon.uuid}')">see more</a>
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

function getWeaponMore(uuid) {
    fetch(`${weaponsEndPoint}/${uuid}/?${language}`)
        .then((response) => response.json())
        .then((resJsonn) => {
            console.log(resJsonn);
            contents.innerHTML = "";
                contents.innerHTML += `
                <div class="box" style="height:40rem; width:auto; margin-bottom:2rem;">
                <img src="${resJsonn.data.displayIcon}" alt="">
                <div class="content">
                    <h3>${resJsonn.data.displayName}</h3>
                    <p>Fire Rate: ${resJsonn.data.weaponStats.fireRate}</p>
                    <p>Magazine: ${resJsonn.data.weaponStats.magazineSize}</p>
                    <p>Equip Time: ${resJsonn.data.weaponStats.equipTimeSeconds} /S</p>
                    <p>Reload Time: ${resJsonn.data.weaponStats.reloadTimeSeconds} /S</p>
                    <p>First Bullet Accuracy: ${resJsonn.data.weaponStats.firstBulletAccuracy}</p>
                    <p>Shotgun Pellet Count: ${resJsonn.data.weaponStats.shotgunPelletCount}</p>
                </div>
            </div>
                `;
        })
        .catch((error) => {
            console.log(error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    getWeapons();
});