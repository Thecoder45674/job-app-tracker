
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

// Function to open the dialog
function openDialog(dialog) {
    dialog.showModal();
}

// Function to close the dialog
function closeDialog(dialog) {
    dialog.close();
}

// Attach Event Listeners to Buttons
document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById("add-app-dialog");
    const closeDialogBtn = document.getElementById("close-dialog-btn");
    const openDialogBtn = document.getElementById("add-btn");

    // Event listeners for expand buttons
    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener("click", toggleView);
    });

    // Open Dialog on button click
    openDialogBtn.addEventListener("click", () => {
        openDialog(dialog);
    })

    // Close Dialog on button click
    closeDialogBtn.addEventListener("click", () => {
        closeDialog(dialog);
    });
})
