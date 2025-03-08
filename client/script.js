// Define an object to store applications based on status
const applicationLists = {
    applied: [],
    interview: [],
    rejected: [],
    offer: []
};

// Counter to generate unique ID
let applicationIdCounter = 0;

// Function to generate unique application IDs
function generateApplicationId() {
    return ++applicationIdCounter;
}

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
    applicationEntry.setAttribute('data-id', application.id);

    applicationEntry.innerHTML = `
        <div class="job-header">
            <h2>${application.title}</h2>
            <span class="job-date">${application.date}</span>
        </div>
        <p class="company"><strong>Company:</strong> ${application.company}</p>
    `;

    // Add click event to show details in a dialong
    applicationEntry.addEventListener("click", () => {
        showDialog(application);
    });

    contentDiv.appendChild(applicationEntry);
}

// Function to handle form submission 
function handleFormSubmission(event) {
    event.preventDefault();

    const application = {
        id: generateApplicationId(),
        title: document.getElementById("position").value,
        company: document.getElementById("company").value,
        date: document.getElementById("date").value,
        status: document.getElementById("status").value,
        notes: document.getElementById("notes").value
    };

    addApplication(application);
    closeAddApplicationDialog();
}

// Function to create and display a blank dialog with application action buttons
function showDialog(application) {
    // Create the dialog element
    const dialog = document.createElement('dialog');
    dialog.classList.add('dialog');

    // Create dialog content
    const dialogContent = document.createElement('div');
    dialogContent.classList.add("dialog-options");

    // Button to view notes
    const viewNotesButton = createActionButton('View Notes', () => {
        console.log("View notes:", application.notes);
    });

    // Button to update status
    const updateStatusButton = createActionButton('Update Status', () => {
        console.log("Update status for:", application.id);
    });

    // Button to edit application
    const editApplicationButton = createActionButton('Edit Application', () => {
        console.log("Edit application:", application.id);
    });

    // Button to delete application
    const deleteApplicationButton = createActionButton('Delete Application', () => {
        console.log("Delete application:", application.id);
    });

    // Append buttons to the button container
    dialogContent.appendChild(viewNotesButton);
    dialogContent.appendChild(updateStatusButton);
    dialogContent.appendChild(editApplicationButton);
    dialogContent.appendChild(deleteApplicationButton);

    dialog.appendChild(dialogContent)
    document.body.appendChild(dialog);
    dialog.showModal();

    attachDialogCloseListener(dialog);
}

// Function to create an action button
function createActionButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = onClick;
    return button;
}

function attachDialogCloseListener(dialog) {
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}

// Function to create and display the "Add New Application" dialog
function openAddApplicationDialog() {
    const dialog = document.getElementById("add-app-dialog");
    dialog.showModal();

    // Attach event listener to close the dialog when clicking outside
    attachDialogCloseListener(dialog);
}

// Function to close the dialog
function closeAddApplicationDialog() {
    const dialog = document.getElementById("add-app-dialog");
    if (dialog) {
        dialog.close();
        // Optional: reset the form when closing
        document.getElementById("job-form").reset();
    }
}

// Attach Event Listeners to Buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener("click", toggleView);
    });

    document.getElementById('add-btn').addEventListener("click", openAddApplicationDialog);
    document.getElementById('job-form').addEventListener("submit", handleFormSubmission);
})
