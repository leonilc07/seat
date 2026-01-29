document.addEventListener("DOMContentLoaded", () => {
    const svg = document.getElementById("logo_svg");
    const paths = svg.querySelectorAll("path");
    const duration = 2000; // time for one full draw in ms
    const stagger = 200;   // stagger between paths in ms
    const fillDelay = duration + paths.length * stagger;

    // Initialize paths
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
        // Draw paths
        paths.forEach((path, i) => {
            setTimeout(() => {
                path.style.strokeDashoffset = 0;
            }, i * stagger);
        });

        // Fill paths after draw
        setTimeout(() => {
            paths.forEach(path => path.style.fill = "#000000");
        }, fillDelay);

        // Reset paths after a pause to loop
        setTimeout(() => {
            paths.forEach(path => {
                path.style.transition = "none"; // remove transition for instant reset
                path.style.strokeDashoffset = path.getTotalLength();
                path.style.fill = "none";
            });

            // Reapply transition before next draw
            setTimeout(() => {
                paths.forEach(path => {
                    path.style.transition = `stroke-dashoffset ${duration}ms ease-out`;
                });
            }, 50); // tiny delay
        }, fillDelay + 1000); // pause 1s before restarting
    }

    // Loop forever
    setInterval(animateDraw, fillDelay + 1200); // matches reset + pause
    animateDraw(); // start immediately
});
