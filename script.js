document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('openBtn');
    const closeBtn = document.getElementById('closeBtn');
    const videoPopup = document.getElementById('videoPopup');
    const closeVideoBtn = document.getElementById('closeVideoBtn');
    const video = document.getElementById('letterVideo');
    
    let isEnvelopeOpen = false;

    // Buka surat + tampilkan video
    openBtn.addEventListener('click', function() {
        if (isEnvelopeOpen) return;
        
        // Buka amplop
        envelope.classList.add('open');
        isEnvelopeOpen = true;
        
        // Tampilkan video popup setelah animasi amplop
        setTimeout(() => {
            videoPopup.classList.add('active');
            video.play().catch(e => console.log('Video play error:', e));
        }, 300);
        
        updateButtons();
    });

    // Tutup surat + sembunyikan video
    closeBtn.addEventListener('click', function() {
        if (!isEnvelopeOpen) return;
        
        // Tutup video dulu
        videoPopup.classList.remove('active');
        video.pause();
        video.currentTime = 0;
        
        // Tutup amplop
        envelope.classList.remove('open');
        isEnvelopeOpen = false;
        
        updateButtons();
    });

    // Tombol close di video
    closeVideoBtn.addEventListener('click', function() {
        videoPopup.classList.remove('active');
        video.pause();
        video.currentTime = 0;
        
        // Juga tutup amplop
        envelope.classList.remove('open');
        isEnvelopeOpen = false;
        updateButtons();
    });

    // Tutup video ketika klik di luar video
    videoPopup.addEventListener('click', function(e) {
        if (e.target === videoPopup) {
            videoPopup.classList.remove('active');
            video.pause();
            video.currentTime = 0;
            
            envelope.classList.remove('open');
            isEnvelopeOpen = false;
            updateButtons();
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            videoPopup.classList.remove('active');
            video.pause();
            video.currentTime = 0;
            
            envelope.classList.remove('open');
            isEnvelopeOpen = false;
            updateButtons();
        }
    });

    function updateButtons() {
        openBtn.disabled = isEnvelopeOpen;
        closeBtn.disabled = !isEnvelopeOpen;
    }

    // Reset love animation
    function resetLoveAnimation() {
        const loveContainer = document.querySelector('.love-container');
        if (loveContainer) {
            const newLoveContainer = loveContainer.cloneNode(true);
            loveContainer.parentNode.replaceChild(newLoveContainer, loveContainer);
        }
    }

    console.log('Love Letter ready! 💌');
});