document.addEventListener('DOMContentLoaded', () => {
    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    document.querySelectorAll('.demo-image').forEach(image => {
        image.addEventListener('click', () => {
            lightboxImage.src = image.src;
            lightbox.style.display = 'flex';
            setTimeout(() => lightbox.classList.add('visible'), 10);
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('visible');
         setTimeout(() => { lightbox.style.display = 'none'; }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // AI Assistant Logic
    const aiBtn = document.getElementById('ai-assistant-btn');
    const chatModal = document.getElementById('ai-chat-modal');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    function openAiChat() {
        chatModal.style.display = 'flex';
        setTimeout(() => chatModal.classList.add('visible'), 10);
    }

    function closeAiChat() {
        chatModal.classList.remove('visible');
        setTimeout(() => { chatModal.style.display = 'none'; }, 300);
    }

    aiBtn.addEventListener('click', openAiChat);
    closeChatBtn.addEventListener('click', closeAiChat);
    chatModal.addEventListener('click', (e) => {
        if (e.target === chatModal) closeAiChat();
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = chatInput.value.trim();
        if (!userInput) return;

        addMessageToChat(userInput, 'user');
        chatInput.value = '';
        
        showTypingIndicator();

        setTimeout(() => {
            const aiResponse = getMockAiResponse(userInput);
            hideTypingIndicator();
            addMessageToChat(aiResponse, 'ai');
        }, 1500);
    });

    function addMessageToChat(text, sender) {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', sender === 'user' ? 'user-bubble' : 'ai-bubble');
        bubble.textContent = text;
        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.classList.add('chat-bubble', 'ai-bubble', 'typing-indicator');
        indicator.innerHTML = `<span></span><span></span><span></span>`;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
     function hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if(indicator) indicator.remove();
    }

    function getMockAiResponse(input) {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('gamma') || lowerInput.includes('cine') || lowerInput.includes('cinetone')) {
            return "Gamma là đường cong tương phản, quyết định 'chất' của ảnh. Cine1 và S-Cinetone cho cảm giác điện ảnh, trong khi S-Log2/3 giữ lại nhiều chi tiết nhất để hậu kỳ.";
        }
        if (lowerInput.includes('color depth') || lowerInput.includes('màu') || lowerInput.includes('depth')) {
            return "Color Depth là công cụ mạnh nhất để chỉnh màu. Nó giúp bạn tăng/giảm độ sáng của từng màu riêng lẻ (Đỏ, Lục, Lam, Cyan, Magenta, Vàng) để đạt được sắc thái chính xác bạn muốn.";
        }
        if (lowerInput.includes('lưu') || lowerInput.includes('save') || lowerInput.includes('memory')) {
            return "Để lưu công thức, bạn vào Menu -> Shooting (tab màu hồng) -> Shooting Mode -> Camera Set. Memory. Sau đó chọn vị trí 1, 2, 3 (trên vòng xoay) hoặc M1-M4 (trên thẻ nhớ) để lưu.";
        }
         if (lowerInput.includes('knee')) {
            return "Knee kiểm soát cách các vùng sáng (highlight) được nén lại để tránh bị 'cháy sáng'. Chế độ Tự động hoạt động tốt trong hầu hết các trường hợp, trong khi Thủ công (Manual) cho phép bạn kiểm soát chính xác hơn điểm và độ dốc của vùng chuyển tiếp.";
        }
        return "Cảm ơn câu hỏi của bạn! Tôi vẫn đang trong giai đoạn học hỏi và sẽ sớm có câu trả lời chi tiết hơn. Trong lúc này, bạn có thể tham khảo các thông số chi tiết trên trang nhé.";
    }

});
