/* Generate PDF */

// PDF generated area
let areaCV = document.getElementById('area-cv');

// Button
let resumeButton = document.getElementById("resume-button");

// Generate PDF with html2pdf.js
async function generateResume() {
    const filename = document.body.classList.contains(darkTheme)
        ? 'Darwuin Pedroza-dark.pdf'
        : 'Darwuin Pedroza-light.pdf';

    const sectionGroups = [
        Array.from(areaCV.querySelectorAll('.resume_left .section')),
        Array.from(areaCV.querySelectorAll('#experience, #certificates')),
        Array.from(areaCV.querySelectorAll('#education, #interests, #projects, #strengths'))
    ];

    const exporter = html2pdf()
        .set({
            margin: 5,
            filename: filename,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                backgroundColor: document.body.classList.contains(darkTheme) ? '#212121' : '#FAFAFA'
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        });

    // Aislar temporalmente cada hoja para que el generador exporte tres páginas completas.
    const originalLeft = areaCV.querySelector('.resume_left');
    const originalRight = areaCV.querySelector('.resume_right');
    const originalLeftDisplay = originalLeft.style.display;
    const originalRightDisplay = originalRight.style.display;

    const leftSections = Array.from(originalLeft.querySelectorAll('.section'));
    const rightSections = Array.from(originalRight.querySelectorAll('.section'));

    document.body.classList.add('pdf-generating');

    // Página 1: datos personales y resumen lateral.
    rightSections.forEach(section => section.style.display = 'none');
    originalRight.style.display = 'none';

    await exporter
        .from(areaCV)
        .toPdf()
        .get('pdf')
        .then(pdf => {
            // Página 2: experiencia y certificados.
            leftSections.forEach(section => section.style.display = 'none');
            originalLeft.style.display = 'none';
            rightSections.forEach(section => {
                section.style.display = ['experience', 'certificates'].includes(section.id)
                    ? ''
                    : 'none';
            });
            originalRight.style.display = '';

            return html2pdf()
                .set({
                    margin: 5,
                    image: { type: 'jpeg', quality: 1 },
                    html2canvas: {
                        scale: 2,
                        useCORS: true,
                        backgroundColor: '#FAFAFA'
                    },
                    jsPDF: {
                        unit: 'mm',
                        format: 'a4',
                        orientation: 'portrait'
                    }
                })
                .from(areaCV)
                .toPdf()
                .get('pdf');
        })
        .then(secondPdf => {
            // La tercera página se genera desde las secciones restantes.
            rightSections.forEach(section => {
                section.style.display = ['education', 'interests', 'projects', 'strengths'].includes(section.id)
                    ? ''
                    : 'none';
            });

            return html2pdf()
                .set({
                    margin: 5,
                    image: { type: 'jpeg', quality: 1 },
                    html2canvas: {
                        scale: 2,
                        useCORS: true,
                        backgroundColor: '#FAFAFA'
                    },
                    jsPDF: {
                        unit: 'mm',
                        format: 'a4',
                        orientation: 'portrait'
                    }
                })
                .from(areaCV)
                .toPdf()
                .get('pdf');
        })
        .catch(error => {
            console.error('Error al generar las tres páginas del PDF:', error);
        })
        .finally(() => {
            originalLeft.style.display = originalLeftDisplay;
            originalRight.style.display = originalRightDisplay;
            leftSections.forEach(section => section.style.display = '');
            rightSections.forEach(section => section.style.display = '');
            document.body.classList.remove('pdf-generating');
        });

    // Restaurar de inmediato el contenido mientras se captura cada página.
}
