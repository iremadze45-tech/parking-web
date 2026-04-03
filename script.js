// Slider functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    let index = (currentSlide + 1) % slides.length;
    showSlide(index);
}

function prevSlide() {
    let index = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(index);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Event listeners
nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
    });
});

// Auto slide
startAutoSlide();

// Fines form functionality
const finesForm = document.getElementById('finesForm');
const finesResult = document.getElementById('finesResult');

finesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const plateNumber = document.getElementById('plateNumber').value.trim();
    const vinNumber = document.getElementById('vinNumber').value.trim();
    
    if (!plateNumber) {
        finesResult.className = 'fines-result error';
        finesResult.innerHTML = '<p>გთხოვთ, შეიყვანოთ სანომრე ნიშანი.</p>';
        return;
    }
    
    // Simulate checking fines (mock data)
    const mockFines = [
        { date: '2026-03-15', amount: 50, reason: 'არასწორი პარკირება' },
        { date: '2026-03-01', amount: 30, reason: 'გადაჭარბებული დრო' }
    ];
    
    // Random result for demo
    const hasFines = Math.random() > 0.5;
    
    if (hasFines) {
        let html = '<h4>ნაპოვნია ჯარიმები:</h4><ul>';
        mockFines.forEach(fine => {
            html += `<li><strong>${fine.date}</strong> - ${fine.reason}: <strong>${fine.amount}₾</strong></li>`;
        });
        html += '</ul><p class="total">ჯამი: <strong>' + mockFines.reduce((sum, f) => sum + f.amount, 0) + '₾</strong></p>';
        html += '<button class="btn" style="margin-top: 1rem;">ონლაინ გადახდა</button>';
        
        finesResult.className = 'fines-result success';
        finesResult.innerHTML = html;
    } else {
        finesResult.className = 'fines-result success';
        finesResult.innerHTML = '<p>ჯარიმები არ მოიძებნა. გმადლობთ!</p>';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Package selection
document.querySelectorAll('.btn-package').forEach(btn => {
    btn.addEventListener('click', () => {
        const packageName = btn.closest('.package-card').querySelector('h3').textContent;
        alert(`თქვენ აირჩიეთ "${packageName}" პაკეტი. ჩვენ დაგიკავშირდებით მალე!`);
    });
});
