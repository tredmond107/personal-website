// Resume.js - Handles dynamic resume rendering
// This file should be placed in your js/ directory

// Load resume data from JSON file
async function loadResumeData() {
    try {
        const response = await fetch('data/resume.json');
        const data = await response.json();
        renderResume(data);
    } catch (error) {
        console.error('Error loading resume data:', error);
        showError('Failed to load resume data. Please try again later.');
    }
}

// Error handling
function showError(message) {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.innerHTML = `
            <div style="color: #e74c3c; text-align: center; padding: 20px;">
                <h3>⚠️ Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Template functions
function createHeader(data) {
    return `
        <div class="header">
            <div class="header-content">
                <h1 class="name">${data.name}</h1>
                <p class="title">${data.title}</p>
                <div class="contact-info">
                    <div class="contact-item">📧 ${data.email}</div>
                    <div class="contact-item">📱 ${data.phone}</div>
                    <div class="contact-item">📍 ${data.location}</div>
                    <div class="contact-item">🌐 ${data.website}</div>
                    <div class="contact-item">💼 ${data.linkedin}</div>
                    <div class="contact-item">🐙 ${data.github}</div>
                </div>
            </div>
        </div>
    `;
}

function createSummary(summary) {
    return `
        <div class="section">
            <h2 class="section-title">Professional Summary</h2>
            <div class="summary">${summary}</div>
        </div>
    `;
}

function createExperience(experiences) {
    const experienceItems = experiences.map(exp => `
        <div class="experience-item">
            <div class="item-header">
                <div>
                    <div class="item-title">${exp.title}</div>
                    <div class="item-company">${exp.company}</div>
                </div>
                <div class="item-date">${exp.date}</div>
            </div>
            <div class="item-description">
                <p>${exp.description}</p>
                <ul>
                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    return `
        <div class="section">
            <h2 class="section-title">Professional Experience</h2>
            ${experienceItems}
        </div>
    `;
}

function createEducation(education) {
    const educationItems = education.map(edu => `
        <div class="education-item">
            <div class="item-header">
                <div>
                    <div class="item-title">${edu.degree}</div>
                    <div class="item-company">${edu.institution}</div>
                </div>
                <div class="item-date">${edu.date}</div>
            </div>
            <div class="item-description">
                <p>${edu.details}</p>
            </div>
        </div>
    `).join('');

    return `
        <div class="section">
            <h2 class="section-title">Education</h2>
            ${educationItems}
        </div>
    `;
}

function createCertifications(certifications) {
    if (!certifications || certifications.length === 0) {
        return '';
    }
    
    const certificationItems = certifications.map(cert => `
        <div class="education-item">
            <div class="item-header">
                <div>
                    <div class="item-title">${cert.name}</div>
                </div>
                <div class="item-date">${cert.date}</div>
            </div>
        </div>
    `).join('');

    return `
        <div class="section">
            <h2 class="section-title">Certifications</h2>
            ${certificationItems}
        </div>
    `;
}

function createSkills(skills) {
    const skillCategories = Object.entries(skills).map(([category, skillList]) => `
        <div class="skill-category">
            <h4>${category}</h4>
            <div class="skill-tags">
                ${skillList.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');

    return `
        <div class="section">
            <h2 class="section-title">Technical Skills</h2>
            <div class="skills-grid">
                ${skillCategories}
            </div>
        </div>
    `;
}

// Main render function
function renderResume(data) {
    const content = `
        ${createHeader(data.personal)}
        <div class="content">
            ${createSummary(data.summary)}
            ${createExperience(data.experience)}
            ${createEducation(data.education)}
            ${createCertifications(data.certifications)}
            ${createSkills(data.skills)}
        </div>
    `;

    document.getElementById('resume-content').innerHTML = content;
}

// Initialize resume on page load
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('resume-content').style.display = 'block';
        loadResumeData();
    }, 1000);
});

// Export functions for potential use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadResumeData,
        renderResume,
        createHeader,
        createSummary,
        createExperience,
        createEducation,
        createCertifications,
        createSkills
    };
}