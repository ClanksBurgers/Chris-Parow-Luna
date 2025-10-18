// Main script: populates skills, projects, messages, and footer
document.addEventListener('DOMContentLoaded', () => {
    // Footer
    const footer = document.getElementById('footer');
    if (footer) {
        // Use the HTML entity for the copyright symbol and current year
        footer.innerHTML = `&copy; ${new Date().getFullYear()} Christopher Parow`;
    }

    // Skills (inserted by JS)
    const skills = ['JavaScript', 'HTML', 'CSS', 'Git', 'SQL', 'Python', 'Excel', 'Pandas'];
    const skillsList = document.getElementById('skills-list');
    if (skillsList) {
        // Clear any existing children (defensive):
        skillsList.innerHTML = '';
        skills.forEach(skill => {
            const li = document.createElement('li');
            li.className = 'skill-item';
            li.textContent = skill;
            skillsList.appendChild(li);
        });
    }

    // Message form handling
    const messageForm = document.getElementById('message-form');
    const messagesList = document.getElementById('messages-list');
    if (messageForm && messagesList) {
        // Helper: create a message list item element
        const createMessageElement = (name, email, text) => {
            const li = document.createElement('li');
            li.className = 'message-item';

            // Author as clickable mailto link
            const authorLink = document.createElement('a');
            authorLink.href = `mailto:${email}`;
            authorLink.textContent = name;
            authorLink.setAttribute('aria-label', `Email ${name}`);

            // Message text
            const msgSpan = document.createElement('span');
            msgSpan.textContent = text;
            msgSpan.style.margin = '0 12px';

            // Remove button
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => li.remove());

            li.appendChild(authorLink);
            li.appendChild(msgSpan);
            li.appendChild(removeBtn);
            return li;
        };

        // Form submit handler
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = (e.target.usersName.value || '').trim();
            const email = (e.target.usersEmail.value || '').trim();
            const message = (e.target.usersMessage.value || '').trim();
            if (!name || !email || !message) return; // basic validation

            const item = createMessageElement(name, email, message);
            messagesList.appendChild(item);
            messageForm.reset();
        });
    }

    // Fetch GitHub repositories and insert into projects list
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
        fetch('https://api.github.com/users/ClanksBurgers/repos?sort=updated')
            .then(res => {
                if (!res.ok) throw new Error('GitHub API error');
                return res.json();
            })
            .then(repos => {
                if (!Array.isArray(repos) || repos.length === 0) {
                    projectsList.innerHTML = '<li>No projects found</li>';
                    return;
                }
                projectsList.innerHTML = '';
                // show up to 6 most recently updated repos
                repos.slice(0, 6).forEach(repo => {
                    const li = document.createElement('li');
                    li.className = 'project-item';
                    const a = document.createElement('a');
                    a.href = repo.html_url;
                    a.textContent = repo.name;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    li.appendChild(a);
                    if (repo.description) {
                        const p = document.createElement('p');
                        p.textContent = repo.description;
                        li.appendChild(p);
                    }
                    projectsList.appendChild(li);
                });
            })
            .catch(err => {
                console.error(err);
                projectsList.innerHTML = '<li>Unable to load projects. Please try again later.</li>';
            });
    }
});