const comments = [
  {
    name: "Isaac Tadesse",
    date: "10/20/2023",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
  {
    name: "Christina Cabrera",
    date: "10/28/2023",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Victor Pinto",
    date: "11/02/2023",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  }
];

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

function renderComments() {
  clearComments();
  comments.forEach(comment => {
    displayComment(comment);
  });
}

function submitComment(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const commentText = document.getElementById('commentText').value;

  const newComment = {
    name: name,
    date: new Date().toLocaleDateString(),
    comment: commentText
  };

  comments.push(newComment);

  document.getElementById('name').value = '';
  document.getElementById('commentText').value = '';

  renderComments();
}

const form = document.querySelector('.commentForm');
form.addEventListener('submit', submitComment);

renderComments();

function renderComments() {
  clearComments();
  comments.reverse(); 

  for (let i = 0; i < comments.length; i++) {
    displayComment(comments[i]);
  }
  comments.reverse();
}