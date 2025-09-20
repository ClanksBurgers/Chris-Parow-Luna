//Copyright Footer
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `Christopher Parow ${thisYear}`;
footer.appendChild(copyright);

//Skills
const skills = ["JavaScript", "HTML", "CSS", "Github", "SQL", "Python", "Excel", "Pandas"];
const skillsSection = document.getElementById("Skills");
const skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.innerHTML = skills[i];
    skillsList.appendChild(skill);
};