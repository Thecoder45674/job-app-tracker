// Define an object to store applications based on status
const applicationLists = {
    applied: [],
    interview: [],
    rejected: [],
    offer: []
};

// Function to toggle the view between expanded and collapsed states
function toggleView(event) {
    const expandButton = event.currentTarget;
    const arrow = expandButton.querySelector('.icon');
    const subHeader = expandButton.parentElement;
    const content = subHeader.nextElementSibling;

    if (content) {
        if (content.style.display === "none" || content.style.display === "") {
            content.style.display = "block";
            arrow.src = "assets/up-arrow.svg";
            
        } else {
            content.style.display = "none";
            arrow.src = "assets/down-arrow.svg";
        }
    }
}

// Function to get the application section by status
function getApplicationSection(status) {
    return document.querySelector(`#${status.toLowerCase()} .content`);
}

// Function to add and display an application based on its status
function addApplication(application) {
    const statusKey = application.status.toLowerCase();

    applicationLists[statusKey].push(application);
    displayApplication(application, statusKey);
}

// Function to display application in the correct section
function displayApplication(application, sectionID) {
    const contentDiv = document.querySelector(`#${sectionID} .content`);
    if (!contentDiv) return;

    const applicationEntry = document.createElement('button');
    applicationEntry.classList.add('job-card');
    applicationEntry.setAttribute('data-item', application.title);

    applicationEntry.innerHTML = `
        <div class="job-header">
            <h2>${application.title}</h2>
            <span class="job-date">${application.date}</span>
        </div>
        <p class="company"><strong>Company:</strong> ${application.company}</p>
        <p class="status"><strong>Status:</strong> ${application.status}</p>
        <p class="job-notes hidden">${application.notes}</p>
    `;

    contentDiv.appendChild(applicationEntry);
}

// Function to handle form submission 
function handleFormSubmission(event) {
    event.preventDefault();

    const application = {
        title: document.getElementById("position").value,
        company: document.getElementById("company").value,
        date: document.getElementById("date").value,
        status: document.getElementById("status").value,
        notes: document.getElementById("notes").value
    };

    addApplication(application);
    closeDialog();
}

// Function to open the dialog
function openDialog() {
    document.getElementById("add-app-dialog").showModal();
}

// Function to close the dialog
function closeDialog() {
    const dialog = document.getElementById("add-app-dialog");
    const form = document.getElementById("job-form");
    
    dialog.close();
    form.reset();
}

// Attach Event Listeners to Buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener("click", toggleView);
    });

    document.getElementById('add-btn').addEventListener("click", openDialog);
    document.getElementById('close-dialog-btn').addEventListener("click", closeDialog);
    document.getElementById('job-form').addEventListener("submit", handleFormSubmission);
})
