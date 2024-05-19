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
//           PAGE SCEHMA            //
//**********************************//
const pageSchema = {
  type: "section",
  className: "shows",
  children: [
    {
      type: "div",
      className: "shows__left",
      children: [
        {
          type: "h2",
          className: "shows__header",
          content: "shows"
        }
      ]
    },
    {
      /* ROOT OF SHOWS */
      type: "div",
      className: "shows__right",
      id: "shows",
      children: [
        /* SHOWS NAV */
        {
          type: "div",
          className: "shows__nav",
          children: [
            {
              type: "div",
              className: "shows__item",
              children: [
                {
                  type: "p",
                  className: "shows__text",
                  content: "date"
                }
              ]
            },
            {
              type: "div",
              className: "shows__item",
              children: [
                {
                  type: "p",
                  className: "shows__text",
                  content: "venue"
                }
              ]
            },
            {
              type: "div",
              className: "shows__item",
              children: [
                {
                  type: "p",
                  className: "shows__text",
                  content: "location"
                }
              ]
            },
            {
              type: "div",
              className: "shows__item"
            }
          ]
        }
      ]
    }
  ]
}

//**********************************//
//           SHOW SCEHMA            //
//**********************************//
const showSchema = {
  type: "article",
  className: "show",
  children: [
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
//                 CREATE PAGE LAYOUT                   //
//******************************************************//
function createLayout(schema) {
  const layout = document.createElement(schema.type);
  layout.classList.add(schema.className);

  if (schema.id) layout.id = schema.id;
  if (schema.content) layout.innerText = schema.content;
  if (schema.children) {
    schema.children.forEach(child => {
      layout.appendChild(createLayout(child));
    })
  };

  return layout;
};

//******************************************************//
//                 RENDER PAGE LAYOUT                   //
//******************************************************//
function renderLayout(schema) {
  const region = document.getElementById("hero-shows");
  const page = createLayout(schema);
  region.insertAdjacentElement("afterend", page);
};

renderLayout(pageSchema);

//******************************************************//
//                    CREATE SHOWS                      //
//******************************************************//
function createComponent(schema, data) {
  const component = document.createElement(schema.type);
  component.classList.add(schema.className);
  if (schema.content in data) {
    component.textContent = data[schema.content];
  } else {
    component.textContent = schema.content;
  };

  if (schema.children) {
    schema.children.forEach(child => {
      component.appendChild(createComponent(child, data));
    });
  };

  return component;
};

//******************************************************//
//                    RENDER SHOWS                      //
//******************************************************//
function render(data, schema) {
  const region = document.getElementById("shows");
  data.forEach(entry => {
    region.appendChild(createComponent(schema, entry));
  });
};

render(shows, showSchema);

//******************************************************//
//                     SHOW STATES                      //
//******************************************************//
function selectShow(e) {
  const show = e.currentTarget.closest(".show");
  const selectedShow = document.querySelector(".show--selected");
  
  if (show === selectedShow) {
    show.classList.remove("show--selected");
    return;
  };

  if (selectedShow) {
    selectedShow.classList.remove("show--selected");
  };

  show.classList.add("show--selected");
}

const showComponents = document.querySelectorAll(".show");
showComponents.forEach((show) => {
  show.addEventListener("click", selectShow);
});
