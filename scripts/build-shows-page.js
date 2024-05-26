//**********************************//
//      QUICK SORT SHOWS DATA       //
//**********************************//
function quickSort (shows) {

  if (shows.length <= 1) {
    return shows;
  };

  const pivot = shows[shows.length - 1].date;
  let subArr1 = [];
  let subArr2 = [];

  for (let i = 0; i < shows.length - 1; i++) {
    if (shows[i].date < pivot) {
      subArr1.push(shows[i]);
    } else {
      subArr2.push(shows[i]);
    };
  };

  return [...quickSort(subArr1), shows[shows.length - 1], ...quickSort(subArr2)];
};

//**********************************//
//          FETCH SHOW DATA         //
//**********************************//
async function fetchShows() {
  try {
    const shows = await bandsiteApi.getShows();
    let sortedShows = quickSort(shows);
    render(sortedShows, showSchema);
  } catch (e) {
    console.error(e);
  };
};

fetchShows();

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
      type: "div",
      className: "shows__right",
      id: "shows",
      children: [
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
          content: "date"
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
          content: "place"
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
          content: "location"
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

  /* ASSIGN DATA */
  if (schema.content in data) {
    component.textContent = data[schema.content];
  } else {
    component.textContent = schema.content;
  };

  /* FORMAT DATES */
  if (schema.content === "date") {
    component.textContent = formatDate(data.date);
  };

  /* ADD EVENT LISTENERS */
  if (schema.type === "article") {
    component.addEventListener("click", selectShow);
  };

  /* CREATE CHILDREN */
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
};

//******************************************************//
//                   DATE FORMAT LOGIC                  //
//******************************************************//
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weekDay = days[date.getDay()];
  const day = date.getDay();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const formattedDateString = `${weekDay} ${month} ${day} ${year}`;

  return formattedDateString;
};
