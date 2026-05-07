// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
    }
    });
}, {
    threshold: 0.12
});
reveals.forEach(el => observer.observe(el));

// Navbar background on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60 ?
    'rgba(13,27,30,0.98)' :
    'rgba(13,27,30,0.92)';
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('primaryNav');

const setMobileMenuState = (open) => {
    nav.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
};

navToggle.addEventListener('click', () => {
    const willOpen = !nav.classList.contains('nav-open');
    setMobileMenuState(willOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        setMobileMenuState(false);
    }
    });
});

// Popup for menu images
const menuImageModal = document.getElementById('menuImageModal');
const menuImageModalImg = document.getElementById('menuImageModalImg');
const menuImageModalClose = document.getElementById('menuImageModalClose');
const clickableMenuImages = document.querySelectorAll(
    '.menu-img-wrap img[src*="Speisekarte1"], .menu-img-wrap img[src*="Speisekarte2"]'
);

const closeMenuImageModal = () => {
    menuImageModal.classList.remove('active');
    menuImageModal.setAttribute('aria-hidden', 'true');
    menuImageModalImg.src = '';
};

clickableMenuImages.forEach((img) => {
    img.addEventListener('click', () => {
    menuImageModalImg.src = img.src;
    menuImageModalImg.alt = img.alt;
    menuImageModal.classList.add('active');
    menuImageModal.setAttribute('aria-hidden', 'false');
    });
});

menuImageModalClose.addEventListener('click', closeMenuImageModal);
menuImageModal.addEventListener('click', (event) => {
    if (event.target === menuImageModal) {
    closeMenuImageModal();
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
    closeMenuImageModal();
    }
});

// Partyservice slideshow
const partyserviceImages = [{
    src: './images/Partyservice.jpg',
    alt: 'Bild für Partyservice'
},
{
    src: './images/Partyservice1.jpg',
    alt: 'Partyservice Bild 1'
},
{
    src: './images/Partyservice2.jpg',
    alt: 'Partyservice Bild 2'
},
{
    src: './images/Partyservice3.jpg',
    alt: 'Partyservice Bild 3'
},
{
    src: './images/Partyservice4.jpg',
    alt: 'Partyservice Bild 4'
}
];
const partyserviceImageEl = document.getElementById('partyserviceSlideImage');
const partyservicePrevBtn = document.getElementById('partyservicePrev');
const partyserviceNextBtn = document.getElementById('partyserviceNext');
const partyserviceDotsWrap = document.getElementById('partyserviceDots');
let partyserviceCurrentIndex = 0;
let partyserviceAutoTimer;

const renderPartyserviceSlide = (index) => {
    const {
    src,
    alt
    } = partyserviceImages[index];
    partyserviceImageEl.src = src;
    partyserviceImageEl.alt = alt;

    const dots = partyserviceDotsWrap.querySelectorAll('.partyservice-dot');
    dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
    });
};

const goToPartyserviceSlide = (index) => {
    const total = partyserviceImages.length;
    partyserviceCurrentIndex = (index + total) % total;
    renderPartyserviceSlide(partyserviceCurrentIndex);
};

const startPartyserviceAutoplay = () => {
    clearInterval(partyserviceAutoTimer);
    partyserviceAutoTimer = setInterval(() => {
    goToPartyserviceSlide(partyserviceCurrentIndex + 1);
    }, 7000);
};

partyserviceImages.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'partyservice-dot';
    dot.setAttribute('aria-label', `Bild ${index + 1} anzeigen`);
    dot.addEventListener('click', () => {
    goToPartyserviceSlide(index);
    startPartyserviceAutoplay();
    });
    partyserviceDotsWrap.appendChild(dot);
});

partyservicePrevBtn.addEventListener('click', () => {
    goToPartyserviceSlide(partyserviceCurrentIndex - 1);
    startPartyserviceAutoplay();
});

partyserviceNextBtn.addEventListener('click', () => {
    goToPartyserviceSlide(partyserviceCurrentIndex + 1);
    startPartyserviceAutoplay();
});

goToPartyserviceSlide(0);
startPartyserviceAutoplay();

async function sendMail() {
    const name = document.getElementById("ct-name").value;
    const email = document.getElementById("ct-email").value;
    const phone = document.getElementById("ct-phone")?.value || null;
    const message = document.getElementById("ct-message").value;

    await fetch("https://vedaversum.eu-4.evennode.com/api/contact", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name,
        email,
        phone,
        message
    })
    });
    alert('Vielen Dank für Ihre Nachricht! Wir melden uns bald.');
}