
    

        let username = "";
        let email = "";
        let password = "";

        function setUsername(value) {
            username = value;
        }

        function setEmail(value) {
            email = value;
        }

        function setPassword(value) {
            password = value;
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            const errorSpan = document.getElementById("error");
            errorSpan.textContent = "";

             
             const res = await axios.post("http://localhost:5000/api/auth/register", {
               username,
               email,
               password,
             });
 
        
            const success = true;
            if (success) {
                window.location.href = "/login";
            } else {
                errorSpan.textContent = "Something went wrong!";
            }
        }
