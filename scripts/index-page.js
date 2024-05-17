//**********************************//
//          COMMENTS DATA           //
//**********************************//
let comments = [
  {
    userName: "Victor Pinto",
    comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    commentDate: new Date(2023, 10, 2)
  },
  {
    userName: "Christina Cabrera",
    comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    commentDate: new Date(2023, 9, 28)
  },
  {
    userName: "Isaac Tadesse",
    comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    commentDate: new Date(2023, 9, 20)
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
              content: "commentDate"
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
//                   CREATE COMMENTS                    //
//******************************************************//
function createComponent(schema, data) {
  const component = document.createElement(schema.type);
  component.classList.add(schema.className);
  if (schema.content) {
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
    commentDate: new Date()
  };

  addComment(comment);
  e.target.reset();
});
