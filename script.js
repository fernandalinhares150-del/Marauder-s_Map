// Endereço da API que fornece os personagens
const API_URL =
    "https://potterapi-fedeperin.vercel.app/pt/characters?max=50";

// Registra o Service Worker para permitir o funcionamento como PWA
if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("./sw.js")
        .then(() => {
            console.log("Service Worker registrado com sucesso.");
        })
        .catch((erro) => {
            console.log("Erro ao registrar o Service Worker:", erro);
        });
}


// Pega o botão pelo ID
const revealButton = document.getElementById("revealButton");

// Pega a área onde o resultado será mostrado
const result = document.getElementById("result");

// Pega o elemento que mostra mensagens para o usuário
const status = document.getElementById("status");

// Pega o elemento que mostra a imagem
const characterImage =
    document.getElementById("characterImage");

// Pega o campo do nome
const characterName =
    document.getElementById("characterName");

// Pega o campo do apelido
const nickname =
    document.getElementById("nickname");

// Pega o campo da casa
const house =
    document.getElementById("house");

// Pega o campo do ator
const actor =
    document.getElementById("actor");

// Pega o campo da data de nascimento
const birthdate =
    document.getElementById("birthdate");

// Pega a mensagem que avisa quando o usuário está offline
const offlineStatus =
    document.getElementById("offlineStatus");


// Função usada para mostrar um valor ou "Não informado"
function showValue(value) {

    // Se não existir valor, mostra uma mensagem padrão
    if (!value) {
        return "Não informado";
    }

    // Caso exista, retorna o valor normalmente
    return value;
}


// Função responsável por consultar a API
async function revealCharacter() {

    // Desativa o botão enquanto a consulta acontece
    revealButton.disabled = true;

    // Muda o texto do botão
    revealButton.textContent = "Consultando...";

    // Mostra uma mensagem para o usuário
    status.textContent = "Consultando a API...";

    try {

        // Faz a requisição para a API
        const response = await fetch(API_URL);

        // Verifica se a resposta da API deu erro
        if (!response.ok) {
            throw new Error("Erro ao consultar a API.");
        }

        // Converte a resposta para JSON
        const characters = await response.json();

        // Verifica se a API retornou personagens
        if (!Array.isArray(characters) || characters.length === 0) {
            throw new Error("Nenhum personagem encontrado.");
        }

        // Escolhe um personagem aleatório
        const randomIndex =
            Math.floor(Math.random() * characters.length);

        const character = characters[randomIndex];


        // Coloca o nome do personagem na página
        characterName.textContent =
            showValue(character.name);


        // Coloca o apelido na página
        nickname.textContent =
            showValue(character.nickname);


        // Coloca a casa de Hogwarts na página
        house.textContent =
            showValue(character.house);


        // Coloca o ator na página
        actor.textContent =
            showValue(character.actor);


        // Coloca a data de nascimento na página
        birthdate.textContent =
            showValue(character.birthdate);


        // Verifica se o personagem possui uma imagem
        if (character.image) {

            // Coloca a imagem recebida pela API
            characterImage.src = character.image;

            // Define um texto alternativo para acessibilidade
            characterImage.alt =
                `Imagem de ${showValue(character.name)}`;

        } else {

            // Caso não exista imagem, usa uma imagem vazia
            characterImage.src = "";

            characterImage.alt =
                "Imagem não disponível";
        }


        // Mostra a área com os dados do personagem
        result.classList.remove("hidden");

        // Mostra mensagem de sucesso
        status.textContent =
            "Personagem revelado com sucesso!";


    } catch (error) {

        // Mostra o erro no console para ajudar na identificação
        console.error(error);

        // Mostra uma mensagem amigável para o usuário
        status.textContent =
            "Não foi possível consultar a API. Verifique sua conexão.";

    } finally {

        // Ativa o botão novamente
        revealButton.disabled = false;

        // Volta o texto original do botão
        revealButton.textContent =
            "🪄 Revelar personagem";
    }
}


// Verifica quando o dispositivo volta a ter internet
window.addEventListener("online", () => {

    // Esconde o aviso de offline
    offlineStatus.classList.add("hidden");

    // Atualiza a mensagem
    status.textContent =
        "Conexão restaurada. Você pode consultar novamente.";
});


// Verifica quando o dispositivo perde a internet
window.addEventListener("offline", () => {

    // Mostra o aviso de offline
    offlineStatus.classList.remove("hidden");

    // Atualiza a mensagem
    status.textContent =
        "Você está offline. A tela principal continua disponível.";
});


// Quando o botão for clicado, chama a função principal
revealButton.addEventListener(
    "click",
    revealCharacter
);
