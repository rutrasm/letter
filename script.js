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
            
            // Coba play video dengan cara sederhana
            video.play().then(() => {
                console.log('Video started playing');
            }).catch(error => {
                console.log('Video play error:', error);
                // Tampilkan pesan error sederhana
                alert('Klik tombol play di video untuk memulai');
            });
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

    // Debug: Cek apakah video loaded
    video.addEventListener('loadeddata', function() {
        console.log('Video loaded successfully');
        console.log('Video duration:', video.duration);
    });

    video.addEventListener('error', function() {
        console.log('Video error:', video.error);
        alert('Video tidak ditemukan! Pastikan file "love.mp4" ada di folder yang sama');
    });

    console.log('Love Letter ready! 💌');
});