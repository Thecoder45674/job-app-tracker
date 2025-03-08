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

    const sectionId = subHeader.parentElement.id;

    if (content) {
        const isExpanded = content.style.display === "block";

        // Toggle the display state
        content.style.display = isExpanded ? "none" : "block";
        arrow.src = isExpanded ? "assets/down-arrow.svg" : "assets/up-arrow.svg";

        // Save the toggle state in Local Storage
        localStorage.setItem(`${sectionId}-expanded`, !isExpanded);
    }
}

// Function to load the toggle state from Local Storage 
function loadToggleStates(){
    const sections = ['applied', 'interview', 'rejected', 'offer'];

    sections.forEach(section => {
        // Get the stored state
        const expanded = localStorage.getItem(`${section}-expanded`) === 'true';

        const contentDiv = getApplicationSection(section);
        const arrow = document.querySelector(`#${section} .expand-btn .icon`);

        if (contentDiv) {
            if (!expanded) {
                contentDiv.style.display = "none";
                arrow.src = "assets/down-arrow.svg"; 
            } else {
                contentDiv.style.display = "block"; 
                arrow.src = "assets/up-arrow.svg"; 
            }
        }
    });
}

// Function to save applications to local storage
function saveApplicationsToLocalStorage() {
    localStorage.setItem('applications', JSON.stringify(applicationLists));
}

// Function to load applications from local storage
function loadApplicationsFromLocalStorage() {
    const storedApplications = localStorage.getItem('applications');
    if (storedApplications) {
        const parsedApplications = JSON.parse(storedApplications);
        for (const status in parsedApplications) {
            parsedApplications[status].forEach(application => {
                addApplication(application); 
            });
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

    saveApplicationsToLocalStorage();
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

    const dialogContent = document.createElement('div');
    dialogContent.classList.add("dialog-options");

    // Create and append the title for the options
    const optionsTitle = document.createElement('h1');
    optionsTitle.textContent = 'Application Options';
    optionsTitle.classList.add('dialog-title');
    dialogContent.appendChild(optionsTitle); 

    // Button to view notes
    const viewNotesButton = createActionButton('View Notes', () => {
        viewNotes(application);
        dialog.close();
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
        deleteApplication(application.id);
        dialog.close();
    });

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
    button.classList.add('action-button');
    button.textContent = text;
    button.onclick = onClick;
    return button;
}

// Function to view notes for a specific application 
function viewNotes(application) {
    const dialog = document.createElement('dialog');
    dialog.classList.add('dialog');

    const dialogTitle = document.createElement('h3');
    dialogTitle.classList.add('dialog-title');
    dialogTitle.textContent = 'Application Notes';

    const notesContent = document.createElement('div');
    notesContent.setAttribute('id', 'notes-content');
    notesContent.innerHTML = `
        <p>${application.notes || "No notes available."}</p>
    `;

    dialog.appendChild(dialogTitle);
    dialog.appendChild(notesContent);
    document.body.appendChild(dialog);

    dialog.showModal();

    attachDialogCloseListener(dialog);
}

// Function to delete an application by its title
function deleteApplication(applicationID) {
    for (const status in applicationLists) {
        // Find the index of the application by title
        const index = applicationLists[status].findIndex(app => app.id === applicationID);
        if (index !== -1) {
            // Remove the application from the array
            applicationLists[status].splice(index, 1);

            // Remove the application from the DOM
            const contentDiv = getApplicationSection(status);
            if (contentDiv) {
                const applicationEntry = contentDiv.querySelector(`button[data-id="${applicationID}"]`);
                if (applicationEntry) {
                    contentDiv.removeChild(applicationEntry);
                }
            }

            saveApplicationsToLocalStorage();
            break;
        }
    }
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
    loadApplicationsFromLocalStorage();  // Load applications from local storage
    loadToggleStates(); // Load the toggle states after loading applications

    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener("click", toggleView);
    });

    document.getElementById('add-btn').addEventListener("click", openAddApplicationDialog);
    document.getElementById('job-form').addEventListener("submit", handleFormSubmission);
})