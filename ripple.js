(function () {
    document.querySelectorAll('*[data-animation="ripple"]').forEach((button) => {
        ['click', 'touchend'].forEach((event) => {
            button.addEventListener(event, (e) => {
                const target = e.target;

                const rect = button.getBoundingClientRect();

                const posMouseX = (e.pageX || e.changedTouches[0].pageX) - rect.left;
                const posMouseY = (e.pageY || e.changedTouches[0].pageY) - rect.top;

                const width = Math.max(rect.width, rect.height);

                const speed = target.dataset.speed || 700;
                const color = target.dataset.color || 'rgba(255, 255, 255, 0.8)';

                const baseCSS = [
                    'position: absolute;',
                    `width: ${width * 2}px;`,
                    `height: ${width * 2}px;`,
                    `transition: all linear ${speed}ms;`,
                    'transition-timing-function: cubic-bezier(0.250, 0.460, 0.450, 0.940);',
                    'border-radius: 50%;',
                    `background: ${color};`,
                    `top: ${posMouseY - width}px;`,
                    `left: ${posMouseX - width}px;`,
                    'pointer-events: none;',
                    `transform: scale(0);`,
                ].join('');

                const ripple = document.createElement('span');

                ripple.style.cssText = baseCSS;

                target.style.position = 'relative';
                target.style.overflow = 'hidden';

                target.appendChild(ripple);

                setTimeout(function() {
                    ripple.style.cssText = baseCSS + 'transform:scale(1); opacity: 0;';
                }, 5);

                setTimeout(function() {
                    ripple.remove();
                }, speed);
            });
        });
    });
}());