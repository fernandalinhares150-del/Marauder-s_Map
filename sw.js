const CACHE_NAME = "marauders-map-v1";

const ARQUIVOS_PARA_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];


self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(
                    ARQUIVOS_PARA_CACHE
                );

            })

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(resposta => {

                if (resposta) {

                    return resposta;

                }

                return fetch(event.request);

            })

    );

});