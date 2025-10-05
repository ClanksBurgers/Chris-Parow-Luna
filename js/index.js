//Copyright Footer
document.addEventListener("DOMContentLoaded", function() {
    const footer = document.getElementById("footer");
    footer.innerHTML = `Christopher Parow ${new Date().getFullYear()}`;
});

//Skills
const skills = ["JavaScript", "HTML", "CSS", "Github", "SQL", "Python", "Excel", "Pandas"];
const skillsSection = document.getElementById("Skills");
const skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.innerHTML = skills[i];
    skillsList.appendChild(skill);
};

//Message Forms
const messageForm = document.forms['leave_messages'];
messageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;
    console.log(usersName, usersEmail, usersMessage);
    event.target.reset();

    // Add message to messages section
    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');
    newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a>: <span>${usersMessage}</span>`;
    //Add Remove Button
    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = 'button';
    removeButton.addEventListener('click', function() {
        const entry = this.parentNode;
        entry.remove();
    });
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
});

// Fetch GitHub Repos
fetch('https://api.github.com/users/ClanksBurgers/repos')
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch GitHub");
        }
        return response.json();
    })
    .then(repositories => {
        console.log(repositories);
        const projectSection = document.getElementById('Projects');
        const projectList = projectSection.querySelector('ul');
        for (let i = 0; i < repositories.length; i++) {
            const project = document.createElement('li');
            const projectLink = document.createElement('a');
            projectLink.href = repositories[i].html_url;
            projectLink.innerText = repositories[i].name;
            projectLink.target = "_blank"; // Open in new tab
            project.appendChild(projectLink);
            projectList.appendChild(project);
        }
    })
    .catch(error => {
        console.error('Error fetching repositories:', error);
        const projectSection = document.getElementById('Projects');
        const projectList = projectSection.querySelector('ul');
        projectList.innerHTML = '<li>Unable to load projects. Please try again later.</li>';
    });