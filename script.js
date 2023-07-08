const API_key = "pub_259020160dede80e9130541a1639678730dff";
const url = "https://newsdata.io/api/1/news?apikey=";

window.addEventListener('load', () => fetchNews("category=top"));

async function fetchNews(query) {

        const res = await fetch(`https://newsdata.io/api/1/news?apikey=pub_258764c627ca883d0ce66b6df45f50ace7b63&${query}&language=en`);
        const data = await res.json();
        console.log(data);
        
        bindData(data.results);
}

function bindData(news) {
    const cardsouter = document.getElementById("cards-outer");
    const newsTemplate = document.getElementById("newstemplate");
    cardsouter.innerHTML = "";
  
    news = news.filter((article) => article.image_url);
  
    news.forEach((article) => {
      const cardclone = newsTemplate.content.cloneNode(true);

      fillDataInCard(cardclone, article);
  
      cardsouter.appendChild(cardclone);
    });
  }

  function fillDataInCard(cardclone, article){
    
      cardclone.querySelector("img").src = article.image_url;
  
      cardclone.querySelector("#new-title").textContent = article.title;
  
      const formattedDate = new Date(article.pubDate).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
      cardclone.querySelector("#news-source").textContent = `${article.source_id}, ${formattedDate}`;
  
      cardclone.querySelector("#news-content").textContent = article.description;

      cardclone.firstElementChild.addEventListener('click', () => {
        window.open(article.link, "_blank")
      });
  }

  let selectedNav = null;
  function onNavclick(id){
    fetchNews(id);
    const navitem = document.getElementById(id);
    selectedNav?.classList.remove('active');
    selectedNav = navitem;
    selectedNav.classList.add('active');
  }

const searchbtn = document.getElementById('search-button');
const searchtext = document.getElementById('search-input');

searchbtn.addEventListener('click', () => {
    const query = searchtext.value;
    if(!query) return;
    fetchNews(`q=${searchtext.value}`);
    selectedNav?.classList.remove('active');
    selectedNav = null;
})

  function reload() {
    window.location.reload();
  }

  
