
        const singlePostContainer = document.getElementById("singlePostContainer");
        const postUrl = 'http://localhost:5000/api/posts';
        const postUrlImage = 'http://localhost:5000/images';
    
        // Function to fetch post data
        const getPost = async () => {
            console.log("Fetching post...");
            const path = window.location.pathname.split("/")[2];
            
            try {
                const response = await fetch(`${postUrl}/${path}`);
                
                // Check if the response is successful and is of type JSON
                if (!response.ok || !response.headers.get('Content-Type')?.includes('application/json')) {
                    console.error('Error fetching post data:', response);
                    return;
                }
    
                const post = await response.json();
            
                // Populate HTML with post data
                const postHtml = `
                    <div class="singlePostWrapper">
                        ${post.photo ? `<img src='${postUrlImage}/${post.photo}' alt="" class="singlePostImg" />` : ''}
                        <h1 class="singlePostTitle">${post.title}</h1>
                        <div class="singlePostInfo">
                            <span class="singlePostAuthor">
                                Author: <a href="/?user=${post.username}" class="link"><b>${post.username}</b></a>
                            </span>
                            <p class="postCategories">${post.categories}</p>
                            <span class="singlePostDate">${new Date(post.createdAt).toDateString()}</span>
                        </div>
                        <p class="singlePostDesc">${post.desc}</p>
                    </div>
                `;
    
                singlePostContainer.innerHTML = postHtml;
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
    
        // Call the function to get post data
        getPost();
