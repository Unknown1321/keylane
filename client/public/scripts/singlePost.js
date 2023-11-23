const singlePostContainer = document.getElementById("singlePostContainer");
const postUrl = "http://localhost:5000/api/posts";
const postUrlImage = "http://localhost:5000/images";

const getPost = async () => {
  const path = window.location.pathname.split("/")[2];

  try {
    const response = await fetch(`${postUrl}/${path}`);

    if (
      !response.ok ||
      !response.headers.get("Content-Type")?.includes("application/json")
    ) {
      console.error("Error fetching post data:", response);
      return;
    }

    const post = await response.json();

    const getLoggedInUser = () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      return userData;
    };

    const getLoggedInUsername = () => {
      const loggedInUser = getLoggedInUser();
      return loggedInUser ? loggedInUser.username : null;
    };

    const isAuthor = post.username === getLoggedInUsername();

    const postHtml = `
      <div class="singlePostWrapper">
          ${
            post.photo
              ? `<img src='${postUrlImage}/${post.photo}' alt="" class="singlePostImg" />`
              : ""
          }
          <h1 class="singlePostTitle">${post.title}</h1>
          <div class="singlePostInfo">
              <span class="singlePostAuthor">
                  Author: <a href="/?user=${
                    post.username
                  }" class="link" onclick="redirectToAuthorPage('${
      post.username
    }')"><b>${post.username}</b></a>
              </span>
              <p class="postCategories">${post.categories}</p>
              <span class="singlePostDate">${new Date(
                post.createdAt
              ).toDateString()}</span>
              ${isAuthor ? renderEditButtons(post._id, post) : ""}
          </div>
          <p class="singlePostDesc">${post.desc}</p>
      </div>
    `;

    singlePostContainer.innerHTML = postHtml;
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
};

const renderEditButtons = (postId, post) => {
  return `
    <div class="singlePostButton">
        <button onclick="redirectToEditPage('${postId}')">Edit</button>
        <button onclick="deletePost('${postId}', '${post.username}')">Delete</button>
    </div>
  `;
};

const redirectToAuthorPage = (username) => {
  window.location.href = `/?user=${username}`;
};

const redirectToEditPage = (postId) => {
  window.location.href = `/write?post=${postId}`;
};

const deletePost = async (postId, username) => {
  const confirmation = confirm("Are you sure you want to delete this post?");

  if (confirmation) {
    try {
      const response = await fetch(
        `${postUrl}/${postId}?username=${username}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Post deleted successfully");
        window.location.href = "/";
      } else {
        console.error("Error deleting post:", response);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }
};

getPost();
