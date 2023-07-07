const API_key = "8d42d033147a4617a140dd8032065c3d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchnews("India"));

async function fetchnews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_key}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsouter = document.getElementById("cards-outer");
    const newsTemplate = document.getElementById("news-template");
    cardsouter.innerHTML = "";
    if (!articles || !Array.isArray(articles)) return; 

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardclone = newsTemplate.content.cloneNode(true);
        cardclone.querySelector("img").src = article.urlToImage;
        cardclone.querySelector("#new-title").textContent = article.title;

        const formattedDate = new Date(article.publishedAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        cardclone.querySelector("#news-source").textContent = `${article.source.name}, ${formattedDate}`;

        cardclone.querySelector("#news-content").textContent = article.description;
        cardsouter.appendChild(cardclone);
    });
}