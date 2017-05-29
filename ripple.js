(function () {
    document.querySelectorAll('*[data-animation="ripple"]').forEach(function (button) {
        ['click', 'touchend'].forEach(function (event) {
            button.addEventListener(event, function (e) {
                var target = e.target;

                var rect = button.getBoundingClientRect();

                var posMouseX = (e.pageX || e.changedTouches[0].pageX) - rect.left
                var posMouseY = (e.pageY || e.changedTouches[0].pageY) - rect.top

                var width = Math.max(rect.width, rect.height);

                var speed = target.dataset.speed || 700;
                var color = target.dataset.color || 'rgba(255, 255, 255, 0.8)';

                var baseCSS = [
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

                var ripple = document.createElement('span');

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
