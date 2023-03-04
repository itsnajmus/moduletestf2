// Get the modal
var modal = document.querySelector('.modal');

// Get the button that opens the modal
var createBlogButton = document.querySelector('.create-blog-button');

// Get the <span> element that closes the modal
var close = document.querySelector('.close');

// When the user clicks on the button, open the modal
createBlogButton.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
close.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
var form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the title and description values from the form
    var title = document.querySelector('#title').value;
    var description = document.querySelector('#description').value;

    // Create a new blog post object
    var blogPost = {
        title: title,
        description: description
    };

    // Add the blog post to the page
    addBlogPost(blogPost);

    // Clear the form
    form.reset();

    // Close the modal
    modal.style.display = "none";
});

// Add a blog post to the page
function addBlogPost(blogPost) {
    var blogPostsDiv = document.querySelector('#blog-posts');

    // Create a new blog post element
    var blogPostDiv = document.createElement('div');
    blogPostDiv.classList.add('blog-post');

    // Create a new h2 element for the title
    var titleElement = document.createElement('h2');
    titleElement.textContent = blogPost.title;
    blogPostDiv.appendChild(titleElement);

    // Create a new p element for the description
    var descriptionElement = document.createElement('p');
    descriptionElement.textContent = blogPost.description;
    blogPostDiv.appendChild(descriptionElement);

    // Create a new button for editing the blog post
    var editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.addEventListener('click', function () {
        openEditModal(blogPost);
    });
    blogPostDiv.appendChild(editButton);

    // Create a new button for deleting the blog post
    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', function () {
        blogPostsDiv.removeChild(blogPostDiv);
    });
    blogPostDiv.appendChild(deleteButton);

    // Add the blog post element to the page
    blogPostsDiv.appendChild(blogPostDiv);
}

// Open the edit modal with the given blog post data
function openEditModal(blogPost) {
    // Populate the form with the blog post data
    document.querySelector('#title').value = blogPost.title;
    document.querySelector('#description').value = blogPost.description;

    // Show the modal
    modal.style.display = "block";

    // Change the form submit button to say "Save" instead of "Publish"
    document.querySelector('input[type="submit"]').value = "Save";


    // When the form is submitted, update the blog post on the page
    form.removeEventListener('submit', addNewBlogPost);
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Update the blog post object with the new title and description values
        blogPost.title = document.querySelector('#title').value;
        blogPost.description = document.querySelector('#description').value;

        // Update the blog post element on the page with the new values
        var titleElement = blogPostDiv.querySelector('h2');
        titleElement.textContent = blogPost.title;

        var descriptionElement = blogPostDiv.querySelector('p');
        descriptionElement.textContent = blogPost.description;

        // Reset the form and close the modal
        form.reset();
        modal.style.display = "none";
    });
}


