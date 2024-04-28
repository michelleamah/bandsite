import BandSiteApi from './band-site-api.js';

const apiKey = 'showspage';
const bandSiteApi = new BandSiteApi(apiKey);

function createLabelElement(labelText, labelTextContent) {
  const labelElement = document.createElement("div");
  labelElement.textContent = labelText;
  labelElement.classList.add("shows__item__label");

  const contentElement = document.createElement("div");

  if (labelTextContent && typeof labelTextContent === 'number') {
    const date = new Date(labelTextContent);

    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    contentElement.textContent = formattedDate;
    contentElement.classList.add("shows__item__date"); 
  } else {
    contentElement.textContent = labelTextContent;
  }

  contentElement.classList.add("shows__item__text");

  labelElement.appendChild(contentElement);
  return labelElement;
}

function createShowElement(showObj) {
  const showElement = document.createElement("div");
  showElement.classList.add("shows__item");

  const labelsContainer = document.createElement("div");
  labelsContainer.classList.add("shows__item__labels-container");

  labelsContainer.appendChild(createLabelElement("DATE", showObj.date));
  labelsContainer.appendChild(createLabelElement("VENUE", showObj.place));
  labelsContainer.appendChild(createLabelElement("LOCATION", showObj.location));

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

async function displayShows() {
  try {
    const showsData = await bandSiteApi.getShows();

    const showsContainer = document.createElement("div");
    showsContainer.classList.add("shows-container");

    showTitle(showsContainer);

    const showsList = document.createElement("div");
    showsList.classList.add("shows-list");

    showsData.forEach((show) => {
      const showElement = createShowElement(show);
      showsList.appendChild(showElement);
    });

    showsContainer.appendChild(showsList);
    const footer = document.querySelector(".footer");
    footer.parentNode.insertBefore(showsContainer, footer);
  } catch (error) {
    console.error('Error displaying shows:', error);
  }
}

document.addEventListener("DOMContentLoaded", displayShows);