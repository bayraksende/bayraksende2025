const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    orders: [
        {
            id: 1,
            date: "2024-03-15",
            total: 199.99,
            status: "delivered"
        }
    ]
};

function renderOrderHistory() {
    const orderHistory = document.getElementById('order-history');
    orderHistory.innerHTML = mockUser.orders.map(order => `
        <div class="border-t pt-4 mt-4">
            <p class="text-sm text-gray-600">Order #${order.id}</p>
            <p class="font-medium">$${order.total.toFixed(2)}</p>
            <span class="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                ${order.status}
            </span>
        </div>
    `).join('');
}

renderOrderHistory();