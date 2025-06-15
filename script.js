// script.js (საბოლოო ვერსია)

document.addEventListener('DOMContentLoaded', function() {

    // საავტორო უფლებების წლის დინამიური განახლება
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    /**
     * უნივერსალური ფუნქცია მოდალური ფანჯრების სამართავად.
     * @param {string} openBtnId - მოდალის გამხსნელი ღილაკის ID.
     * @param {string} modalId - თავად მოდალური ფანჯრის ID.
     */
    function setupModal(openBtnId, modalId) {
        const openButton = document.getElementById(openBtnId);
        const modalOverlay = document.getElementById(modalId);

        if (!openButton || !modalOverlay) {
            console.warn(`Modal setup failed: Button with ID "${openBtnId}" or Modal with ID "${modalId}" not found.`);
            return;
        }
        
        const closeModalButtons = modalOverlay.querySelectorAll('.modal-close-button, .modal-close-button-bottom');

        // მოდალის გახსნა
        openButton.addEventListener('click', function(event) {
            // თუ ღილაკი არის ლინკი (<a>), ვაუქმებთ მის სტანდარტულ ქცევას
            if (openButton.tagName === 'A') {
                event.preventDefault();
            }
            modalOverlay.classList.add('active');
        });

        // მოდალის დახურვის ფუნქცია
        function closeModal() {
            modalOverlay.classList.remove('active');
        }

        // დახურვის ღილაკებზე ივენთების დამატება
        closeModalButtons.forEach(button => {
            button.addEventListener('click', closeModal);
        });
        
        // ფონზე კლიკით დახურვა
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // ფუნქციის გამოძახება ორივე მოდალისთვის
    setupModal('open-about-modal-button', 'about-us-modal');
    setupModal('open-contact-modal-button', 'contact-modal');


    // Escape ღილაკით ყველა აქტიური მოდალის დახურვა
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activeModals = document.querySelectorAll('.modal-overlay.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });


    // პორტფოლიოს ფილტრაციის ლოგიკა
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        // თავდაპირველი ანიმაციისთვის ელემენტების მომზადება
        portfolioItems.forEach(item => {
            item.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // აქტიური კლასის შეცვლა
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');

                // ელემენტების ფილტრაცია ანიმაციით
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    const shouldShow = filterValue === 'all' || itemCategory === filterValue;
                    
                    if (shouldShow) {
                        item.style.display = 'block';
                        setTimeout(() => { // მცირე დაყოვნება display:block-ის შემდეგ ანიმაციისთვის
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        // ანიმაციის დასრულების შემდეგ ელემენტის დამალვა
                        setTimeout(() => {
                            if (item.style.opacity === '0') {
                                item.style.display = 'none';
                            }
                        }, 400); // ეს დრო უნდა ემთხვეოდეს transition-ის დროს
                    }
                });
            });
        });
    }
});

// ფონის სურათის "ზარმაცი" ჩატვირთვა (დამატებულია)
window.addEventListener('load', function() {
    document.body.style.backgroundImage = "url('images/background_image3.webp')";
});