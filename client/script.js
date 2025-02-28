
// Function to toggle the view between expanded and collapsed states
function toggleView(event) {
    // Find the button's parent .sub-header element, then get the next sibling (content)
    const expandButton = event.currentTarget;
    const arrow = expandButton.querySelector('.icon');
    const subHeader = expandButton.parentElement;
    const content = subHeader.nextElementSibling;

    if (content) {
        // Toggle the visibility of the content div
        if (content.style.display === "none" || content.style.display === "") {
            content.style.display = "block";
            arrow.src = "assets/up-arrow.svg";
            
        } else {
            content.style.display = "none";
            arrow.src = "assets/down-arrow.svg";
        }
    }
}

// Attach Event Listeners to Buttons
document.addEventListener('DOMContentLoaded', () => {

    const dialog = document.getElementById("add-app-dialog");
    const closeDialogBtn = document.getElementById("close-dialog-btn");

    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener("click", toggleView);
    });

    // Close Dialog on button click
    closeDialogBtn.addEventListener("click", () => {
        dialog.style.display = "none";
    });
})
