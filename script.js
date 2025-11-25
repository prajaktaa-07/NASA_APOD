const BASE_URL = "http://localhost:3000";

window.onload = () => loadToday();

async function loadToday() {
    setLoading();
    try {
        const res = await fetch(`${BASE_URL}/apod/today`);
        const data = await res.json();

        if (!res.ok || data.error) return showError(data.error || "Unable to load today's APOD.");
        showData(data);
    } catch (err) {
        showError("Unable to load today's APOD.");
    }
}

async function loadByDate() {
    const d = document.getElementById("pickDate").value;
    if (!d) return alert("Please select a date!");

    setLoading();
    try {
        const res = await fetch(`${BASE_URL}/apod/${d}`);
        const data = await res.json();

        if (!res.ok || data.error) return showError(data.error || "No data found for this date.");
        showData(data);
    } catch (err) {
        showError("Unable to load APOD for this date.");
    }
}

function setLoading() {
    document.getElementById("outputArea").innerHTML = `
        <div style="
            padding: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            margin-top: 10px;
            font-size: 18px;
            text-align:center;
        ">Loading...</div>
    `;
}


function showError(msg) {
    document.getElementById("outputArea").innerHTML = `
        <div style="
            padding: 20px;
            background:#ffe5e5;
            border-left:5px solid red;
            border-radius:10px;
            margin-top:10px;
        ">
            <h3 style="color:black; margin:0 0 10px 0;">Error</h3>
            <p style="color:black;">${msg}</p>
        </div>
    `;
}

function showData(data) {
    document.getElementById("outputArea").innerHTML = `
        <div style="
            background: rgba(255,255,255,0.05);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 0 15px rgba(0,0,0,0.3);
            margin-top: 20px;
        ">
            <h2 style="margin-top:0;">${data.title}</h2>
            <p><b>Date:</b> ${data.date}</p>
            <img src="${data.url}" alt="APOD Image">
            <p style="line-height:1.6; font-size:16px;">${data.explanation}</p>
            ${data.copyright ? `<p><b>© ${data.copyright}</b></p>` : ""}
        </div>
    `;
}

function showHome() {
    document.getElementById("outputArea").innerHTML = "";
    loadToday();
}

function showGallery() {
    document.getElementById("outputArea").innerHTML = `
        <p style="font-size:18px;">Gallery coming soon! Fetching recent APODs...</p>
    `;
 
}

function showAbout() {
    document.getElementById("outputArea").innerHTML = `
        <div style="padding:20px;">
            <h2>About NASA APOD Explorer</h2>
            <p>This project displays NASA's Astronomy Picture of the Day using Node.js backend and frontend.</p>
            <p><b>Features:</b></p>
            <ul>
                <li>Dashboard with today's APOD</li>
                <li>Date picker to view past APODs</li>
                <li>Gallery view </li>
                <li>Responsive design</li>
            </ul>
            <p><b>Technologies:</b> Node.js, JavaScript, HTML, CSS</p>
            <p>Developed by: Prajakta Nalawade</p>
        </div>
    `;
}
