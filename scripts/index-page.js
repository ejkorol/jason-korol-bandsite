//**********************************//
//     QUICK SORT COMMENTS DATA     //
//**********************************//
function quickSort (comments) {

  if (comments.length <= 1) {
    return comments;
  };

  const pivot = comments[comments.length - 1].timestamp;
  let subArr1 = [];
  let subArr2 = [];

  for (let i = 0; i < comments.length - 1; i++) {
    if (comments[i].timestamp < pivot) {
      subArr1.push(comments[i]);
    } else {
      subArr2.push(comments[i]);
    };
  };

  return [...quickSort(subArr2), comments[comments.length - 1], ...quickSort(subArr1)];
};

//**********************************//
//       FETCH COMMENTS DATA        //
//**********************************//
async function fetchComments() {
  try {
    const comments = await bandsiteApi.getComments();
    let sortedComments = quickSort(comments);
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    render(sortedComments, commentSchema);
  } catch (e) {
    console.error(e);
  };
};

fetchComments();

//**********************************//
//          COMMENT SCHEMA          //
//**********************************//
const commentSchema = {
  type: "article",
  className: "comment",
  id: "id",
  children: [
    {
      type: "div",
      className: "comment__image-wrapper",
      children: [
        {
          type: "img",
          className: "comment__image",
          imageSrc: ""
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
              content: "name"
            },
            {
              type: "p",
              className: "comment__text--date",
              content: "timestamp"
            }
          ]
        },
        {
          type: "div",
          className: "comment__body",
          children: [
            {
              type: "p",
              className: "comment__text",
              content: "comment"
            }
          ],
        },
        {
          type: "div",
          className: "comment__bottom",
          children: [
            {
              type: "div",
              className: "comment_buttons",
              children: [
                {
                  type: "button",
                  className: "comment__button--like",
                  children: [
                    {
                       type: "img",
                       className: "comment__icon",
                       content: "like"
                     }
                  ]
                },
                {
                  type: "button",
                  className: "comment__button--delete",
                  children: [
                    {
                      type: "img",
                      className: "comment__icon",
                      content: "delete"
                    }
                  ]
                }
              ]
            },
            {
              type: "div",
              className: "comment__details",
              children: [
                {
                  type: "p",
                  className: "comment__total-likes",
                  content: "likes"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

//******************************************************//
//                   CREATE COMMENTS                    //
//******************************************************//
function createComponent(schema, data) {
  const component = document.createElement(schema.type);
  component.classList.add(schema.className);

  /* ASSIGN DATA */
  if (schema.content in data) {
    component.textContent = data[schema.content];
    if (schema.content === "likes") {
      component.textContent = `${data[schema.content]} ${data[schema.content] === 1 ? 'like' : 'likes'}`;
    }
  } else {
    component.textContent = schema.content
  };

  /* SET VERBOISE TIMESTAMP */
  if (schema.content === "timestamp") {
    component.id = data.id;
    component.textContent = elapsedDuration(data.timestamp);
  };

  /* ASSIGN PLACEHOLDER IMAGE CLASS */
  if (schema.imageSrc === "") {
    component.classList.add("comment__image--placeholder");
  }

  /* ADD LIKE ICON */
  if (schema.content === "like") {
    component.src = "./assets/icons/icon-like.svg";
    component.textContent = "";
  };

  /* ADD DELETE ICON */
  if (schema.content === "delete") {
    component.src = "./assets/icons/icon-delete.svg";
    component.textContent = "";
  };

  /* ADD EVENT LISTENERS */
  if (schema.type === "button") {
    if (schema.className === "comment__button--like") {
      component.id = data.id;
      component.addEventListener("click", () => {
        handleLike(component.id);
      });
    } else if (schema.className === "comment__button--delete") {
      component.id = data.id;
      component.addEventListener("click", () => {
        handleDelete(component.id);
      });
    };
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
//                    RENDER COMMENTS                   //
//******************************************************//
function render(data, schema) {
  const region = document.getElementById("feed");
  data.forEach(entry => {
    region.appendChild(createComponent(schema, entry));
  });
};

//******************************************************//
//                     FORM LOGIC                       //
//******************************************************//

/* POST COMMENT */
async function postComment(comment) {
  try {
    await bandsiteApi.postComment(comment);
    fetchComments();
  } catch (e) {
    console.error(e);
  };
};

/* LISTEN TO FORM */
document.getElementById("comment-form").addEventListener('submit', e => {
  e.preventDefault();

  const comment = {
    name: e.target.name.value,
    comment: e.target.comment.value
  };

  postComment(comment);
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

/* UPDATE TIME STAMPS */
async function updateCommentTime() {
  const comments = await bandsiteApi.getComments()
  comments.forEach((comment) => {
    let commentTime = document.getElementById(comment.id);
    if (commentTime.nodeName === "P") {
      commentTime.innerText = elapsedDuration(comment.timestamp);
    };
  });
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

  for (let i = 0; i < timeUnits.length; i++) {
    const unit = timeUnits[i].unit;
    const value = timeUnits[i].value;
    const elapsed = Math.floor(seconds / value);

    if (elapsed >= 1) {
      let unitStr = unit;
      if (elapsed > 1) {
        unitStr = unit + 's';
      };
      return elapsed + ' ' + unitStr + ' ago';
    };
  };

  return 'Just now';
};

//******************************************************//
//                 COMMENT STATE LOGIC                  //
//******************************************************//

/* LIKE A COMMENT */
async function handleLike (id) {
  try {
    await bandsiteApi.likeComment(id);
    await fetchComments();
  } catch (e) {
    console.error(e);
  };
};

/* DELETE A COMMENT */
async function handleDelete (id) {
  try {
    await bandsiteApi.deleteComment(id);
    await fetchComments();
  } catch (e) {
    console.error(e);
  };
};
