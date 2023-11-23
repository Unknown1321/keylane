const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    postId: params.get("post"),
  };
};

const getPostData = async () => {
  const params = getParams();
  try {
    const response = await axios.get(
      `http://localhost:5000/api/posts/${params.postId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching post data:", error);
    return null;
  }
};

const populateForm = (post) => {
  const titleInput = document.querySelector(".writeInput");
  const categoriesInput = document.querySelector(".writeCategories");
  const descInput = document.querySelector(".writeText");

  titleInput.value = post.title;
  categoriesInput.value = post.categories;
  descInput.value = post.desc;
};

const updatePost = async (event) => {
  event.preventDefault();

  const titleInput = document.querySelector(".writeInput");
  const categoriesInput = document.querySelector(".writeCategories");
  const descInput = document.querySelector(".writeText");

  const post = {
    title: titleInput.value,
    categories: categoriesInput.value,
    desc: descInput.value,
  };

  const params = getParams();

  try {
    const response = await axios.put(
      `http://localhost:5000/api/posts/${params.postId}`,
      post
    );

    if (response.status === 200) {
      alert("Post updated successfully");
      window.location.href = `/posts/${params.postId}`;
    } else {
      console.error("Error updating post:", response);
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

const init = async () => {
  const post = await getPostData();
  if (post) {
    populateForm(post);
  }
};

init();
