import BandSiteApi from './band-site-api.js';

const bandSiteApi = new BandSiteApi();

function createCommentElement(comment) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("commentTextBox");

  const commentContent = document.createElement("div");
  commentContent.classList.add("commentContent");

  const avatarElement = document.createElement('div');
  avatarElement.classList.add("avatar");
  commentContent.appendChild(avatarElement);

  const nameElement = document.createElement("h2");
  nameElement.textContent = comment.name;
  nameElement.classList.add("commentName");
  commentContent.appendChild(nameElement);

  const dateElement = document.createElement("p");
  const date = new Date(comment.timestamp);
  dateElement.textContent = date.toLocaleDateString();
  dateElement.classList.add("commentDate");
  commentContent.appendChild(dateElement);

  commentElement.appendChild(commentContent);

  const commentTextElement = document.createElement("p");
  commentTextElement.textContent = comment.comment;
  commentTextElement.classList.add("commentArea");
  commentElement.appendChild(commentTextElement);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttonContainer");

  const likeButton = document.createElement('button');
  likeButton.textContent = 'Like';
  likeButton.classList.add('like-button');
  likeButton.addEventListener('click', async () => {
    try {
      const updatedComment = await bandSiteApi.likeComment(comment.id);
      likeButton.textContent = `Like (${updatedComment.likes})`;
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  });
  buttonContainer.appendChild(likeButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', async () => {
    try {
      await bandSiteApi.deleteComment(comment.id);
      commentElement.remove();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  });
  buttonContainer.appendChild(deleteButton);

  commentElement.appendChild(buttonContainer);

  return commentElement;
}

async function renderComments() {
  try {
    const commentsData = await bandSiteApi.getComments();
    const commentBox = document.querySelector(".commentBox");
    commentBox.innerHTML = "";

    commentsData.forEach(comment => {
      const commentElement = createCommentElement(comment);
      commentBox.appendChild(commentElement);
    });
  } catch (error) {
    console.error('Error rendering comments:', error);
  }
}

async function submitComment(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const commentTextInput = document.getElementById('commentText');
  
  const name = nameInput.value.trim();
  const commentText = commentTextInput.value.trim();

  if (!name) {
    nameInput.classList.add('error');
    return;
  } else {
    nameInput.classList.remove('error');
  }

  if (!commentText) {
    commentTextInput.classList.add('error');
    return;
  } else {
    commentTextInput.classList.remove('error');
  }

  try {
    const newComment = {
      name: name,
      comment: commentText
    };

    const jsonData = JSON.stringify(newComment);

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    await bandSiteApi.postComment(jsonData, config);

    nameInput.value = '';
    commentTextInput.value = '';

    const commentBox = document.querySelector(".commentBox");
    const commentElement = createCommentElement(newComment);
    commentBox.prepend(commentElement);

  } catch (error) {
    console.error('Error submitting comment:', error);
  }
}

const form = document.querySelector('.commentForm');
form.addEventListener('submit', submitComment);

document.addEventListener("DOMContentLoaded", renderComments);
