const shows = [
  {
    date: "Mon Sept 09 2024",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 17 2024",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Oct 12 2024",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 16 2024",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 29 2024",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 18 2024",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

function createShowElement(showObj) {
  const showElement = document.createElement("div");
  showElement.classList.add("shows__item");

  const labelsContainer = document.createElement("div");
  labelsContainer.classList.add("shows__item__labels-container");

  const dateLabel = document.createElement("div");
  dateLabel.textContent = "DATE";
  dateLabel.classList.add("shows__item__label");
  labelsContainer.appendChild(dateLabel);

  const date = document.createElement("div");
  date.textContent = showObj.date;
  date.classList.add("shows__item__text");
  labelsContainer.appendChild(date);

  const venueLabel = document.createElement("div");
  venueLabel.textContent = "VENUE";
  venueLabel.classList.add("shows__item__label");
  labelsContainer.appendChild(venueLabel);

  const venue = document.createElement("div");
  venue.textContent = showObj.venue;
  venue.classList.add("shows__item__text");
  labelsContainer.appendChild(venue);

  const locationLabel = document.createElement("div");
  locationLabel.textContent = "LOCATION";
  locationLabel.classList.add("shows__item__label");
  labelsContainer.appendChild(locationLabel);

  const location = document.createElement("div");
  location.textContent = showObj.location;
  location.classList.add("shows__item__text");
  labelsContainer.appendChild(location);

  const button = document.createElement("button");
  button.textContent = "BUY TICKETS";
  button.classList.add("shows__item__button");

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    document.querySelectorAll(".shows__item").forEach((container) => {
      container.classList.remove("shows__item--selected");
    });
    showElement.classList.add("shows__item--selected");
  });

  showElement.appendChild(labelsContainer);
  showElement.appendChild(button);

  return showElement;
}

function showTitle(container) {
  const title = document.createElement("h2");
  title.classList.add("shows");
  title.textContent = "Shows";
  container.appendChild(title);
}

function displayShows() {
  const showsContainer = document.createElement("div");
  showsContainer.classList.add("shows-container");

  showTitle(showsContainer);

  shows.forEach((show) => {
    const showElement = createShowElement(show);
    showsContainer.appendChild(showElement);
  });

  const footer = document.querySelector(".footer");
  footer.parentNode.insertBefore(showsContainer, footer);
}

document.addEventListener("DOMContentLoaded", displayShows);
