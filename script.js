* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', sans-serif;
}

body {
    background: #0f0f0f;
    color: white;
    line-height: 1.6;
}

header {
    background: #111;
    position: fixed;
    width: 100%;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 10%;
}

.logo span {
    color: #00bfff;
}

.nav-links {
    display: flex;
    list-style: none;
}

.nav-links li {
    margin-left: 20px;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: 0.3s;
}

.nav-links a:hover {
    color: #00bfff;
}

.menu-toggle {
    display: none;
    font-size: 24px;
    cursor: pointer;
}

.hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(135deg, #1a1a1a, #0d0d0d);
}

.hero h1 span {
    color: #00bfff;
}

.btn {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 25px;
    background: #00bfff;
    color: black;
    border-radius: 5px;
    text-decoration: none;
    transition: 0.3s;
}

.btn:hover {
    background: white;
}

section {
    padding: 80px 10%;
}

.projects {
    background: #141414;
}

.project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.project-card {
    background: #1f1f1f;
    padding: 20px;
    border-radius: 10px;
    transition: 0.3s;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-card button {
    margin-top: 10px;
    padding: 8px 15px;
    border: none;
    background: #00bfff;
    cursor: pointer;
    border-radius: 5px;
}

.contact form {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
}

.contact input,
.contact textarea {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: none;
}

.contact button {
    padding: 10px;
    border: none;
    background: #00bfff;
    cursor: pointer;
    border-radius: 5px;
}

footer {
    text-align: center;
    padding: 20px;
    background: #111;
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
        flex-direction: column;
        background: #111;
        position: absolute;
        top: 60px;
        right: 10%;
        width: 200px;
    }

    .nav-links.active {
        display: flex;
    }

    .menu-toggle {
        display: block;
    }
}
