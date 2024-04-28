import BandSiteApi from './band-site-api.js';

const apiKey = 'comments';
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
  dateElement.textContent = comment.date;
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
    commentsData.reverse(); 

    commentsData.forEach(comment => {
      displayComment(comment);
    });

    commentsData.reverse(); 
  } catch (error) {
    console.error('Error rendering comments:', error);
  }
}

async function submitComment(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const commentText = document.getElementById('commentText').value;

  if (!name.trim()) {
    document.getElementById('name').classList.add('error');
  }

  if (!commentText.trim()) {
    document.getElementById('commentText').classList.add('error');
  }

  if (!commentText.trim() || !name.trim()) {
    return;
  }

  try {
    const newComment = {
      name: name,
      date: new Date().toLocaleDateString(),
      comment: commentText
    };

    await bandSiteApi.postComment(newComment);

    document.getElementById('name').value = '';
    document.getElementById('commentText').value = '';

    await renderComments();
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
}

const form = document.querySelector('.commentForm');
form.addEventListener('submit', submitComment);

document.addEventListener("DOMContentLoaded", renderComments);