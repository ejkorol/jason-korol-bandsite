//**********************************//
//          COMMENTS DATA           //
//**********************************//
let comments = [
  {
    userName: "Victor Pinto",
    comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    commentDate: Date.parse("2023-10-02"),
    uid: ""
  },
  {
    userName: "Christina Cabrera",
    comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    commentDate: Date.parse("2023-9-28"),
    uid: ""
  },
  {
    userName: "Isaac Tadesse",
    comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    commentDate: Date.parse("2023-9-20"),
    uid: ""
  }
];

//**********************************//
//          COMMENT SCHEMA          //
//**********************************//
const commentSchema = {
  type: "article",
  className: "comment",
  children: [
    {
      type: "div",
      className: "comment__image-wrapper",
      children: [
        {
          type: "img",
          className: "comment__image"
        }
      ]
    },
    {
      type: "div",
      className: "comment__content",
      children: [
        {
          type: "div",
          className: "comment__title",
          children: [
            {
              type: "h3",
              className: "comment__header",
              content: "userName"
            },
            {
              type: "p",
              className: "comment__text--date",
              content: "commentDate",
              uid: ""
            }
          ]
        },
        {
          type: "p",
          className: "comment__text",
          content: "comment"
        }
      ]
    }
  ]
};

//******************************************************//
//                GENERATE UID FOR DATES                //
//******************************************************//
function uid () {
  return Math.random().toString(16).slice(2)
};

//******************************************************//
//                   CREATE COMMENTS                    //
//******************************************************//
function createComponent(schema, data) {
  const component = document.createElement(schema.type);
  component.classList.add(schema.className);

  if (schema.content in data) {
    component.textContent = data[schema.content];
  } else {
    component.textContent = schema.content };

  if (schema.content === "commentDate") {
    const uuid = uid();
    data.uid = uuid;
    component.id = uuid;
    component.textContent = elapsedDuration(data.commentDate);
  }

  if (schema.children) {
    schema.children.forEach(child => {
      component.appendChild(createComponent(child, data));
    });
  };

  return component;
};

//******************************************************//
//                    RENDER COMMENTS                   //
//******************************************************//
function render(data, schema) {
  const region = document.getElementById("feed");
  data.forEach(entry => {
    region.appendChild(createComponent(schema, entry));
  });
};

render(comments, commentSchema);

//******************************************************//
//                     FORM LOGIC                       //
//******************************************************//

/* CREATE COMMENT */
function addComment(comment) {
  comments.unshift(comment);
  const component = createComponent(commentSchema, comment);
  const parent = document.getElementById("feed")
  return parent.insertBefore(component, parent.firstChild);
};

/* LISTEN TO FORM */
document.getElementById("comment-form").addEventListener('submit', e => {
  e.preventDefault();

  const comment = {
    userName: e.target.name.value,
    comment: e.target.comment.value,
    commentDate: Date.now()
  };

  addComment(comment);
  e.target.reset();
  buttonEl.disabled = true;
});

//******************************************************//
//                   FORM VALIDATION                    //
//******************************************************//
let inputEl = document.getElementById("name");
let commentEl = document.getElementById("comment");
let buttonEl = document.getElementById("form-button");

function validateForm(inputEl, commentEl, buttonEl) {
  return function () {
    const nameValue = inputEl.value.trim();
    const commentValue = commentEl.value.trim();
    
    if (nameValue === "" || commentValue === "") {
      inputEl.classList.add("form-error");
      commentEl.classList.add("form-error");
      buttonEl.disabled = true;
    } else {
      inputEl.classList.remove("form-error");
      commentEl.classList.remove("form-error");
      buttonEl.disabled = false;
    };
  };
};

inputEl.addEventListener("input", validateForm(inputEl, commentEl, buttonEl));
commentEl.addEventListener("input", validateForm(inputEl, commentEl, buttonEl));

//******************************************************//
//                  TIME STAMP LOGIC                    //
//******************************************************//

// UPDATE TIME ON THE MINUTE
setInterval(() => {
  updateCommentTime()
}, 60000);

// UPDATE TIME STAMPS
function updateCommentTime() {
  comments.forEach((comment) => {
    let commentTime = document.getElementById(comment.uid);
    commentTime.innerText = elapsedDuration(comment.commentDate);
  })
};

// GENERATE VERBOISE TIME
function elapsedDuration(time) {
  const dif = Date.now() - time;
  const seconds = Math.floor(dif / 1000);

  const timeUnits = [
    { unit: 'year', value: 31536000 },
    { unit: 'month', value: 2592000 },
    { unit: 'day', value: 86400 },
    { unit: 'hour', value: 3600 },
    { unit: 'minute', value: 60 }
  ];

  for (let { unit, value } of timeUnits) {
    const elapsed = Math.floor(seconds / value);
    if (elapsed >= 1) {
      const unitStr = elapsed === 1 ? unit : `${unit}s`;
      const message = `${elapsed} ${unitStr} ago`;
      return message;
    }
  }

  const message = 'Just now';
  return message;
};
