/* Show Menu */
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => nav.classList.toggle('show-menu'));
    }
};

showMenu('nav-toggle', 'nav-menu');

/* Remove menu on mobile after choosing a section. */
const navLink = document.querySelectorAll('.nav_link');
navLink.forEach(link => link.addEventListener('click', () => {
    document.getElementById('nav-menu')?.classList.remove('show-menu');
}));

/* Scroll sections active link. */
const sections = document.querySelectorAll('section[id]');
function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const link = document.querySelector(`.nav_menu a[href="#${section.id}"]`);
        if (!link) return;

        const active = scrollY > section.offsetTop - 50 &&
            scrollY <= section.offsetTop - 50 + section.offsetHeight;
        link.classList.toggle('active-link', active);
    });
}
window.addEventListener('scroll', scrollActive);

/* Show scroll-to-top button. */
window.addEventListener('scroll', () => {
    document.getElementById('scroll-top')?.classList.toggle('show-scroll', window.scrollY >= 200);
});

/* Light/dark mode. */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
let darkMode = localStorage.getItem('dark-mode');

function enableDarkMode() {
    document.body.classList.add(darkTheme);
    themeButton?.classList.add('fa-sun');
    themeButton?.classList.remove('fa-moon');
    localStorage.setItem('dark-mode', 'enabled');
}

function disableDarkMode() {
    document.body.classList.remove(darkTheme);
    themeButton?.classList.add('fa-moon');
    themeButton?.classList.remove('fa-sun');
    localStorage.setItem('dark-mode', 'disabled');
}

if (darkMode === 'enabled') enableDarkMode();
themeButton?.addEventListener('click', () => {
    darkMode = localStorage.getItem('dark-mode');
    darkMode === 'enabled' ? disableDarkMode() : enableDarkMode();
});

/* Download the pre-generated PDF on mobile, based on the selected theme. */
const downloadButton = document.getElementById('download-button');
downloadButton?.addEventListener('click', () => {
    downloadButton.href = document.body.classList.contains(darkTheme)
        ? 'assets/pdf/myResumeCV-dark.pdf'
        : 'assets/pdf/myResumeCV-light.pdf';
});

/* Calculate and show age. */
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    const dia = hoy.getDate() - nacimiento.getDate();
    if (mes < 0 || (mes === 0 && dia < 0)) edad--;
    return edad;
}

document.addEventListener('DOMContentLoaded', () => {
    const edadElemento = document.getElementById('edad');
    if (edadElemento) edadElemento.textContent = `${calcularEdad('1988-01-22')} años`;
});

/* Export the complete CV as three A4 pages. */
const areaCV = document.getElementById('area-cv');
const resumeButton = document.getElementById('resume-button');

async function generateResume() {
    if (!areaCV || typeof html2pdf !== 'function') return;

    const isDark = document.body.classList.contains(darkTheme);
    const pageGroups = [
        ['.resume_left > #home', '.resume_left > .social', '#profile', '#skills', '#languages'],
        ['#experience', '#certificates'],
        ['#education', '#interests', '#projects', '#strengths']
    ];
    const exportRoot = document.createElement('div');
    exportRoot.className = `pdf-export${isDark ? ' pdf-export-dark' : ''}`;

    pageGroups.forEach((selectors, index) => {
        const page = document.createElement('section');
        page.className = 'pdf-page';
        page.setAttribute('aria-label', `Página ${index + 1}`);

        selectors.forEach(selector => {
            const section = areaCV.querySelector(selector);
            if (section) page.appendChild(section.cloneNode(true));
        });
        exportRoot.appendChild(page);
    });

    document.body.classList.add('scale-cv');
    document.body.appendChild(exportRoot);

    try {
        await Promise.all(Array.from(exportRoot.querySelectorAll('img')).map(image => {
            if (image.complete) return Promise.resolve();
            return new Promise(resolve => {
                image.onload = resolve;
                image.onerror = resolve;
            });
        }));
        await document.fonts?.ready;

        const filename = `Darwuin Pedroza-${isDark ? 'dark' : 'light'}.pdf`;
        await html2pdf()
            .set({
                margin: [10, 10, 10, 10],
                filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: isDark ? '#212121' : '#FAFAFA',
                    scrollY: 0
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['css', 'legacy'], after: '.pdf-page' }
            })
            .from(exportRoot)
            .save();
    } catch (error) {
        console.error('No se pudo generar el PDF:', error);
    } finally {
        exportRoot.remove();
        document.body.classList.remove('scale-cv');
    }
}

resumeButton?.addEventListener('click', generateResume);
