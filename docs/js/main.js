// ========== Project Data ==========
const projects = {
  xiaobu: {
    category: '智能硬件设计',
    title: '小布智能家庭机器人',
    en: 'Xiaobu Smart Home Robot',
    desc: '一款面向现代家庭场景的智能陪伴机器人，集成语音交互、情感识别与智能家居控制功能。圆润亲和的外观设计降低了科技产品的距离感，柔和的灯光反馈系统让人机交互更加自然流畅。',
    tags: ['工业设计', '智能硬件', 'CMF设计', '人机交互'],
    thumbnail: 'images/小布智能家庭机器人-效果图1.png',
    img: 'images/小布智能家庭机器人.png'
  },
  rehab: {
    category: '医疗产品设计',
    title: '上下肢主被动康复机器人',
    en: 'Upper & Lower Limb Rehabilitation Robot',
    desc: '针对脑卒中及术后患者的康复训练设备，支持主动与被动两种训练模式。通过精准的动力输出与智能传感反馈，帮助患者循序渐进地恢复上下肢运动功能，同时为康复师提供数据化的训练评估。',
    tags: ['医疗设计', '康复设备', '人机工程', '机械设计'],
    thumbnail: 'images/上下肢主被动康复机器人-效果图.png',
    img: 'images/上下肢主被动康复机器人-版面1.jpg',
    extraImages: ['images/上下肢主被动康复机器人-版面2.jpg']
  },
  tide: {
    category: '公共设施设计',
    title: '潮汐卫士 · 智能潮汐预警与救援系统',
    en: 'Tide Guardian · Warning & Rescue System',
    desc: '为沿海城市设计的智能潮汐预警与救援系统，集实时潮汐监测、智能预警发布与自动救援响应于一体。模块化的结构设计便于在海岸线灵活部署，为公众提供全方位的安全保障。',
    tags: ['公共设计', '救援系统', '智能预警', '模块化设计'],
    thumbnail: 'images/潮汐卫士-智能潮汐预警与救援系统.jpg',
    img: 'images/潮汐卫士-智能潮汐预警与救援系统.jpg'
  },
  baby: {
    category: '婴幼儿产品设计',
    title: '初履 · 幼儿学步手推车',
    en: 'ChuLv Baby Walker',
    desc: '专为初学步行的婴幼儿设计的手推车产品。在确保安全性的前提下，通过趣味性的形态语言和丰富的色彩组合，激发宝宝的探索欲望。结构稳定、材质安全，陪伴宝宝迈出人生第一步。',
    tags: ['婴幼儿', '产品设计', '安全设计', '色彩研究'],
    thumbnail: 'images/初履幼儿学步手推车-效果图.png',
    img: 'images/初履幼儿学步手推车设计.png'
  },
  ruihu: {
    category: '概念设计',
    title: '睿护 · 未来医疗机器人',
    en: 'RuiHu · Future Medical Robot',
    desc: '面向未来智慧医院场景的医疗机器人概念设计，融合AI辅助诊断、手术支持与病房巡检等功能。极富未来感的造型语言与柔和的灯光系统，传递出科技医疗的人文关怀。',
    tags: ['概念设计', '医疗机器人', '未来感', 'AI'],
    thumbnail: 'images/睿护-未来医疗机器人.jpg',
    img: 'images/睿护-未来医疗机器人.jpg'
  },
  garden: {
    category: '景观设计',
    title: '花园景观设计',
    en: 'Garden Landscape Design',
    desc: '融合自然美学与功能性的花园景观设计，通过植物配置、空间布局与材质选择，营造出宁静舒适的户外空间。注重生态可持续性与人文关怀的平衡。',
    tags: ['景观设计', '花园设计', '植物配置', '生态设计'],
    thumbnail: 'images/景观作品-花园设计.jpg',
    img: 'images/景观作品-花园设计.jpg'
  },
  camping: {
    category: '景观设计',
    title: '露营基地景观设计',
    en: 'Camping Site Landscape Design',
    desc: '面向户外休闲的露营基地景观规划，结合地形特点与使用需求，打造亲近自然的露营体验空间。设计兼顾功能分区、动线组织与环境保护。',
    tags: ['景观设计', '露营基地', '户外空间', '场地规划'],
    thumbnail: 'images/景观作品-露营基地.jpg',
    img: 'images/景观作品-露营基地.jpg'
  }
};

// ========== GSAP Animations ==========
gsap.registerPlugin(ScrollTrigger);

// Loader
window.addEventListener('load', () => {
  gsap.to('#loader', { opacity: 0, visibility: 'hidden', duration: 0.8, delay: 0.5 });
});

// Hero animations
gsap.from('.hero-badge', { y: 30, opacity: 0, duration: 1, delay: 1, ease: 'power3.out' });
gsap.from('.hero-name-text', { y: 60, opacity: 0, duration: 1.2, delay: 1.2, ease: 'power4.out' });
gsap.from('.hero-sub', { y: 30, opacity: 0, duration: 1, delay: 1.4, ease: 'power3.out' });
gsap.from('.hero-line', { scaleX: 0, duration: 1, delay: 1.6, ease: 'power3.out', transformOrigin: 'center' });
gsap.from('.hero-info span', { y: 20, opacity: 0, duration: 0.8, delay: 1.8, stagger: 0.15, ease: 'power3.out' });
gsap.from('.scroll-indicator', { y: 20, opacity: 0, duration: 1, delay: 2.2, ease: 'power3.out' });

// Nav scroll effect
const nav = document.getElementById('nav');
ScrollTrigger.create({
  start: 'top -80',
  onEnter: () => nav.classList.add('scrolled'),
  onLeaveBack: () => nav.classList.remove('scrolled')
});

// About section animations
gsap.from('.about-text', {
  scrollTrigger: { trigger: '.about-text', start: 'top 80%' },
  y: 40, opacity: 0, duration: 1, ease: 'power3.out'
});
gsap.from('.about-item', {
  scrollTrigger: { trigger: '.about-details', start: 'top 80%' },
  y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
});
gsap.from('.skill-group', {
  scrollTrigger: { trigger: '.skills-container', start: 'top 80%' },
  y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
});

// Works section animations
gsap.from('.works-header', {
  scrollTrigger: { trigger: '.works-header', start: 'top 85%' },
  y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
});
gsap.from('#worksGrid .project-card', {
  scrollTrigger: { trigger: '#worksGrid', start: 'top 80%' },
  y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
});
gsap.from('#worksGrid2 .project-card', {
  scrollTrigger: { trigger: '#worksGrid2', start: 'top 85%' },
  y: 60, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
});

// Contact section
gsap.from('#contact .section-title, #contact .section-desc, #contact .contact-email, #contact .contact-social', {
  scrollTrigger: { trigger: '#contact', start: 'top 80%' },
  y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
});

// ========== Mobile Menu Toggle ==========
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ========== Back to Top Button ==========
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========== Modal ==========
const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modalImg');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalEn = document.getElementById('modalEn');
const modalDesc = document.getElementById('modalDesc');
const modalTags = document.getElementById('modalTags');
const modalClose = document.getElementById('modalClose');
const modalOpenBtn = document.getElementById('modalOpenBtn');
let currentModalImgSrc = '';

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // If it's a link, let it navigate
    if (card.tagName === 'A') return;

    e.preventDefault();
    const key = card.dataset.project;
    const data = projects[key];
    if (!data) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalEn.textContent = data.en;
    modalDesc.textContent = data.desc;
    modalTags.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');
    modalImg.src = data.img;
    currentModalImgSrc = data.img;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

modalOpenBtn.addEventListener('click', () => {
  if (currentModalImgSrc) {
    window.open(currentModalImgSrc, '_blank');
  }
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ========== Smooth hover tilt effect on cards ==========
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  });
});
