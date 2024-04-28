import BandSiteApi from './band-site-api.js';

const apiKey = 'commentspage';
const bandSiteApi = new BandSiteApi(apiKey);

function displayComment(comment) {
  const commentBox = document.querySelector(".commentBox");

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

  commentBox.appendChild(commentElement);
}

function clearComments() {
  const commentBox = document.querySelector(".commentBox");
  commentBox.innerHTML = "";
}

async function renderComments() {
  try {
    const commentsData = await bandSiteApi.getComments();

    clearComments();

    commentsData.forEach(comment => {
      displayComment(comment);
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
      comment: commentText,
      timestamp: new Date().toISOString() 
    };

    await bandSiteApi.postComment(newComment);

    nameInput.value = '';
    commentTextInput.value = '';

    await renderComments();
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
}

const form = document.querySelector('.commentForm');
form.addEventListener('submit', submitComment);

document.addEventListener("DOMContentLoaded", renderComments);