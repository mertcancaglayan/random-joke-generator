const apiKey = "2h3P6ZDJfilCM6s7JOGh2tn5LModSe2t";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const btnElement = document.querySelector(".btn-test");

    btnElement.addEventListener("click", async () => {
        try {
            const response = await fetch("https://api.giphy.com/v1/gifs/search?q=coding+challenges&api_key=" + apiKey + "&limit=100&q=${fun}");
            const data = await response.json();

            if (data.data && data.data.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.data.length);
                const tile = data.data[randomIndex];
                const gifUrl = tile.images.original.url;
                
                const gifElement = document.createElement("img");

                gifElement.style.width = "300px";
                gifElement.style.height = "200px";
                
                gifElement.src = gifUrl;
                container.appendChild(gifElement);
            } else {
                alert("No GIFs found for the search term.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data.");
        }
    });
});