const comments = [
  {
    name: "Victor Pinto",
    date: "11/02/2023",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Christina Cabrera",
    date: "10/28/2023",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Isaac Tadesse",
    date: "10/20/2023",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

function displayComment(comment) {
  const commentBox = document.querySelector(".comments");

  const commentElement = document.createElement("div");

  const nameElement = document.createElement("h2");
  nameElement.textContent = comment.name;
  commentElement.appendChild(nameElement);

  const imgElement = document.createElement("img");
  imgElement.textContent = comment.img;
  commentElement.appendChild(imgElement);

  const dateElement = document.createElement("p");
  dateElement.textContent = comment.date;
  commentElement.appendChild(dateElement);

  const commentTextElement = document.createElement("p");
  commentTextElement.textContent = comment.comment;
  commentElement.appendChild(commentTextElement);

  commentBox.appendChild(commentElement);
}

function clearComments() {
  const commentBox = document.querySelector(".comments");
  commentBox.innerHTML = "";
}
