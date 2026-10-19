'use strict';
document.documentElement.classList.add('js');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  revealElements.forEach(element => observer.observe(element));
} else { revealElements.forEach(element => element.classList.add('visible')); }

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open menu'); navigation.classList.remove('open'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navigation.querySelectorAll('a').forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
  }), { rootMargin: '-15% 0px -60% 0px' });
  document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));
}

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(filter => { const active = filter === button; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
  document.querySelectorAll('.project-card').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) card.classList.add('visible'); });
}));

const projects = {
  safenest: { title: 'SafeNest', category: 'FLUTTER APPLICATION / DIGITAL WELLBEING', description: 'A parent-child monitoring and digital wellbeing application designed to help families manage daily device use.', features: ['Device linking and multi-child management', 'App usage insights, per-app limits and restricted-app overlays', 'Study and bedtime modes', 'Time requests, rewards and parent-child chat'], tags: ['Flutter', 'Android', 'Firebase'] },
  readme: { title: 'AI README Generator', category: 'PUBLISHED VS CODE EXTENSION / DEVELOPER TOOLS', description: 'An AI-assisted VS Code extension that generates structured README documentation for software projects, helping developers document their repositories efficiently.', features: ['AI-assisted documentation generation', 'Structured README content for software projects', 'Integrated into the VS Code development workflow'], tags: ['VS Code', 'AI', 'Documentation'] },
  phishing: { title: 'Phishing URL Detector', category: 'SECURITY TOOL / URL ANALYSIS', description: 'A security tool that analyzes URLs for suspicious or phishing indicators and presents risk warnings to users.', features: ['URL analysis for suspicious indicators', 'Risk warnings to support more informed browsing decisions'], tags: ['Cybersecurity', 'URL analysis'] },
  signature: { title: 'Digital Signature System', category: 'WEB APPLICATION / DOCUMENT WORKFLOWS', description: 'A digital document-signing system for applying and managing electronic signatures and supporting paperless workflows.', features: ['Apply electronic signatures to documents', 'Manage document-signing workflows', 'Support paperless processes'], tags: ['Web application', 'Digital signatures'] },
  lostfound: { title: 'University Lost & Found', category: 'WEB APPLICATION / CAMPUS COMMUNITY', description: 'A university lost and found management system that helps return belongings to their owners.', features: ['Post lost and found items', 'Browse item listings', 'Manage reports in one web application'], tags: ['Web application', 'Campus community'] },
  exam: { title: 'Online Examination System', category: 'WEB APPLICATION / EDUCATION', description: 'A web-based platform for organizing online tests, managing questions and enabling students to complete assessments digitally.', features: ['Organize online tests', 'Manage assessment questions', 'Enable students to complete digital assessments'], tags: ['Web application', 'Online assessments'] }
};
const dialog = document.querySelector('#project-dialog');
let lastProjectButton;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project]; lastProjectButton = button;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-description').textContent = project.description;
  document.querySelector('#dialog-features').replaceChildren(...project.features.map(text => { const item = document.createElement('li'); item.textContent = text; return item; }));
  document.querySelector('#dialog-tags').replaceChildren(...project.tags.map(text => { const tag = document.createElement('span'); tag.textContent = text; return tag; }));
  const enquiry = new URL('https://mail.google.com/mail/');
  enquiry.search = new URLSearchParams({
    view: 'cm', fs: '1', to: 'takmeelmehdi127@gmail.com',
    su: `Enquiry about ${project.title}`,
    body: `Hi Takmeel,\n\nI'd like to know more about ${project.title}.\n\n`
  });
  dialog.querySelector('[data-email-compose]').href = enquiry.href;
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); });
dialog.addEventListener('close', () => lastProjectButton?.focus());
let toastTimer;
function copyEmailFallback(email) {
  // Support local file previews and browsers without Clipboard API access.
  const field = document.createElement('textarea');
  field.value = email;
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;left:-9999px;top:0;';
  document.body.append(field);
  field.select();
  let copied = false;
  try { copied = document.execCommand('copy'); }
  finally { field.remove(); }
  return copied;
}

document.querySelector('.copy-email').addEventListener('click', async event => {
  const button = event.currentTarget;
  const toast = document.querySelector('.toast');
  const email = 'takmeelmehdi127@gmail.com';
  let copied = false;
  try {
    await navigator.clipboard.writeText(email);
    copied = true;
  } catch {
    try { copied = copyEmailFallback(email); } catch { /* Show manual copy option. */ }
  }
  button.focus({ preventScroll: true });
  if (!copied) window.prompt('Copy this email address:', email);
  toast.textContent = copied ? 'Email address copied' : `Email: ${email}`;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4500);
});

document.querySelector('#year').textContent = new Date().getFullYear();
