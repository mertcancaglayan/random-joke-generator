const gifApiKey = "2h3P6ZDJfilCM6s7JOGh2tn5LModSe2t";
const jokeApiUrl =
	"https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist,explicit&type=single";

const container = document.querySelector(".container");
const gifContainer = document.querySelector(".gifContainer");
const jokeContainer = document.querySelector(".jokeContainer");
const btnElement = document.querySelector(".btn");

function init() {
	let getJoke = () => {
		fetch(jokeApiUrl)
			.then((data) => data.json())
			.then((item) => {
				const jokeText = item.joke || item.setup + " " + item.delivery;

				const jokeParagraph = document.createElement("p");
				jokeParagraph.textContent = jokeText;

				jokeContainer.innerHTML = "";
				jokeContainer.appendChild(jokeParagraph);
			})
			.catch((error) => {
				console.error("Error fetching joke:", error);
				jokeContainer.innerHTML = "An error occurred while fetching the joke.";
			});
	};

	let getGif = async () => {
		const searchTerms = [
			"fun",
			"joke",
			"laughter",
			"humor",
			"amusement",
			"comedy",
			"joy",
			"entertainment",
			"hilarious",
		];
		try {
			const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
			const response = await fetch(
				`https://api.giphy.com/v1/gifs/search?api_key=${gifApiKey}&limit=100&q=${randomTerm}`,
			);
			const data = await response.json();

			if (data.data && data.data.length > 0) {
				gifContainer.innerHTML = "";
				const randomIndex = Math.floor(Math.random() * data.data.length);
				const tile = data.data[randomIndex];
				const gifUrl = tile.images.original.url;

				const gifElement = document.createElement("img");

				gifElement.style.width = "300px";
				gifElement.style.height = "200px";

				gifElement.src = gifUrl;
				gifContainer.append(gifElement);
			} else {
				alert("No GIFs found for the search term.");
			}

			getJoke();
		} catch (error) {
			console.error("Error fetching data:", error);
			alert("An error occurred while fetching data.");
		}
	};

	btnElement.addEventListener("click", () => {
        getGif()
        container.classList.add("slide");

        setTimeout(() => {
            container.classList.remove("slide");
        }, 500);
    });

	getJoke();
	getGif();
}

init()