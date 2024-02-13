const apikey='959e701ee72a4981ab27c429bfce06af'

const cardContainer=document.getElementById('card-container');
const searchField=document.getElementById("searchInput");
const searchButton=document.getElementById("search-btn")

async function fetchRandomNews(){
    try{
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`
        const response=await fetch(apiUrl);
        const data=await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching random News",error)
        return []
    }
}

searchButton.addEventListener('click', async ()=>{
    const query=searchField.value.trim()
    if(query !== ""){
        try{
            const articles =await fetchNewsQuery(query)
            
            displayBlogs(articles)
        }catch(error){
            console.log("Error fetching news by query",error)
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`
        const response=await fetch(apiUrl);
        const data=await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching random News",error)
        return []
    }
}

function displayBlogs(articles){
    cardContainer.innerHTML="";
    articles.forEach((article) => {
        const Card=document.createElement("div")
        Card.classList.add("card");
        const img=document.createElement("img")
        img.src=article.urlToImage
        img.alt=article.title
        const title=document.createElement("h2")
        const truncatedTitle=
        article.title.length > 30
        ? article.title.slice(0,30) + "...."
        : article.title;
        title.textContent=truncatedTitle;
        const description=document.createElement("p")
        const truncatedDes=
        article.description.length > 120
        ? article.description.slice(0,120) + "...."
        : article.description;
        description.textContent=truncatedDes;
        Card.appendChild(img);
        Card.appendChild(title);
        Card.appendChild(description);
        Card.addEventListener("click", ()=>{
            window.open(article.url,"_blank")
        });
        cardContainer.appendChild(Card);


    });
}

(async ()=> {
    try{
        const articles=await fetchRandomNews();
        displayBlogs(articles);

    }catch(error){
        console.error('Error fetching random news',error);
    }
})();
