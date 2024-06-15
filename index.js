// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})
  
// JavaScript code to handle download button click
document.getElementById('downloadButton').addEventListener('click', function() {
  // Use fetch to get the content of cv.html
  fetch('./CV.html')
      .then(response => response.text())
      .then(html => {
        // Customize styles for PDF rendering
        const style = `
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    font-size: 12pt; /* Adjust font size as needed */
                }
                /* Additional styles specific to your CV layout */
                .section {
                    /* Example: Increase line height for better readability */
                    line-height: 1.6;
                }
                /* Ensure no page breaks */
                @media print {
                    .no-break {
                        page-break-inside: avoid;
                    }
                }
            </style>
        `;
        
        // Inject styles into HTML content
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>CV</title>
                ${style}
            </head>
            <body>
                ${html}
            </body>
            </html>
        `;
 
        // Generate PDF
        html2pdf().from(htmlContent).set({
            margin: [10, 10, 10, 10], // Top, Left, Bottom, Right margins
            filename: 'Your_CV.pdf',
            pagebreak: { mode: 'avoid-all' }, // Prevent page breaks
            html2canvas: { scale: 2 }, // Increase scale for better quality
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // Page settings
        }).save();
    })
      .catch(error => {
          console.error('Error fetching CV content:', error);
      });
});