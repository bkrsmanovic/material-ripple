(function () {
    var isMobile = window.navigator.userAgent.match(/Mobile/) && window.navigator.userAgent.match(/Mobile/)[0] === "Mobile";
    var event = isMobile ? 'touchend' : 'click';

    document.querySelectorAll('*[data-animation="ripple"]').forEach(function (button) {
        button.addEventListener(event, function (e) {
            var target = e.target;

            var rect = button.getBoundingClientRect();
            var btnHeight = rect.height;
            var btnWidth = rect.width;

            var posMouseX = 0;
            var posMouseY = 0;

            if (isMobile) {
                posMouseX = e.changedTouches[0].pageX - rect.left;
                posMouseY = e.changedTouches[0].pageY - rect.top;
            } else {
                posMouseX = e.pageX - rect.left;
                posMouseY = e.pageY - rect.top;
            }

            var speed = target.dataset.speed || 700;
            var color = target.dataset.color || 'rgba(255, 255, 255, 0.8)';

            var baseCSS = [
                'position: absolute;',
                `width: ${btnWidth * 2}px;`,
                `height: ${btnWidth * 2}px;`,
                `transition: all linear ${speed}ms;`,
                'transition-timing-function: cubic-bezier(0.250, 0.460, 0.450, 0.940);',
                'border-radius: 50%;',
                `background: ${color};`,
                `top: ${posMouseY - btnWidth}px;`,
                `left: ${posMouseX - btnWidth}px;`,
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
}());
