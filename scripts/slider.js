const tabsBox = document.querySelector(".tabs-box"),
allTabs = tabsBox.querySelectorAll(".tab"),
arrowIcons = document.querySelectorAll(".icon i");

let isDragging = false;

const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
}

const smoothScroll = (direction) => {
    const scrollStep = direction === "left" ? -10 : 10;
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
        tabsBox.scrollLeft += scrollStep;
        scrollAmount += Math.abs(scrollStep);

        if (scrollAmount >= 250) {
            clearInterval(slideTimer);
            handleIcons(tabsBox.scrollLeft);
        }
    }, 10);
};

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        smoothScroll(icon.id);
    });
});

allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabsBox.querySelector(".active").classList.remove("active");
        tab.classList.add("active");
    });
});

const dragging = (e) => {
    if (!isDragging) return;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX;
    handleIcons(tabsBox.scrollLeft);
};

const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
};

tabsBox.addEventListener("mousedown", () => isDragging = true);
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

