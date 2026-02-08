// --- home.js ---
// Contém: Simulação do Banco de Dados + Lógica de Renderização + Scroll Reveal + Canvas + 3D Tilt + FAQ Logic

document.addEventListener('DOMContentLoaded', () => {
    console.log("Omni System - JS Loaded");
    
    // 1. INICIALIZAR DADOS E RENDERIZAR
    renderizarSite();

    // 2. INICIALIZAR SCROLL REVEAL
    initScrollReveal();

    // 3. INICIALIZAR CANVAS HERO
    initHeroCanvas();

    // 4. INICIALIZAR EFEITO TILT (3D MOUSE)
    initTiltEffect();

    // 5. INICIALIZAR FAQ
    initFaq();
});


// === BANCO DE DADOS SIMULADO (JSON) ===
const bancoDeDados = {
    planos: [
        {
            categoria: "Start",
            limite: "R$ 2.000,00", // Novo campo baseado na imagem
            preco: "R$400", 
            funcionalidades: [
                "Dashboard Básico",
                "Relatório",
                "2 a 3 telas",
                "Cadastro",
                "Suporte 24 horas",
                "Servidor R$ 120",
                "10 usuários"
            ]
        },
        {
            categoria: "Intermediário",
            limite: "R$ 3.000,00", // Novo campo baseado na imagem
            preco: "R$600",
            funcionalidades: [
                "Dashboard Intermediário",
                "Relatório",
                "4 a 5 telas",
                "Cadastro",
                "Suporte 24 horas",
                "Servidor R$ 200",
                "Integração com Whatsapp",
                "20 usuários"
            ]
        },
        {
            categoria: "Premium",
            limite: "R$ 5.000,00", // Novo campo baseado na imagem
            preco: "R$800",
            funcionalidades: [
                "Dashboard Intermediário",
                "Relatório",
                "4 a 5 telas",
                "Cadastro",
                "Suporte 24 horas",
                "Servidor R$ 300",
                "Integração com Whatsapp",
                "Usuários Ilimitados",
                "White Label",
                "AWSs3"
            ]
        }
    ],
    // DADOS: TECNOLOGIAS
    tecnologias: [
        { nome: "React", icon: "fa-brands fa-react" },
        { nome: "JavaScript", icon: "fa-brands fa-js" },
        { nome: "Python", icon: "fa-brands fa-python" },
        { nome: "Django", icon: "fa-solid fa-server" },
        { nome: "PostgreSQL", icon: "fa-solid fa-database" },
        { nome: "AWS", icon: "fa-brands fa-aws" },
        { nome: "Docker", icon: "fa-brands fa-docker" },
        { nome: "Git", icon: "fa-brands fa-git-alt" }
    ]
};


// === FUNÇÃO DE RENDERIZAÇÃO ===
function renderizarSite() {
    
    // --- Renderizar Tecnologias ---
    const techContainer = document.getElementById('tecnologias-container');
    if (techContainer) {
        techContainer.innerHTML = ''; // Limpa antes de renderizar
        bancoDeDados.tecnologias.forEach(tech => {
            const html = `
                <div class="tech-item">
                    <i class="${tech.icon}"></i>
                    <span>${tech.nome}</span>
                </div>
            `;
            techContainer.innerHTML += html;
        });
    }

    // --- Renderizar Planos (ATUALIZADO PARA O NOVO LAYOUT) ---
    const planosContainer = document.getElementById('planos-container');
    if (planosContainer) {
        planosContainer.innerHTML = ''; // Limpa antes de renderizar
        bancoDeDados.planos.forEach(plano => {
            // Mapeia funcionalidades com ícone de check circle sólido
            const listaHTML = plano.funcionalidades.map(func => `<li><i class="fa-solid fa-circle-check"></i> ${func}</li>`).join('');
            
            const html = `
                <div class="plano-card">
                    <div class="plano-header-group">
                        <h3 class="plano-titulo-label">Plano</h3>
                        <h2 class="plano-nome-destaque">${plano.categoria}</h2>
                        <p class="plano-limite">Até ${plano.limite}</p>
                    </div>
                    
                    <div class="plano-preco-wrapper">
                        <span class="texto-mensal">Mensal</span>
                        <span class="valor-destaque">${plano.preco}</span>
                    </div>

                    <ul class="plano-lista">${listaHTML}</ul>
                    
                    <a href="#" class="btn-assinar">Assinar</a>
                </div>
            `;
            planosContainer.innerHTML += html;
        });
    }
}


// === LÓGICA SCROLL REVEAL ===
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    setTimeout(() => {
        // Seleciona os elementos novos do Grid e CTA também
        const elementsToAnimate = document.querySelectorAll(
            '.section-title, .plano-card, .omni-card, .tech-item, .hero-content p, .hero-content h1, .cta-content, .tech-header, .faq-item, .comparison-table'
        );

        elementsToAnimate.forEach((el) => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });
    }, 100);
}

// === LÓGICA TILT 3D (Efeito Mouse Imersivo) ===
function initTiltEffect() {
    // Aplica o efeito nos cards da Omni e nos Planos também
    const cards = document.querySelectorAll('.omni-card, .plano-card');

    cards.forEach(card => {
        // Inicializa transformação
        card.style.transition = 'transform 0.1s ease-out';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calcular rotação baseada no centro do card
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Ajuste a intensidade da rotação aqui (ex: 5 ou 3)
            const rotateX = ((y - centerY) / centerY) * -3; 
            const rotateY = ((x - centerX) / centerX) * 3;  

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        // Resetar ao sair
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.5s ease'; // Volta suave
        });
    });
}

// === LÓGICA FAQ (ACCORDION) ===
function initFaq() {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Fecha todos os outros
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Se não estava ativo, abre
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// === LÓGICA DO CANVAS (PARTÍCULAS) ===
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const colors = ['#D4AF37', '#F4C430', '#AA8020', '#FFD700', '#DAA520'];

        const mouse = {
            x: width / 2,
            y: height / 2
        };

        window.addEventListener('resize', () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        });

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = width / 2;
            mouse.y = height / 2;
        });

        class Particle {
            constructor() {
                this.relativeX = (Math.random() - 0.5) * width * 1.1;
                this.relativeY = (Math.random() - 0.5) * height * 1.1;
                
                this.x = width / 2 + this.relativeX;
                this.y = height / 2 + this.relativeY;

                this.waveAngle = Math.random() * Math.PI * 2; 
                this.waveSpeed = Math.random() * 0.02 + 0.005; 
                this.waveRange = Math.random() * 20 + 10; 
                
                this.w = 0; 
                this.h = 0;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                
                this.friction = Math.random() * 0.03 + 0.01; 
                
                this.angle = 0;
            }

            draw() {
                if (!isFinite(this.x) || !isFinite(this.y)) return;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                
                ctx.fillStyle = this.color;
                ctx.beginPath();
                
                if (ctx.roundRect) {
                    ctx.roundRect(-this.w/2, -this.h/2, this.w, this.h, 2);
                } else {
                    ctx.rect(-this.w/2, -this.h/2, this.w, this.h);
                }
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.waveAngle += this.waveSpeed;
                const waveOffset = Math.sin(this.waveAngle) * this.waveRange;

                const targetX = mouse.x + this.relativeX;
                const targetY = mouse.y + this.relativeY + waveOffset;

                this.x += (targetX - this.x) * this.friction;
                this.y += (targetY - this.y) * this.friction;

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                
                this.angle = Math.atan2(dy, dx);

                const distance = Math.sqrt(dx * dx + dy * dy);
                const sizeFactor = Math.min(distance * 0.02, 3); 

                this.w = 5 + sizeFactor * 3;  
                this.h = 2 + sizeFactor * 0.4; 

                this.draw();
            }
        }

        let particlesArray = [];

        function initParticles() {
            particlesArray = [];
            const numberOfParticles = 70; 
            
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        initParticles();
        
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, width, height);
            particlesArray.forEach(p => p.update());
        }
        animate();
    }
}