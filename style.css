/* Variables & Reset */
:root {
    --bg-color: #050505;
    --primary: #5865F2; /* Discord Blurple ish */
    --accent: #00ffc8;
    --glass: rgba(255, 255, 255, 0.05);
    --border: rgba(255, 255, 255, 0.1);
    --text-main: #ffffff;
    --text-sec: #b3b3b3;
    --font-heading: 'Space Grotesk', sans-serif;
    --font-body: 'Outfit', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    background-color: var(--bg-color);
    color: var(--text-main);
    font-family: var(--font-body);
    overflow-x: hidden;
}

/* Background Canvas */
#bg-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

/* Loading Screen */
#loader {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #000;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: opacity 0.5s ease;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: var(--primary);
    animation: spin 1s ease-in-out infinite;
    margin-bottom: 20px;
}

.loader-text {
    font-family: var(--font-heading);
    letter-spacing: 2px;
    animation: blink 1.5s infinite;
}

/* Navigation */
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 5%;
    background: rgba(5, 5, 5, 0.8);
    backdrop-filter: blur(10px);
    position: fixed;
    width: 100%;
    z-index: 100;
    border-bottom: 1px solid var(--border);
}

.logo {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    text-transform: uppercase;
    letter-spacing: 2px;
}

.nav-links {
    display: flex;
    list-style: none;
}

.nav-links li a {
    color: var(--text-main);
    text-decoration: none;
    margin-left: 30px;
    font-weight: 500;
    transition: color 0.3s;
}

.nav-links li a:hover {
    color: var(--primary);
}

/* Hero Section */
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 20px;
}

.hero h1 {
    font-family: var(--font-heading);
    font-size: 5rem;
    line-height: 1;
    margin-bottom: 10px;
    text-shadow: 0 0 20px rgba(88, 101, 242, 0.5);
}

.hero h3 {
    font-size: 1.5rem;
    color: var(--accent);
    margin-bottom: 20px;
    font-family: 'Courier New', monospace;
}

.hero p {
    color: var(--text-sec);
    max-width: 600px;
    margin: 0 auto 30px auto;
    font-size: 1.1rem;
}

.cta-btn {
    padding: 12px 30px;
    background: var(--primary);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: transform 0.2s, box-shadow 0.2s;
}

.cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px var(--primary);
}

/* Services */
.section-pad {
    padding: 100px 10%;
}

.section-title {
    font-family: var(--font-heading);
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 60px;
    position: relative;
}

.section-title::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: var(--accent);
    margin: 10px auto;
    border-radius: 2px;
}

.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
}

.card {
    background: var(--glass);
    border: 1px solid var(--border);
    padding: 40px;
    border-radius: 15px;
    text-align: center;
    transition: transform 0.3s, border-color 0.3s;
    backdrop-filter: blur(5px);
}

.card:hover {
    transform: translateY(-10px);
    border-color: var(--primary);
}

.card .icon {
    font-size: 3rem;
    margin-bottom: 20px;
}

.card h3 {
    margin-bottom: 15px;
    font-family: var(--font-heading);
}

.card p {
    color: var(--text-sec);
    margin-bottom: 20px;
    font-size: 0.9rem;
}

.card .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--accent);
    margin-bottom: 20px;
}

.order-btn {
    padding: 10px 25px;
    background: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

.order-btn:hover {
    background: var(--primary);
    color: white;
}

/* Projects Grid */
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
}

.project-item {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    height: 300px;
    border: 1px solid var(--border);
}

.project-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
}

.project-item:hover img {
    transform: scale(1.1);
}

.project-item .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s;
}

.project-item:hover .overlay {
    opacity: 1;
}

/* Reviews */
.review-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.review-card {
    background: var(--glass);
    padding: 30px;
    border-radius: 10px;
    border-left: 4px solid var(--accent);
}

.stars {
    margin-bottom: 15px;
    font-size: 0.9rem;
}

.review-card p {
    font-style: italic;
    color: var(--text-sec);
    margin-bottom: 15px;
}

.review-card .user {
    font-weight: bold;
    color: var(--primary);
}

/* Footer */
footer {
    padding: 40px;
    text-align: center;
    border-top: 1px solid var(--border);
    background: #000;
}

.socials {
    margin-top: 20px;
}

.socials a {
    color: var(--text-sec);
    margin: 0 10px;
    text-decoration: none;
    transition: color 0.3s;
}

.socials a:hover {
    color: var(--accent);
}

/* Animations */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .nav-links {
        display: none; /* Add JS toggle for real hamburger menu */
    }
    .hero h1 { font-size: 3rem; }
}
