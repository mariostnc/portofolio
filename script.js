// Portfolio data - customize this with your information
const portfolioData = {
    name: "Mario",
    title: "Front-End Developer",
    about: `Hello! I'm a passionate developer who loves creating new designs.
    
I specialize in web development, with expertise in:
• Frontend: HTML, CSS, JavaScript, React.

When I'm not coding, you can find me outside cause i got a life,
btw I'm searchinf for a job.`,
    
    projects: [
        {
            name: "Red Themed Dashboard",
            description: "A simple red themed dashboard with login page, register page, and a dashboard page. It has small animations",
            link: "https://red-themed-dashboard.vercel.app/",
            tech: ["HTML", "CSS", "JavaScript"]
        }
    ],
    
    contact: {
        email: "mariovoodoo28@gmail.com",
        github: "https://github.com/mariostnc",
        instagram: "https://instagram.com/mariostnc"
    }
};

// Typewriter effect function
function typeWriter(element, text, speed = 30) {
    return new Promise((resolve) => {
        if (animationSkipped) {
            element.innerHTML = text;
            resolve();
            return;
        }
        
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// Initialize the portfolio
async function initPortfolio() {
    const nameOutput = document.getElementById('name-output');
    const aboutOutput = document.getElementById('about-output');
    const projectsOutput = document.getElementById('projects-output');
    const contactOutput = document.getElementById('contact-output');
    
    // Display name
    await typeWriter(nameOutput, portfolioData.name + '\n' + portfolioData.title, 50);
    
    // Display about section
    await typeWriter(aboutOutput, portfolioData.about, 30);
    
    // Display projects
    let projectsText = '';
    portfolioData.projects.forEach((project, index) => {
        projectsText += `${index + 1}. ${project.name}\n`;
        projectsText += `   Description: ${project.description}\n`;
        projectsText += `   Link: <a href="${project.link}" target="_blank">${project.link}</a>\n`;
        projectsText += `   Tech: ${project.tech.map(tech => `<span class="skill-tag">${tech}</span>`).join(' ')}\n\n`;
    });
    await typeWriter(projectsOutput, projectsText, 20);
    
    // Display contact information
    let contactText = `Get in touch with me:\n\n`;
    contactText += `<a href="mailto:${portfolioData.contact.email}" class="contact-link">📧 Email</a>\n`;
    contactText += `<a href="${portfolioData.contact.github}" target="_blank" class="contact-link">🐙 GitHub</a>\n`;
    contactText += `<a href="${portfolioData.contact.instagram}" target="_blank" class="contact-link">📷 Instagram</a>\n\n`;
    contactText += `Feel free to reach out for collaborations, opportunities, or just to say hello!`;
    
    await typeWriter(contactOutput, contactText, 30);
    
    // Add interactive command line
    setupInteractiveTerminal();
}

// Interactive terminal functionality
function setupInteractiveTerminal() {
    const currentLine = document.getElementById('current-line');
    const terminalContent = document.querySelector('.terminal-content');
    
    // Add some interactive commands
    const commands = {
        'help': 'Available commands: help, clear, about, projects, contact, skills',
        'clear': () => {
            const commandLines = document.querySelectorAll('.command-line:not(#current-line)');
            commandLines.forEach(line => line.remove());
        },
        'about': portfolioData.about,
        'projects': () => {
            let text = 'My Projects:\n\n';
            portfolioData.projects.forEach((project, index) => {
                text += `${index + 1}. ${project.name} - ${project.description}\n`;
            });
            return text;
        },
        'contact': () => {
            let text = 'Contact Information:\n\n';
            Object.entries(portfolioData.contact).forEach(([platform, link]) => {
                text += `${platform}: ${link}\n`;
            });
            return text;
        },
        'skills': 'Frontend: HTML, CSS, JavaScript, React\nTools: Git, Vercel'
    };
    
    // Handle command input
    let commandHistory = [];
    let historyIndex = -1;
    
    // Add input field for typing
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'command-input';
    inputField.style.cssText = `
        background: transparent;
        border: none;
        color: #ffffff;
        font-family: 'JetBrains Mono', monospace;
        font-size: inherit;
        outline: none;
        width: 200px;
        margin-left: 10px;
    `;
    
    currentLine.appendChild(inputField);
    inputField.focus();
    
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = inputField.value;
            executeCommand(command);
            inputField.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                inputField.value = commandHistory[commandHistory.length - 1 - historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                inputField.value = commandHistory[commandHistory.length - 1 - historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                inputField.value = '';
            }
        }
    });
    
    function executeCommand(cmd) {
        if (!cmd.trim()) return;
        
        commandHistory.push(cmd);
        historyIndex = -1;
        
        // Create new command line
        const newLine = document.createElement('div');
        newLine.className = 'command-line';
        newLine.innerHTML = `
            <span class="prompt">$</span>
            <span class="command">${cmd}</span>
            <div class="output"></div>
        `;
        
        terminalContent.insertBefore(newLine, currentLine);
        
        const output = newLine.querySelector('.output');
        const response = commands[cmd.toLowerCase()];
        
        if (typeof response === 'function') {
            const result = response();
            typeWriter(output, result, 20);
        } else if (response) {
            typeWriter(output, response, 20);
        } else {
            typeWriter(output, `Command not found: ${cmd}. Type 'help' for available commands.`, 20);
        }
        
        // Scroll to bottom
        terminalContent.scrollTop = terminalContent.scrollHeight;
        
        // Keep focus on input field
        setTimeout(() => inputField.focus(), 100);
    }
}

// Global variable to track if animation is skipped
let animationSkipped = false;

// Start the portfolio when page loads
document.addEventListener('DOMContentLoaded', initPortfolio);

// Add skip animation functionality
document.addEventListener('DOMContentLoaded', () => {
    const skipBtn = document.getElementById('skipAnimation');
    if (skipBtn) {
        skipBtn.addEventListener('click', skipAllAnimations);
    }
});

// Function to skip all animations
function skipAllAnimations() {
    animationSkipped = true;
    
    // Immediately show all content
    const nameOutput = document.getElementById('name-output');
    const aboutOutput = document.getElementById('about-output');
    const projectsOutput = document.getElementById('projects-output');
    const contactOutput = document.getElementById('contact-output');
    
    if (nameOutput) nameOutput.innerHTML = portfolioData.name + '\n' + portfolioData.title;
    if (aboutOutput) aboutOutput.innerHTML = portfolioData.about;
    
    // Show projects
    if (projectsOutput) {
        let projectsText = '';
        portfolioData.projects.forEach((project, index) => {
            projectsText += `${index + 1}. ${project.name}\n`;
            projectsText += `   Description: ${project.description}\n`;
            projectsText += `   Link: <a href="${project.link}" target="_blank">${project.link}</a>\n`;
            projectsText += `   Tech: ${project.tech.map(tech => `<span class="skill-tag">${tech}</span>`).join(' ')}\n\n`;
        });
        projectsOutput.innerHTML = projectsText;
    }
    
    // Show contact
    if (contactOutput) {
        let contactText = `Get in touch with me:\n\n`;
        contactText += `<a href="mailto:${portfolioData.contact.email}" class="contact-link">📧 Email</a>\n`;
        contactText += `<a href="${portfolioData.contact.github}" target="_blank" class="contact-link">🐙 GitHub</a>\n`;
        contactText += `<a href="${portfolioData.contact.instagram}" target="_blank" class="contact-link">📷 Instagram</a>\n\n`;
        contactText += `Feel free to reach out for collaborations, opportunities, or just to say hello!`;
        contactOutput.innerHTML = contactText;
    }
    
    // Setup interactive terminal immediately
    setupInteractiveTerminal();
    
    // Hide the skip button
    const skipBtn = document.getElementById('skipAnimation');
    if (skipBtn) {
        skipBtn.style.display = 'none';
    }
    
    // Remove all animation delays from command lines
    const commandLines = document.querySelectorAll('.command-line');
    commandLines.forEach(line => {
        line.style.animation = 'none';
        line.style.opacity = '1';
    });
}

// Add some terminal-like effects
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        if (e.target.classList.contains('close')) {
            if (confirm('Close terminal?')) {
                window.close();
            }
        } else if (e.target.classList.contains('minimize')) {
            alert('Terminal minimized!');
        } else if (e.target.classList.contains('maximize')) {
            document.body.requestFullscreen();
        }
    }
}); 