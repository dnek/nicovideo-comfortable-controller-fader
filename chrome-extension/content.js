const GM_addStyle = (content) => {
    const styleEl = document.createElement('style');
    styleEl.textContent = content;
    document.body.appendChild(styleEl);
    return styleEl;
};


// main
(async () => {
    'use strict';

    GM_addStyle(`
div[data-styling-id=":r3:"] {
    > div[data-styling-id=":r4:"] {
        opacity: 0;
        pointer-events: none;
        &:hover {
            opacity: 1;
            pointer-events: auto;
        }
    }
}
`);

    const mouseMovingStyleEl = GM_addStyle(`
div[data-styling-id=":r3:"] {
    > div[data-styling-id=":r4:"] {
        opacity: 1;
        pointer-events: auto;
    }
}
`);
    mouseMovingStyleEl.disabled = true;

    let timeoutID;

    const initFader = () => {
        const controllerEl = document.querySelector('div[data-styling-id=":r3:"] > div[data-styling-id=":r4:"]');
        if (controllerEl === null) {
            return;
        }

        controllerEl.setAttribute('nccf-controller', '');

        const enableMouseMovingStyle = () => {
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                mouseMovingStyleEl.disabled = true;
            }, 2000);
            mouseMovingStyleEl.disabled = false;
        };

        enableMouseMovingStyle();

        const playerEl = controllerEl.parentElement;

        playerEl.addEventListener('mousemove', enableMouseMovingStyle);

        playerEl.addEventListener('mouseleave', () => {
            clearTimeout(timeoutID);
            mouseMovingStyleEl.disabled = true;
        });

        console.log('nicovideo-comfortable-controller-fader is added.');
    };

    setInterval(() => {
        if (document.querySelector('div[nccf-controller]') === null) {
            initFader();
        }
    }, 100);
})();
