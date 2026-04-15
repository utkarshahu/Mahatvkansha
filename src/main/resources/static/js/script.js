const $ = (id) => document.getElementById(id);

/* ================= LIVE PREVIEW ================= */

headline.oninput = () => pHeadline.innerText = headline.value;
subHeadline.oninput = () => pSub.innerText = subHeadline.value;
shortDescription.oninput = () => pDesc.innerText = shortDescription.value;

content.oninput = () =>
    pContent.innerHTML = content.value.replace(/\n/g, "<br>");

category.onchange = () =>
    pCategory.innerText = category.value;

tags.oninput = () => {
    const arr = tags.value.split(",").map(t => t.trim()).filter(Boolean);
    pTags.innerHTML = arr.map(t => `<span>${t}</span>`).join("");
};

city.oninput = updateLoc;
stateCountry.oninput = updateLoc;

function updateLoc() {
    pLocation.innerText = `📍 ${city.value}, ${stateCountry.value}`;
}

/* ================= IMAGE PREVIEW ================= */

imageFile.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
        pImage.src = ev.target.result;
        pImage.style.display = "block";
    };
    reader.readAsDataURL(file);

};

/* ================= FORM SUBMIT ================= */
const form = document.getElementById("articleForm")
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const tagsArr = tags.value
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);

    const keywordArr = Array.from(keyword.selectedOptions)
        .map(opt => opt.value);

    const article = {
        headline: headline.value,
        subHeadline: subHeadline.value,
        shortDescription: shortDescription.value,
        content: content.value,
        category: category.value,
        keyword: keywordArr,
        city: city.value,
        stateCountry: stateCountry.value,
        metaTitle: metaTitle.value,
        metaDescription: metaDescription.value,
        slug: slug.value,
        videoUrl: videoUrl.value,
        imageCaption: imageCaption.value,
        tags: tagsArr,
        enableComments: enableComments.checked,
        allowSocialSharing: allowSocialSharing.checked,
        showReadTime: showReadTime.checked,
        highlighted: false,
        priorityLevel: 1
    };

    const formData = new FormData();

    formData.append(
        "article",
        new Blob([JSON.stringify(article)], { type: "application/json" })
    );

    const file = imageFile.files[0];
    if (file) formData.append("image", file);

    try {
        const res = await fetch("http://localhost:8080/article/create", {
            method: "POST",
            body: formData
        });

        if (!res.ok) throw new Error("Failed");

        form.reset()
        alert("Article Published Successfully");


    } catch (err) {
        alert("❌ Error publishing article");
        console.log(err);
    }
});
