function cancelForm(){
    document.getElementById("loginForm").reset();
    document.getElementById("status").innerText = "Form cleared";
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("status");

    status.className = "text-blue-600 text-center";
    status.innerText = "Logging in...";

    const loginData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    try {
        const res = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (!res.ok) throw new Error("Login failed");

        const data = await res.json();

        // save token
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        status.className = "text-green-600 text-center";
        status.innerText = "Login successful ";

        alert("Login successful");

        window.location.href = "index.html";

    } catch (err) {
        console.error(err);

        status.className = "text-red-600 text-center";
        status.innerText = "Login failed ";

        alert("Invalid email or password");
    }
});

// ============================================================
//  OPEN USER FORM
// ============================================================

function openUserForm(){
    console.log("Opening user form...");
    window.location.href = "user-form.html";
}
