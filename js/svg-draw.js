document.addEventListener("DOMContentLoaded", () => {
    const svg = document.getElementById("logo_svg");
    const paths = svg.querySelectorAll("path");
    const duration = 2000; // cas za eno polno risbo v ms
    const stagger = 200;   // zamik med potmi v ms
    const fillDelay = duration + paths.length * stagger;

    // oblika poti
    paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.stroke = "#000000";
        path.style.fill = "none";
        path.style.strokeWidth = "1";
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.transition = `stroke-dashoffset ${duration}ms ease-out`;
    });

    function animateDraw() {
        // Narise poti
        paths.forEach((path, i) => {
            setTimeout(() => {
                path.style.strokeDashoffset = 0;
            }, i * stagger);
        });

        // napolni poti po risanju
        setTimeout(() => {
            paths.forEach(path => path.style.fill = "#000000");
        }, fillDelay);

        // resetira poti za ponovni zagon
        setTimeout(() => {
            paths.forEach(path => {
                path.style.transition = "none"; // odstrani tranzicijo za takojsno ponastavitev
                path.style.strokeDashoffset = path.getTotalLength();
                path.style.fill = "none";
            });

            // ponastavi tranzicijo za naslednji cikel
            setTimeout(() => {
                paths.forEach(path => {
                    path.style.transition = `stroke-dashoffset ${duration}ms ease-out`;
                });
            }, 50); // majhna zakasnitev
        }, fillDelay + 1000); // 1s pred ponovitvijo
    }

    // neskončna zanka
    setInterval(animateDraw, fillDelay + 1200); // vskladi casovne intervale
    animateDraw(); // takoj zacne
});
