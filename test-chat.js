
async function testChat() {
    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "suggest something sweet" })
        });
        const text = await response.text();
        console.log("Status:", response.status);
        console.log(text);
    } catch (e) {
        console.error("Error:", e);
    }
}

testChat();
