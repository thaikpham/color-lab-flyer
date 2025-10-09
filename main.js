document.addEventListener('DOMContentLoaded', () => {
    // --- RECIPE MODAL LOGIC ---
    const recipeCards = document.querySelectorAll('.recipe-card');
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

    recipeCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal-target');
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
            e.stopPropagation(); // Prevent modal from closing
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
            if (lightbox.classList.contains('visible')) {
                closeLightbox();
                return;
            }
            const visibleModal = document.querySelector('.recipe-modal.visible');
            if (visibleModal) {
                closeModal(visibleModal);
            }
        }
    });
    
    // --- VIDEO PLAYER LOGIC ---
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');

    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const videoId = thumbnail.getAttribute('data-video-id');
            if (!videoId) return;

            const iframeContainer = document.createElement('div');
            iframeContainer.classList.add('video-iframe-container');

            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');

            iframeContainer.appendChild(iframe);
            
            // Replace the thumbnail's parent container (the .video-container div)
            // with the iframe container to maintain layout.
            // In this new structure, thumbnail is the child, so we replace thumbnail itself.
            thumbnail.parentNode.replaceChild(iframeContainer, thumbnail);
        });
    });

});
