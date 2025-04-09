document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);

    // Music control
    const audio = document.getElementById('weddingAudio');
    const musicControl = document.querySelector('.music-control');
    let isPlaying = false;

    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            musicControl.innerHTML = '<i class="fas fa-music"></i><span class="music-text">Putar Musik</span>';
        } else {
            audio.play().catch(e => console.log('Autoplay prevented:', e));
            musicControl.innerHTML = '<i class="fas fa-pause"></i><span class="music-text">Jeda Musik</span>';
        }
        isPlaying = !isPlaying;
    }

    // Auto play music with interaction
    document.body.addEventListener('click', function() {
        if (!audio.played) {
            audio.play().then(() => {
                isPlaying = true;
                musicControl.innerHTML = '<i class="fas fa-pause"></i><span class="music-text">Jeda Musik</span>';
            }).catch(e => console.log('Autoplay prevented:', e));
        }
    }, { once: true });

    musicControl.addEventListener('click', toggleMusic);

    // Scroll reveal animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-from-left, .animate-from-right, .animate-from-bottom, .animate-from-top, .animate-zoom-in, .animate-fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initialize

    // Countdown timer
    const weddingDate = new Date('June 12, 2025 08:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-container').innerHTML = '<h3>Acara Pernikahan Telah Berlangsung!</h3>';
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            
            lightboxImg.setAttribute('src', imgSrc);
            lightboxCaption.textContent = imgAlt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // RSVP Form
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpSuccess = document.getElementById('rsvpSuccess');

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(function() {
            rsvpForm.style.display = 'none';
            rsvpSuccess.style.display = 'block';
            
            // Create confetti effect
            createConfetti();
        }, 1000);
    });

    // Copy to clipboard function
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
            showToast('Nomor rekening berhasil disalin');
        }, function() {
            showToast('Gagal menyalin, coba lagi');
        });
    };

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(function() {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() {
                document.body.removeChild(toast);
            }, 500);
        }, 3000);
    }

    // Create flower petals
    function createPetals() {
        const petalCount = 15;
        const petals = ['🌸', '💮', '🏵️', '🌹', '🌺', '🌻', '🌼', '🌷'];
        
        for (let i = 0; i < petalCount; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.className = 'petal';
                petal.textContent = petals[Math.floor(Math.random() * petals.length)];
                petal.style.left = Math.random() * 100 + 'vw';
                petal.style.fontSize = (Math.random() * 20 + 10) + 'px';
                petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
                petal.style.animationDelay = Math.random() * 5 + 's';
                document.body.appendChild(petal);
                
                setTimeout(() => {
                    petal.remove();
                }, 10000);
            }, i * 300);
        }
    }

    // Create confetti
    function createConfetti() {
        const confettiCount = 100;
        const colors = ['#b76e79', '#d4af37', '#f8e9e9', '#ffffff'];
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 30);
        }
    }

    // Initialize petals on cover section
    const coverSection = document.querySelector('.cover-section');
    coverSection.addEventListener('mouseenter', createPetals);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll down button
    document.querySelector('.scroll-down').addEventListener('click', function() {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Add floating animation to some elements
    const floatingElements = document.querySelectorAll('.couple-img, .event-icon, .bank-icon');
    floatingElements.forEach(el => {
        el.classList.add('floating');
    });

    // Add heartbeat to love icon
    document.querySelector('.heart i').classList.add('heartbeat');
});


document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('invitation-overlay');
    const openBtn = document.getElementById('open-invitation-btn');
    
    // Cek jika sudah pernah dibuka sebelumnya
    if(!sessionStorage.getItem('invitationOpened')) {
        overlay.style.display = 'flex';
    } else {
        overlay.style.display = 'none';
    }
    
    openBtn.addEventListener('click', function() {
    // Simpan status di sessionStorage
    sessionStorage.setItem('invitationOpened', 'true');
    
    // Trigger animasi slide-up
    overlay.classList.add('slide-up');
    
    // Putar musik setelah animasi dimulai
    const audio = document.getElementById('weddingAudio');
    audio.play().catch(e => console.log('Autoplay prevented:', e));
    
    // Hapus overlay setelah animasi selesai
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 800); // Sesuaikan dengan durasi animasi (0.8s)
});
    
    // Efek hover untuk tombol
    openBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 5px 15px rgba(183, 110, 121, 0.4)';
    });
    
    openBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});
