

            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get('userId'); 

            let username;
            let email;
            let password;

            const setUsername = (value) => { username = value };
            const setEmail = (value) => { email = value };
            const setPassword = (value) => { password = value };

            const userUrl = 'http://localhost:5000/api/users';

            const handleSubmit = async (e) => {
                e.preventDefault();
            try {
                 const response = await fetch(`${userUrl}/${userId}`, {
                 method: "GET",
                 headers: {
                 "Content-Type": "application/json",
            },
        });

        // Assuming you have a function to handle the response in an external script
        handleSubmit(response);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

