const API_URL =
    "https://potterapi-fedeperin.vercel.app/pt/characters?max=50";


const revealButton =
    document.getElementById("revealButton");

const result =
    document.getElementById("result");

const status =
    document.getElementById("status");


const characterImage =
    document.getElementById("characterImage");

const characterName =
    document.getElementById("characterName");

const nickname =
    document.getElementById("nickname");

const house =
    document.getElementById("house");

const actor =
    document.getElementById("actor");

const birthdate =
    document.getElementById("birthdate");


function showValue(value) {

    if (value && String(value).trim()) {
        return value;
    }

    return "Não informado";
}


async function revealCharacter() {

    revealButton.disabled = true;

    revealButton.textContent =
        "🪄 Consultando o mapa...";

    status.textContent =
        "A magia está procurando um personagem...";


    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                `Erro HTTP: ${response.status}`
            );

        }


        const characters =
            await response.json();


        if (
            !Array.isArray(characters) ||
            characters.length === 0
        ) {

            throw new Error(
                "A API não retornou personagens."
            );

        }


        const character =
            characters[
            Math.floor(
                Math.random() * characters.length
            )
            ];


        characterName.textContent =
            showValue(character.fullName);

        nickname.textContent =
            showValue(character.nickname);

        house.textContent =
            showValue(character.hogwartsHouse);

        actor.textContent =
            showValue(character.interpretedBy);

        birthdate.textContent =
            showValue(character.birthdate);


        if (character.image) {

            characterImage.src =
                character.image;

            characterImage.alt =
                `Imagem de ${showValue(
                    character.fullName
                )}`;

        } else {

            characterImage.removeAttribute("src");

            characterImage.alt =
                "Imagem não disponível";

        }


        result.classList.remove("hidden");


        status.textContent =
            "O mapa revelou alguém! Clique novamente para encontrar outro personagem.";

    }


    catch (error) {

        console.error(error);

        result.classList.add("hidden");

        status.textContent =
            "Não foi possível consultar a API. Verifique sua internet e tente novamente.";

    }


    finally {

        revealButton.disabled = false;

        revealButton.textContent =
            "🪄 Revelar personagem";

    }

}


revealButton.addEventListener(
    "click",
    revealCharacter
);

