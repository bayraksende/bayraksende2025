// Feedback form handling
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textarea = feedbackForm.querySelector('textarea');
        const feedback = textarea.value;
        
        fetch('/geribildirim', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedback })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                if (confirm('Geri bildirim gönderildi. Görüntülemek ister misiniz?')) {
                    window.location.href = '/geribildirim';
                }
            } else {
                alert('Geri bildirim gönderilemedi: ' + data.error);
            }
        })

        textarea.value = '';
    });
}

// Send money form handling
const sendMoneyForm = document.getElementById('sendMoneyForm');
if (sendMoneyForm) {
    sendMoneyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const employeeSelect = sendMoneyForm.querySelector('select');
        const amountInput = sendMoneyForm.querySelector('input[type="number"]');
        
        const employeeId = employeeSelect.value;
        const amount = amountInput.value;
        
        // Here you would typically send the transaction to your server
        console.log('Transaction:', { employeeId, amount });
        
        // Clear the form
        employeeSelect.value = '';
        amountInput.value = '';
        
        // Show success message
        alert('Money sent successfully!');
    });
}
