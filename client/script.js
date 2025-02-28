// Define separate arrays for each application status
let appliedApplications = [];
let interviewApplications = [];
let rejectedApplications = [];
let offerApplications = [];

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

// Function to add application based on its status
function addApplication(application) {
    switch (application.status.toLowerCase()) {
        case 'applied':
            appliedApplications.push(application);
            displayApplication(application, 'applied');
            break;
        case 'interview':
            interviewApplications.push(application);
            displayApplication(application, 'interview');
            break;
        case 'rejected':
            rejectedApplications.push(application);
            displayApplication(application, 'rejected');
            break;
        case 'offer':
            offerApplications.push(application);
            displayApplication(application, 'offer');
            break;
        default:
            console.error("Unknown application status");
    }
}

// Function to display application in the correct section
function displayApplication(application, sectionID) {
    const contentDiv = document.querySelector(`#${sectionID} .content`);

    const applicationEntry = document.createElement('p');
    applicationEntry.textContent = `${application.title} at ${application.company} on ${application.date}`;

    if (contentDiv) {
        contentDiv.appendChild(applicationEntry);
    }
}

// Function to handle form submission 
function handleFromSubmission(event) {
    // Gather input values
    const title = document.getElementById("position").value; // Change to position since title is not in the form
    const company = document.getElementById("company").value;
    const date = document.getElementById("date").value;
    const status = document.getElementById("status").value;
    const notes = document.getElementById("notes").value;

    const application = {
        title,
        company,
        date,
        status,
        notes
    };

    addApplication(application);

    closeDialog();
}

// Function to open the dialog
function openDialog() {
    const dialog = document.getElementById("add-app-dialog");
    dialog.showModal();
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
    const dialog = document.getElementById('add-app-dialog');
    const closeDialogBtn = document.getElementById('close-dialog-btn');
    const openDialogBtn = document.getElementById('add-btn');
    const jobForm = document.getElementById('job-form');

    // Event listeners for expand buttons
    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener("click", toggleView);
    });

    // Open Dialog on button click
    openDialogBtn.addEventListener("click", openDialog)

    // Close Dialog on button click
    closeDialogBtn.addEventListener("click", closeDialog);

    jobForm.addEventListener("submit", handleFromSubmission);
})
