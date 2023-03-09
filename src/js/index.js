import { API_VERSION, GIPHY_API, GIPHY_API_KEY } from "./config.js";
const LIMIT = 10;
const content = document.querySelector(".content");
const input = document.querySelector("#input");
const userInput = input.addEventListener("input", () => {
  clean();
  handleInput();
  render();
});

let search = `${GIPHY_API}/${API_VERSION}/gifs/trending?api_key=${GIPHY_API_KEY}&limit=${LIMIT}&rating=g`;

function handleInput() {
  let inputText = input.value;
  inputText = inputText.replaceAll(" ", "+");
  if (inputText.length > 2) {
    search = `${GIPHY_API}/${API_VERSION}/gifs/search?api_key=${GIPHY_API_KEY}&q=${inputText}&limit=${LIMIT}&rating=g&lang=en`;
  } else {
    search = `${GIPHY_API}/${API_VERSION}/gifs/trending?api_key=${GIPHY_API_KEY}&limit=${LIMIT}&rating=g`;
  }
}

function clean() {
  content.innerHTML = ``;
}

async function fetchData(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

async function render() {
  const getGifs = await fetchData(search);

  getGifs?.data?.map((gif) => {
    const node = document.createElement("div");

    node.innerHTML = `
        
    <div class="card">
        <img
            class="gif"
            src=${gif.images?.fixed_height.url}
            alt="${gif.title}"
        />
        <div class="creator">
            <img
                src="${
                  gif.user
                    ? gif.user.avatar_url
                    : "https://www.svgrepo.com/show/507440/user.svg"
                }"
                alt="${gif.username}"
            />
            <p>${gif.username ? gif.username : "user"}</p>
        </div>
    </div>
    
        `;

    content.appendChild(node);
  });
}

render();
