document.addEventListener("DOMContentLoaded", () => {

    const userForm = document.getElementById("userForm");

    userForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const user = {
            username: document.getElementById("username").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value,
            role: document.getElementById("role").value,
            bio: document.getElementById("bio").value.trim(),
            releaseDate: document.getElementById("releaseDate").value
        };

        const imageFile = document.getElementById("imageFile").files[0];

        const formData = new FormData();

        formData.append(
            "user",
            new Blob(
                [JSON.stringify(user)],
                { type: "application/json" }
            )
        );

        if (imageFile) {
            formData.append("imageFile", imageFile);
        }

        try {

            const res = await fetch("/user/create", {
                method: "POST",
                body: formData
            });

            console.log("Status Code:", res.status);

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Server Error:", errorText);
                throw new Error(errorText || "User creation failed");
            }

            const data = await res.json();

            console.log("Response:", data);

            alert("User created successfully!");

            userForm.reset();

            // Redirect after successful registration
            window.location.href = "index.html";

        } catch (err) {

            console.error("Error:", err);

            alert(
                "Error creating user.\n\n" +
                (err.message || "Please try again.")
            );
        }
    });

});

function cancelForm() {
    document.getElementById("userForm").reset();
}