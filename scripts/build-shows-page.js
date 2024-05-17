//**********************************//
//            SHOW DATA             //
//**********************************//
const shows = [
  {
    showDate: "Mon Sep 09 2024",
    showVenue: "Ronald Lane",
    showLocation: "San Francisco, CA"
  },
  {
    showDate: "Tue Sep 17 2024",
    showVenue: "Pier 3 East",
    showLocation: "San Francisco, CA"
  },
  {
    showDate: "Sat Oct 12 2024",
    showVenue: "View Lounge",
    showLocation: "San Francisco, CA"
  },
  {
    showDate: "Sat Nov 16 2024",
    showVenue: "Hyatt Agency",
    showLocation: "San Francisco, CA"
  },
  {
    showDate: "Fri Nov 29 2024",
    showVenue: "Moscow Center",
    showLocation: "San Francisco, CA"
  },
  {
    showDate: "Wed Dec 18 2024",
    showVenue: "Press Club",
    showLocation: "San Francisco, CA"
  },
  {
    showDate: "i need a girlfriend",
    showVenue: "right now",
    showLocation: "im in toronto"
  }
];

//**********************************//
//           SHOW SCEHMA            //
//**********************************//
const showSchema = {
  type: "article",
  className: "show",
  components: [
    {
      type: "div",
      className: "show__date",
      children: [
        {
          type: "p",
          className: "show__text--helper",
          content: "date"
        },
        {
          type: "p",
          className: "show__text--bold",
          content: "showDate"
        }
      ]
    },
    {
      type: "div",
      className: "show__venue",
      children: [
        {
          type: "p",
          className: "show__text--helper",
          content: "venue"
        },
        {
          type: "p",
          className: "show__text",
          content: "showVenue"
        }
      ]
    },
    {
      type: "div",
      className: "show__location",
      children: [
        {
          type: "p",
          className: "show__text--helper",
          content: "location"
        },
        {
          type: "p",
          className: "show__text",
          content: "showLocation"
        }
      ]
    },
    {
      type: "div",
      className: "show__button-container",
      children: [
        {
          type: "button",
          className: "show__button",
          content: "buy tickets"
        }
      ]
    }
  ]
};

//******************************************************//
//              CREATE ELEMENTS OF SHOW                 //
//******************************************************//
function createShowElements(schema, data) {
  const $element = document.createElement(schema.type);
  $element.classList.add(schema.className);

  if (schema.content !== "") {
    // if the value exists as a key
    if (schema.content in data) {
      // assign the value as the keys value
      $element.textContent = data[schema.content];
    } else {
      // or, just keep the original content described in the schema
      $element.textContent = schema.content;
    }
  }

  if (schema.children) {
    schema.children.forEach(child => {
      const $child = createShowElements(child, data);
      $element.appendChild($child);
    });
  }

  return $element;
};

//******************************************************//
//                     CREATE SHOW                      //
//******************************************************//
function createShow(schema, data) {
  const $show = document.createElement(schema.type);
  $show.classList.add(schema.className);

  showSchema.components.forEach(component => {
    const $child = createShowElements(component, data);
    $show.appendChild($child);
  });

  return $show;
};

//******************************************************//
//                    RENDER SHOWS                      //
//******************************************************//
function renderShows(shows, showSchema) {
  const region = document.getElementById("shows");

  shows.forEach(show => {
    const $show = createShow(showSchema, show);
    region.appendChild($show);
  });
};

renderShows(shows, showSchema);
