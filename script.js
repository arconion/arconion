document.getElementById('webhookForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const webhookUrl = document.getElementById('webhookUrl').value;
    const webhookMessage = document.getElementById('webhookMessage').value;
    const webhookQuantity = parseInt(document.getElementById('webhookQuantity').value);

    const responseElement = document.getElementById('response');
    responseElement.innerText = '';

    try {
        for (let i = 0; i < webhookQuantity; i++) {
            await new Promise(resolve => setTimeout(resolve, 5));

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: webhookMessage })
            });

            if (!response.ok) {
                throw new Error(`Error sending message ${i + 1}/${webhookQuantity}: ${response.statusText}`);
            }

            responseElement.innerText = `Sent message ${i + 1}/${webhookQuantity} successfully!`;
        }
    } catch (error) {
        responseElement.innerText = error.message;
    }
});
