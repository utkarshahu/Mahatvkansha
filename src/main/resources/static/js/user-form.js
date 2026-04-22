document.getElementById("userForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    

    const user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value,
        bio: document.getElementById("bio").value,
        releaseDate: document.getElementById("releaseDate").value
    };

    const imageFile = document.getElementById("imageFile").files[0];

    const formData = new FormData();

    formData.append(
        "user",
        new Blob([JSON.stringify(user)], { type: "application/json" })
    );

    if (imageFile) {
        formData.append("imageFile", imageFile);
    }

    try {
        const res = await fetch("http://localhost:8080/user/create", {
            method: "POST",
            body: formData
        });

        console.log("Status code:", res.status);

        if (!res.ok) {
            throw new Error("Server error");
        }

        const data = await res.json();
        console.log("Response:", data);

        
        alert("User created successfully!");

        document.getElementById("userForm").reset();

    } catch (err) {
        console.error(err);

        

        alert("Error creating user. Try again.");
    }
});

function cancelForm(){
    document.getElementById("userForm").reset();
    
}