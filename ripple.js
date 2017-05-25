(function () {
    var isMobile = window.navigator.userAgent.match(/Mobile/) && window.navigator.userAgent.match(/Mobile/)[0] === "Mobile",
    event = isMobile ? "touchend" : "click",
    button = document.querySelectorAll('*[data-animation="ripple"]');

    for (var i = 0; i < button.length; i++) {
        var currentBtn = button[i];
        // console.log(window.getComputedStyle(button[i], null).getPropertyValue('background'));

        currentBtn.addEventListener(event, function(e) {
            e.preventDefault();
            const button = e.target,
            rect = button.getBoundingClientRect(),
            originalBtn = this,
            btnHeight = rect.height,
            btnWidth = rect.width;
            let posMouseX = 0,
            posMouseY = 0;

            if (isMobile) {
                posMouseX = e.changedTouches[0].pageX - rect.left;
                posMouseY = e.changedTouches[0].pageY - rect.top;
            } else {
                posMouseX = e.pageX - rect.left;
                posMouseY = e.pageY - rect.top;
            }

            var speed = this.dataset.speed || 700,
            color = this.dataset.color || 'rgba(255,255,255,0.8)';

            var baseCSS =  `position: absolute;
            width: ${btnWidth * 2}px;
            height: ${btnWidth * 2}px;
            transition: all linear ` + speed + `ms;
            transition-timing-function:cubic-bezier(0.250, 0.460, 0.450, 0.940);
            border-radius: 50%;
            background: ` + color + `;
            top:${posMouseY - btnWidth}px;
            left:${posMouseX - btnWidth}px;
            pointer-events: none;
            transform:scale(0)`

            var ripple = document.createElement("span");
            ripple.style.cssText = baseCSS;

            this.style.position = "relative";
            this.style.overflow = "hidden";

            this.appendChild(ripple);

            setTimeout( function() {
                ripple.style.cssText = baseCSS + `transform:scale(1); opacity: 0;`;
            }, 5);

            setTimeout( function() {
                ripple.remove();
                if (currentBtn.href) {
                    window.location.href = currentBtn.href;
                }
            }, speed);
        })
    }
}());
