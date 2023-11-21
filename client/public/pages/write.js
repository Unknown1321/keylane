
        const postUrl = 'http://localhost:5000/api/posts';
        const postImage = 'http://localhost:5000/api/upload';

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

            // Display the selected image
            if (file) {
                const img = document.createElement("img");
                img.classList.add("writeImg");
                img.src = URL.createObjectURL(file);
                const write = document.querySelector(".write");
                write.insertBefore(img, write.firstChild);
            }
        }

        function handleSubmit(event) {
            event.preventDefault();
            const newPost = {
                username: "Youssef", // Add your username retrieval logic here
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

                // You can replace the following with your actual axios logic
                // Assuming you have the necessary axios logic
                axios.post(`${postImage}`, data)
                     .then(() => {
                         // Do something after successful upload
                     })
                     .catch((err) => {
                         // Handle upload error
                     });
            }
            
            // You can replace the following with your actual axios logic
            // Assuming you have the necessary axios logic
             axios.post("http://localhost:5000/api/posts", newPost)
             .then((res) => {
                     window.location.href = "/posts/" + res.data._id;
                 })
                 .catch((err) => {
                     // Handle post creation error
                 });
                 
        }
