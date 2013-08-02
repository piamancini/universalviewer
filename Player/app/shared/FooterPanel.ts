/// <reference path="../../js/jquery.d.ts" />
import utils = module("app/Utils");
import baseApp = module("app/BaseApp");
import shell = module("app/shared/Shell");
import baseView = module("app/BaseView");

export class FooterPanel extends baseView.BaseView {

    $options: JQuery;
    $embedBtn: JQuery;
    $fullScreenBtn: JQuery;

    constructor($element: JQuery) {
        super($element, true, false);
    }

    create(): void {
        super.create();

        // events.
        $.subscribe(baseApp.BaseApp.TOGGLE_FULLSCREEN, () => {
            this.toggleFullScreen();
        });

        this.$options = utils.Utils.createDiv('options');
        this.$element.append(this.$options);

        this.$fullScreenBtn = $('<a href="#" class="imageButton fullScreen"></a>');
        this.$options.append(this.$fullScreenBtn);

        this.$fullScreenBtn.on('click', (e) => {
            e.preventDefault();
            $.publish(baseApp.BaseApp.TOGGLE_FULLSCREEN);
        });
    }

    toggleFullScreen(): void {
        if (this.app.isFullScreen) {
            this.$fullScreenBtn.swapClass('fullScreen', 'normal');
        } else {
            this.$fullScreenBtn.swapClass('normal', 'fullScreen');
        }
    }

    resize(): void {
        super.resize();

        this.$element.css({
            'top': this.app.height() - this.$element.height()
        });
    }
}