// ============================================================
//  MAIN SITE SCRIPTS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // 1. Language Toggle
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = 'en';
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'hi' : 'en';
            document.querySelectorAll('[data-en][data-hi]').forEach(el => {
                el.textContent = el.getAttribute(`data-${newLang}`);
            });
            langBtn.textContent = newLang === 'hi' ? 'Read in English' : 'हिंदी में पढ़ें';
            currentLang = newLang;
        });
    }

    // 2. Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
    }

    // 3. Ticker pause on hover
    const tickerContent = document.querySelector('.ticker-content');
    const tickerScroll = document.querySelector('.ticker-scroll');
    if (tickerContent && tickerScroll) {
        tickerContent.addEventListener('mouseenter', () => tickerScroll.style.animationPlayState = 'paused');
        tickerContent.addEventListener('mouseleave', () => tickerScroll.style.animationPlayState = 'running');
    }

    // 4. Real-time clock
    const timeDisplay = document.getElementById('real-time');
    if (timeDisplay) {
        const updateTime = () => {
            timeDisplay.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
        };
        updateTime();
        setInterval(updateTime, 1000);
    }

    // 5. Auth toggle
    const btnSignIn = document.getElementById('auth-signin');
    const btnLogOut = document.getElementById('auth-logout');
    if (btnSignIn && btnLogOut) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const updateAuthUI = (loggedIn) => {
            btnSignIn.style.display = loggedIn ? 'none' : 'inline-block';
            btnLogOut.style.display = loggedIn ? 'inline-block' : 'none';
        };
        updateAuthUI(isLoggedIn);
        btnSignIn.addEventListener('click', () => { localStorage.setItem('isLoggedIn', 'true'); updateAuthUI(true); });
        btnLogOut.addEventListener('click', () => { localStorage.setItem('isLoggedIn', 'false'); updateAuthUI(false); });
    }

    // ============================================================
    //  ADMIN MODAL OPEN / CLOSE
    // ============================================================
    const adminOverlay = document.getElementById('adminOverlay');
    const openAdminBtn = document.getElementById('openAdminBtn');
    const closeAdminBtn = document.getElementById('closeAdminBtn');

    openAdminBtn.addEventListener('click', () => {
        adminOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    closeAdminBtn.addEventListener('click', () => {
        adminOverlay.classList.remove('open');
        document.body.style.overflow = '';
    });

    // Close on overlay click (outside modal)
    adminOverlay.addEventListener('click', (e) => {
        if (e.target === adminOverlay) {
            adminOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && adminOverlay.classList.contains('open')) {
            adminOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ============================================================
    //  LIVE PREVIEW SYNC
    // ============================================================
    const $ = (id) => document.getElementById(id);

    $('headline').oninput      = () => $('pHeadline').innerText = $('headline').value || 'Your headline will appear here...';
    $('subHeadline').oninput   = () => $('pSub').innerText = $('subHeadline').value;
    $('shortDescription').oninput = () => $('pDesc').innerText = $('shortDescription').value || 'Short description preview...';

    $('content').oninput = () => {
        $('pContent').innerHTML = $('content').value.replace(/\n/g, '<br>');
    };

    $('category').onchange = () => {
        const text = $('category').options[$('category').selectedIndex].text;
        $('pCategory').innerText = text.replace(/[^\w\s]/g, '').trim().toUpperCase() || 'CATEGORY';
    };

    $('tags').oninput = () => {
        const arr = $('tags').value.split(',').map(t => t.trim()).filter(Boolean);
        $('pTags').innerHTML = arr.map(t => `<span>${t}</span>`).join('');
    };

    const updateLoc = () => {
        const city = $('city').value.trim();
        const state = $('stateCountry').value.trim();
        const loc = [city, state].filter(Boolean).join(', ');
        $('pLocation').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${loc || 'Location'}`;
    };
    $('city').oninput = updateLoc;
    $('stateCountry').oninput = updateLoc;

    $('imageFile').onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            $('pImage').src = ev.target.result;
            $('pImage').style.display = 'block';
        };
        reader.readAsDataURL(file);
    };

    // ============================================================
    //  FORM SUBMIT → POST to http://localhost:8080/article/create
    // ============================================================
    const articleForm = document.getElementById('articleForm');
    const statusBanner = document.getElementById('statusBanner');
    const publishBtn = document.getElementById('publishBtn');

    const showStatus = (type, msg) => {
        statusBanner.className = `status-banner ${type}`;
        statusBanner.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-xmark'}"></i> ${msg}`;
        setTimeout(() => { statusBanner.className = 'status-banner'; }, 5000);
    };

    articleForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        publishBtn.disabled = true;
        publishBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Publishing...';

        const tagsArr = $('tags').value.split(',').map(t => t.trim()).filter(Boolean);
        const keywordArr = Array.from($('keyword').selectedOptions).map(opt => opt.value);

        const article = {
            headline:          $('headline').value,
            subHeadline:       $('subHeadline').value,
            shortDescription:  $('shortDescription').value,
            content:           $('content').value,
            category:          $('category').value,
            keyword:           keywordArr,
            city:              $('city').value,
            stateCountry:      $('stateCountry').value,
            metaTitle:         $('metaTitle').value,
            metaDescription:   $('metaDescription').value,
            slug:              $('slug').value,
            videoUrl:          $('videoUrl').value,
            imageCaption:      $('imageCaption').value,
            tags:              tagsArr,
            enableComments:    $('enableComments').checked,
            allowSocialSharing: $('allowSocialSharing').checked,
            showReadTime:      $('showReadTime').checked,
            highlighted:       false,
            priorityLevel:     1
        };

        const formData = new FormData();
        formData.append('article', new Blob([JSON.stringify(article)], { type: 'application/json' }));

        const file = $('imageFile').files[0];
        if (file) formData.append('image', file);

        try {
            const res = await fetch('http://localhost:8080/article/create', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error(`Server responded with ${res.status}`);

            articleForm.reset();
            $('pImage').style.display = 'none';
            $('pHeadline').innerText = 'Your headline will appear here...';
            $('pSub').innerText = '';
            $('pDesc').innerText = 'Short description preview...';
            $('pContent').innerHTML = '';
            $('pTags').innerHTML = '';
            $('pCategory').innerText = 'CATEGORY';
            $('pLocation').innerHTML = '<i class="fa-solid fa-location-dot"></i> Location';

            showStatus('success', 'Article published successfully!');
        } catch (err) {
            console.error(err);
            showStatus('error', `Failed to publish: ${err.message}`);
        } finally {
            publishBtn.disabled = false;
            publishBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Publish Article';
        }
    });

    // Save as Draft (console log for now)
    document.getElementById('saveDraftBtn').addEventListener('click', () => {
        console.log('Draft saved:', { headline: $('headline').value });
        showStatus('success', 'Draft saved (check console).');
    });



    //fetch data
    fetchArticles();


});

function getTimeAgo() {
    return "5 min ago"; // simple for now
}

function fetchArticles() {
    fetch('http://localhost:8080/article/all')
        .then(res => res.json())
        .then(articles => {
            console.log(articles);

            displayCenterArticles(articles);        // center featured
            displaySidebarArticles(articles);   // left sidebar
            displayTrendingArticles(articles);
        })
        .catch(err => console.error(err));
}
function displayTrendingArticles(articles) {

    const container = document.getElementById("trending-list");
    container.innerHTML = "";

    // 👉 Pick top 3 (you can customize logic)
    const trending = articles
        .sort((a, b) => b.priorityLevel - a.priorityLevel)
        .slice(0, 3);

    trending.forEach(article => {

        let fixedPath = article.imageFilePath
            ? article.imageFilePath.replace(/\\/g, "/").trim()
            : "";

        let imageUrl = fixedPath
            ? `http://localhost:8080/${fixedPath}`
            : "assets/images/default.png"; // fallback

        const card = document.createElement("article");
        card.classList.add("news-card");

        card.innerHTML = `
            <img src="${imageUrl}" class="card-img">

            <div class="card-content">
                <span class="category-badge maroon-bg">
                    ${article.category}
                </span>

                <h3 class="card-title">
                    ${article.headline.substring(0, 50)}...
                </h3>

                <p class="card-excerpt">
                    ${article.shortDescription || ""}
                </p>
            </div>
        `;

        // 👉 Click → open full article
        card.onclick = () => {
            window.location.href = `/article.html?id=${article.id}`;
        };

        container.appendChild(card);
    });
}

function displayCenterArticles(articles) {
    const container = document.getElementById("center-articles");
    container.innerHTML = "";

    articles.forEach(article => {

        const imageUrl = article.imageFilePath
            ? `http://localhost:8080/${article.imageFilePath.replace(/\\/g, "/")}`
            : "assets/images/default.png";

        const tags = (article.tags || [])
            .map(t => `<span class="tag">${t}</span>`)
            .join(" ");

        const el = document.createElement("article");
        el.classList.add("featured-article");

        el.innerHTML = `
            <h1 class="mega-title">${article.headline}</h1>
            <h2 class="sub-title">${article.subHeadline || ""}</h2>

            <div class="featured-image-container">
                <img src="${imageUrl}" class="featured-image">
                <div class="image-caption">${article.imageCaption || ""}</div>
            </div>

            <div class="article-snippet">
                <span class="live-badge">LIVE</span>
                <p class="snippet-text">${article.shortDescription || ""}</p>
            </div>

            <div class="tags">${tags}</div>

            <div class="action-buttons">
                <button class="btn btn-primary" onclick="openArticle(${article.id})">
                    FULL STORY
                </button>

                <button class="btn btn-outline">
                    SHARE
                </button>
            </div>
        `;

        container.appendChild(el);
    });
}



function displaySidebarArticles(articles) {

    const container = document.getElementById("article-list");
    container.innerHTML = ""; // clear static data

    articles.forEach(article => {

        const item = document.createElement("article");
        item.classList.add("list-item");

        item.innerHTML = `
            <div class="item-meta">
                <span class="category">${article.category}</span>
                <span class="time">Just now</span>
            </div>

            <h3 class="item-title">
                ${article.headline.substring(0, 50)}...
            </h3>

            ${
            article.shortDescription
                ? `<p class="item-excerpt">${article.shortDescription}</p>`
                : ""
        }
        `;

        container.appendChild(item);
    });
}


