const baseUrl = "https://valorant-api.com/v1/";
const language = "language=id-ID";
const agentsEndPoint = `${baseUrl}agents`;

const contents = document.querySelector(".gallery .box-container");
const displayName = document.querySelector(".specsIntro h1");
const desc = document.querySelector(".gallery p .deskripsi");

function getAgents() {
    fetch(`${agentsEndPoint}/?${language}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            contents.innerHTML = "";
            data.data.forEach((agent) => {
                contents.innerHTML += `
                <div class="box">
                <img src="${agent.displayIcon}" alt="" style="margin-top: 2rem; object-fit:cover;">
                <div class="content">
                    <h3>${agent.displayName}</h3>
                    <a href="#" class="btn" onclick="getAgentAbilities('${agent.uuid}')">see more</a>
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

function getAgentAbilities(uuid) {
    fetch(`${agentsEndPoint}/${uuid}/?abilities&${language}`)
        .then((response) => response.json())
        .then((resJsonn) => {
            console.log(resJsonn);
            contents.innerHTML = "";
            displayName.innerHTML = resJsonn.data.displayName;

            resJsonn.data.abilities.forEach((ability) => {
                contents.innerHTML += `
                <div class="box-ability">
                <img src="${ability.displayIcon}" alt="">
                <div class="content">
                    <h3>${ability.displayName}</h3>
                    <p style="color: #FFFFFF; font-size: 16px;">${ability.slot}</p>
                    <p style="color: #FFFFFF; font-size: 14px;">${ability.description}</p>
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

document.addEventListener("DOMContentLoaded", function() {
    getAgents();
});