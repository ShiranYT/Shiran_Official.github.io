// LOAD DATA 
const data = PORTFOLIO_DATA;

// UPDATE DOM ELEMENTS
function updateContent() {
    // Brand
    document.getElementById('brandName').textContent = data.brand.name;
    
    // Personal
    document.getElementById('heroName').textContent = data.personal.name;
    document.getElementById('aboutName').textContent = data.personal.name;
    document.getElementById('availabilityText').textContent = data.personal.availability;
    document.getElementById('heroDescription').textContent = data.personal.description;
    document.getElementById('experienceYears').textContent = data.personal.experience;
    document.getElementById('avatarEmoji').textContent = data.personal.avatar;
    document.getElementById('aboutEmoji').textContent = data.personal.aboutEmoji;
    
    // Hero highlights
    const highlights = data.personal.title.split(' ');
    if (highlights.length >= 2) {
        document.getElementById('heroHighlight1').textContent = highlights[0];
        document.getElementById('heroHighlight2').textContent = highlights.slice(1).join(' ');
        document.getElementById('heroHighlight2').setAttribute('data-text', highlights.slice(1).join(' '));
    }
    const profileImg = document.getElementById('profileImage');
    const avatarEmoji = document.getElementById('avatarEmoji');
    
    if (data.personal.profileImage) {
        profileImg.style.display = 'block';
        profileImg.src = data.personal.profileImage;
        profileImg.alt = data.personal.name;
        avatarEmoji.style.display = 'none';
        
        profileImg.onerror = function() {
            this.style.display = 'none';
            avatarEmoji.style.display = 'flex';
            avatarEmoji.textContent = data.personal.avatar;
        };
    } else {
        profileImg.style.display = 'none';
        avatarEmoji.style.display = 'flex';
        avatarEmoji.textContent = data.personal.avatar;
    }
}

    const aboutProfileImg = document.getElementById('aboutProfileImage');
        const aboutEmoji = document.getElementById('aboutEmoji');
        
        console.log('Profile image path:', data.personal.profileImage);  // Debug: Check path
        
        if (data.personal.profileImage) {
            aboutProfileImg.style.display = 'block';
            aboutProfileImg.src = data.personal.profileImage;
            aboutProfileImg.alt = data.personal.name;
            aboutEmoji.style.display = 'none';
            
            // Check if image loaded successfully
            aboutProfileImg.onload = function() {
                console.log('Image loaded successfully!');
            };
            
            aboutProfileImg.onerror = function() {
                console.error('Image failed to load! Check the path.');
                this.style.display = 'none';
                aboutEmoji.style.display = 'flex';
                aboutEmoji.textContent = data.personal.aboutEmoji || '💜';
            };
        } else {
            aboutProfileImg.style.display = 'none';
            aboutEmoji.style.display = 'flex';
            aboutEmoji.textContent = data.personal.aboutEmoji || '💜';
        }

// SOCIAL LINKS
function renderSocialLinks() {
    const social = data.social;
    const containers = [
        document.getElementById('socialLinks'),
        document.getElementById('footerSocial')
    ];
    
    const socialIcons = {
        github: 'fab fa-github',
        linkedin: 'fab fa-linkedin-in',
        twitter: 'fab fa-x-twitter',
        youtube: 'fab fa-youtube',
        discord: 'fab fa-discord',
        roblox: 'fab fa-roblox'
    };
    
    containers.forEach(container => {
        if (!container) return;
        container.innerHTML = '';
        Object.keys(social).forEach(key => {
            if (social[key]) {
                const a = document.createElement('a');
                a.href = social[key];
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.innerHTML = `<i class="${socialIcons[key]}"></i>`;
                container.appendChild(a);
            }
        });
    });
}

// STATS
function renderStats() {
    const container = document.getElementById('aboutStats');
    if (!container) return;
    container.innerHTML = '';
    data.stats.forEach(stat => {
        const div = document.createElement('div');
        div.className = 'stat-card';
        div.innerHTML = `
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        container.appendChild(div);
    });
}

// SKILLS
function renderSkills() {
    const container = document.getElementById('skillsGrid');
    if (!container) return;
    container.innerHTML = '';
    data.skills.forEach((skill, i) => {
        const div = document.createElement('div');
        const delay = (i % 4) + 1;
        div.className = `skill-card reveal reveal-delay-${delay}`;
        
        // Generate level dots
        const level = Math.floor(skill.level / 25);
        const dots = '●'.repeat(Math.min(level, 4)) + '○'.repeat(Math.max(0, 4 - level));
        
        div.innerHTML = `
            <i class="${skill.icon}"></i>
            <h4>${skill.name}</h4>
            <div class="level">${dots}</div>
        `;
        container.appendChild(div);
    });
}

// PROJECTS
function renderProjects() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;
    container.innerHTML = '';
    
    data.projects.forEach((project, i) => {
        const div = document.createElement('div');
        const delay = (i % 3) + 1;
        div.className = `project-card reveal reveal-delay-${delay}`;
        
        // Check if project has an image
        let imageHtml;
        if (project.image) {
            imageHtml = `<img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">`;
            imageHtml += `<div class="project-icon-fallback" style="display:none;"><i class="fas ${project.icon}"></i></div>`;
        } else {
            imageHtml = `<i class="fas ${project.icon} project-icon"></i>`;
        }
        
        div.innerHTML = `
            <div class="project-image">
                ${imageHtml}
            </div>
            <div class="project-body">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" target="_blank"><i class="fab fa-github"></i> Code</a>` : ''}
                    ${project.demo ? `<a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// FOOTER
function updateFooter() {
    document.getElementById('footerText').textContent = data.footer.text;
    document.getElementById('footerBadgeText').textContent = data.footer.badge;
}

// TYPING ANIMATION
function initTyping() {
    const typingEl = document.getElementById('typingText');
    if (!typingEl) return;
    
    const roles = data.roles;
    if (!roles || roles.length === 0) return;
    
    // Find the longest role and set fixed width
    const longestRole = roles.reduce((a, b) => a.length > b.length ? a : b, '');
    typingEl.style.minWidth = longestRole.length + 'ch'; // 'ch' = character width
    
    let idx = 0, char = 0, del = false;
    
    function typeLoop() {
        const current = roles[idx] || '';
        if (del) {
            typingEl.textContent = current.substring(0, char - 1);
            char--;
        } else {
            typingEl.textContent = current.substring(0, char + 1);
            char++;
        }
        if (!del && char === current.length) {
            setTimeout(() => del = true, 2000);
        } else if (del && char === 0) {
            del = false;
            idx = (idx + 1) % roles.length;
        }
        setTimeout(typeLoop, del ? 40 : 70);
    }
    typeLoop();
}

// Scroll to Top
function initLogoScroll() {
    const logo = document.querySelector('.logo')
    if (logo)
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.getElementById('navLinks').classList.remove('active');
        });

}

// MOBILE MENU
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// NAVBAR SCROLL
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
}

// SCROLL REVEAL
function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
}

// SMOOTH SCROLL
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu
                document.getElementById('navLinks').classList.remove('active');
            }
        });
    });
}

// INITIALIZE EVERYTHING 
function init() {
    updateContent();
    renderSocialLinks();
    renderStats();
    renderSkills();
    renderProjects();
    updateFooter();
    initTyping();
    initNavbarScroll();
    initReveal();
    initSmoothScroll();
    initLogoScroll();
}

document.addEventListener('DOMContentLoaded', init);