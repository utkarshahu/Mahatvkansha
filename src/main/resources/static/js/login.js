function cancelForm() {
    document.getElementById("loginForm").reset();
    document.getElementById("status").innerText = "Form cleared";
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("status");

    status.className = "text-blue-600 text-center";
    status.innerText = "Logging in...";

    const loginData = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value
    };

    try {

        // Same server deployment ke liye "/login"
        // Agar backend alag domain par hai to full URL use karo
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();

        console.log("Login Response:", data);

        // Token save karo
        if (data.token) {
            localStorage.setItem("token", data.token);
        }

        if (data.role) {
            localStorage.setItem("role", data.role);
        }

        status.className = "text-green-600 text-center";
        status.innerText = "Login successful";

        alert("Login successful");

        window.location.href = "index.html";

    } catch (err) {
        console.error("Login Error:", err);

        status.className = "text-red-600 text-center";
        status.innerText = "Login failed";

        alert("Invalid email or password");
    }
});

// ============================================================
// OPEN USER FORM
// ============================================================

function openUserForm() {
    console.log("Opening user form...");
    window.location.href = "user-form.html";
}