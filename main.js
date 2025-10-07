document.addEventListener('DOMContentLoaded', () => {
    // --- RECIPE MODAL LOGIC ---
    const viewRecipeBtns = document.querySelectorAll('.view-recipe-btn');
    const recipeModals = document.querySelectorAll('.recipe-modal');
    const closeRecipeBtns = document.querySelectorAll('.close-modal-btn');

    const openModal = (modal) => {
        if (modal) {
            modal.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('visible');
            document.body.style.overflow = '';
        }
    };

    viewRecipeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal-target');
            const modal = document.querySelector(modalId);
            openModal(modal);
        });
    });

    closeRecipeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.recipe-modal');
            closeModal(modal);
        });
    });

    recipeModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // --- LIGHTBOX LOGIC ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    document.querySelectorAll('.demo-image').forEach(image => {
        image.addEventListener('click', (e) => {
            e.stopPropagation(); // Ngăn modal phía sau bị ảnh hưởng
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
    
    // --- UNIVERSAL ESC KEY ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close lightbox if visible
            if (lightbox.classList.contains('visible')) {
                closeLightbox();
                return;
            }
            // Close recipe modal if visible
            const visibleModal = document.querySelector('.recipe-modal.visible');
            if (visibleModal) {
                closeModal(visibleModal);
                return;
            }
             // Close AI chat if visible
            if (chatModal.classList.contains('visible')) {
                closeAiChat();
            }
        }
    });

    // --- AI ASSISTANT LOGIC ---
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
            const aiResponse = getAiResponse(userInput);
            hideTypingIndicator();
            addMessageToChat(aiResponse, 'ai');
        }, 1200);
    });

    function addMessageToChat(text, sender) {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', sender === 'user' ? 'user-bubble' : 'ai-bubble');
        bubble.innerHTML = text;
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
    
    const knowledgeBase = [
        { keywords: ['gamma', 'cine', 'cinetone', 's-log', 'log'], response: "<b>Gamma</b> quyết định đường cong tương phản và 'chất' của hình ảnh. <br><br><b>S-Cinetone</b> & <b>Cine1/2/3/4</b>: Cho màu sắc điện ảnh, sẵn sàng sử dụng. S-Cinetone có tone màu da rất đẹp. <br><br><b>S-Log2/S-Log3</b>: Giữ lại nhiều chi tiết nhất ở vùng sáng và tối, hình ảnh rất 'phẳng'. Cần phải chỉnh màu (color grade) ở hậu kỳ để có kết quả tốt nhất." },
        { keywords: ['color depth', 'độ sâu màu'], response: "<b>Color Depth</b> là công cụ mạnh mẽ để tinh chỉnh độ sáng (luminance) của từng màu riêng lẻ (Đỏ, Xanh lá, Xanh dương, Cyan, Magenta, Vàng). Nó giúp bạn nhấn mạnh hoặc làm dịu đi một màu sắc cụ thể mà không ảnh hưởng nhiều đến các màu khác." },
        { keywords: ['lưu', 'save', 'memory', 'gọi lại', 'recall'], response: "Để lưu công thức, bạn vào Menu:<br>• <b>Menu Mới (A7IV, A7SIII...):</b> Shooting → Camera Set. Memory.<br>• <b>Menu Cũ (A7III, A6400...):</b> Camera 1 (Tab 1, trang 7) → Memory.<br><br>Sau đó chọn vị trí 1, 2, 3 (lưu vào máy, gọi bằng vòng xoay) hoặc M1-M4 (lưu vào thẻ nhớ)." },
        { keywords: ['knee'], response: "<b>Knee</b> giúp kiểm soát các vùng rất sáng (highlights) để tránh bị 'cháy' (overexposure). <br><br><b>Auto:</b> Máy tự động xử lý, hoạt động tốt trong hầu hết trường hợp.<br><b>Manual:</b> Cho phép bạn kiểm soát chính xác điểm bắt đầu (Point) và độ dốc (Slope) của vùng nén sáng, giúp chuyển tiếp mượt mà hơn." },
        { keywords: ['black level', 'mức độ đen'], response: "<b>Black Level</b> điều chỉnh điểm đen tuyền (màu đen sâu nhất) trong ảnh. Tăng giá trị (+) sẽ làm vùng tối sáng hơn (blacks fade), trong khi giảm giá trị (-) sẽ làm vùng tối sâu hơn (crushed blacks)." },
        { keywords: ['black gamma', 'gamma đen'], response: "<b>Black Gamma</b> chỉ điều chỉnh đường cong gamma ở các vùng tối. <br><br><b>Wide:</b> Nâng các chi tiết vùng tối lên.<br><b>Narrow:</b> Làm cho vùng tối sâu hơn, tăng tương phản ở vùng tối." },
        { keywords: ['color mode', 'chế độ màu'], response: "<b>Color Mode</b> xác định không gian màu và đặc tính màu sắc. <br><br><b>S-Cinetone/Movie/Still:</b> Các chế độ màu tiêu chuẩn, cho ra màu sắc tự nhiên. <br><b>S-Gamut3.Cine / S-Gamut3:</b> Không gian màu rộng, thường đi kèm với S-Log để hậu kỳ chuyên sâu, cho phép bạn linh hoạt chỉnh sửa màu sắc." },
        { keywords: ['mojave', 'scl-01'], response: "Công thức <b>SCL-01: Mojave Sun</b> tạo ra tone màu film hoài niệm, với sắc vàng ấm áp. Rất phù hợp cho ảnh du lịch, đời thường và phong cảnh. Các thông số chính là <b>Gamma: Cine1</b> và <b>Color Mode: S-Gamut3</b>." },
        { keywords: ['daylight', 'scl-27', 'trắng hồng'], response: "Công thức <b>SCL-27: Daylight Cinema</b> mang lại tone da trắng hồng, trong trẻo và hiện đại, tối ưu cho điều kiện ánh sáng ban ngày. Công thức này sử dụng <b>Gamma & Color Mode: S-Cinetone</b> để có màu da đẹp tự nhiên." },
        { keywords: ['stream', 'procolor', 'live'], response: "Công thức <b>PROCOLOR-003</b> được thiết kế cho live stream chuyên nghiệp. Nó giúp kiểm soát tốt vùng sáng (nhờ Knee 105%), đảm bảo hình ảnh không bị cháy sáng ngay cả khi dùng đèn mạnh." },
        { keywords: ['picture profile', 'hồ sơ màu'], response: "<b>Picture Profile (PP)</b> là một menu trên máy ảnh Sony cho phép bạn tùy chỉnh sâu các thông số hình ảnh như Gamma (tương phản), Color Mode (màu sắc), Knee (vùng sáng), Black Level (vùng tối) và nhiều hơn nữa để tạo ra một 'look' hình ảnh độc đáo ngay từ trong máy." }
    ];

    function getAiResponse(input) {
        const lowerInput = input.toLowerCase();
        for (const item of knowledgeBase) {
            for (const keyword of item.keywords) {
                if (lowerInput.includes(keyword)) {
                    return item.response;
                }
            }
        }
        return "Cảm ơn câu hỏi của bạn! Tôi có thể trả lời các câu hỏi về thông số như Gamma, Knee, Color Mode, hoặc các công thức màu cụ thể trên trang. Bạn hãy thử hỏi nhé.";
    }
});
