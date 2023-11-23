const postUrl = "http://localhost:5000/api/posts";
const postImage = "http://localhost:5000/api/upload";

let title = "";
let desc = "";
let categories = "";
let file = null;

function setTitle(event) {
  title = event.target.value;
}

function setDesc(event) {
  desc = event.target.value;
}

function setCategories(event) {
  categories = event.target.value;
}

function setFile(event) {
  file = event.target.files[0];

  if (file) {
    const img = document.createElement("img");
    img.classList.add("writeImg");
    img.src = URL.createObjectURL(file);
    const write = document.querySelector(".write");
    write.insertBefore(img, write.firstChild);
  }
}

function handleSubmitWrite(event) {
  event.preventDefault();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const newPost = {
    username: userData.username,
    title,
    categories,
    desc,
  };

  if (file) {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name", filename);
    data.append("file", file);
    newPost.photo = filename;
    axios
      .post(`${postImage}`, data)
      .then(() => {})
      .catch((err) => {});
  }

  axios
    .post("http://localhost:5000/api/posts", newPost)
    .then((res) => {
      window.location.href = "/posts/" + res.data._id;
    })
    .catch((err) => {});
}
