// Function to get parameters from the URL
const getParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      postId: params.get("post"),
    };
  };
  
  // Function to get the post data
  const getPostData = async () => {
    const params = getParams();
    try {
      // Fetch post data based on the postId
      const response = await axios.get(`http://localhost:5000/api/posts/${params.postId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching post data:", error);
      return null;
    }
  };
  
  // Function to populate the form with existing post data
  const populateForm = (post) => {
    // Get form elements
    const titleInput = document.querySelector('.writeInput');
    const categoriesInput = document.querySelector('.writeCategories');
    const descInput = document.querySelector('.writeText');
  
    // Populate form fields with existing post data
    titleInput.value = post.title;
    categoriesInput.value = post.categories;
    descInput.value = post.desc;
  };
  
  // Function to handle form submission and update the post
  const updatePost = async (event) => {
    event.preventDefault();
  
    // Get form elements
    const titleInput = document.querySelector('.writeInput');
    const categoriesInput = document.querySelector('.writeCategories');
    const descInput = document.querySelector('.writeText');
  
    // Get post data
    const post = {
      title: titleInput.value,
      categories: categoriesInput.value,
      desc: descInput.value,
    };
  
    const params = getParams();
  
    try {
      const response = await axios.put(`http://localhost:5000/api/posts/${params.postId}`, post);
  
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
  
  // Call the init function when the script is loaded
  init();
  