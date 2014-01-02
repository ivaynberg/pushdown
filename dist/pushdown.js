/*!
 * pushdown v0.0.1-snapshot (http://github.com/ivaynberg/pushdown)
 * Copyright 2013 Igor Vaynberg
 * Licensed under http://opensource.org/licenses/MIT
 */
(function ($, window, document, undefined) {

    var Pushdown = function (container, opts) {
        this.container = container;
        this.opts = opts;

        this.queue = [];
        this.busy = false;
        this.opening = false;
        this.closing = false;

        container.data("pushdown", this);
        container.find(">.pushdown>.pushdown-content").addClass("pushdown-hidden");
        container.on("click", $.proxy(this.click, this));
    };

    $.extend(Pushdown.prototype, {
        constructor: Pushdown,
        click: function (event) {
            var element = $(event.target);
            var path = element.parentsUntil(".pushdown").addBack();

            if (path.filter(".pushdown-close").size() > 0) {
                // close link/button clicked
                this.queue.splice(0, this.queue.length, {type: 1});
                this.dequeue();
                event.preventDefault();
                return;
            }

            if (path.filter(".pushdown-item").size() > 0) {
                // trigger link
                var selected = this.container.find(".pushdown-selected");
                var clicked = $(event.target).parents(".pushdown").first();

                if (this.closing) {
                    this.queue.splice(0, this.queue.length, {type: 2, element: clicked});
                } else if (selected.size() > 0) {

                    if (selected.get(0) === clicked.get(0)) {
                        // clicked same as open or opening, queue a close
                        this.queue.splice(0, this.queue.length, {type: 1});
                    } else {
                        // clicked a different one, queue a close and then an open
                        this.queue.splice(0, this.queue.length, {type: 1}, {type: 2, element: clicked});
                    }
                } else {
                    // open
                    var pushdown = $(event.target).parents(".pushdown").first();
                    this.queue.splice(0, this.queue.length, {type: 2, element: pushdown});
                }

                this.dequeue();
            }
        },
        dequeue: function () {
            if (this.busy || this.queue.length === 0) {
                return;
            }
            var action = this.queue.splice(0, 1)[0];
            if (action.type == 1) {
                this.close();
            } else if (action.type == 2) {
                this.open(action.element);
            }
        },
        open: function (pushdown) {
            this.busy = true;
            this.opening = true;
            var edge = pushdown;
            while (edge.next().size() > 0 && edge.next().position().left > edge.position().left) {
                edge = edge.next();
            }

            var body = $("<div class='pushdown-body' style='max-height:0'></div>");
            edge.after(body);

            var content = pushdown.find(">.pushdown-content");
            var height = content.height();

            body.append(content);
            content.removeClass("pushdown-hidden");

            pushdown.siblings().not(pushdown).not(body).addClass("pushdown-unselected");
            pushdown.addClass("pushdown-selected");

            body.animate({maxHeight: height}, $.proxy(this.onOpened, this));
        },
        close: function () {
            this.busy = true;
            this.closing = true;

            var pushdown = this.container.find(">.pushdown-selected");

            if (pushdown.size() === 0) return;
            pushdown = pushdown.first();

            var body = this.container.find(">.pushdown-body").first();
            var content = body.find(".pushdown-content");

            body.animate({maxHeight: 0}, $.proxy(this.onClosed, this));
        },
        onOpened: function () {
            this.busy = false;
            this.opening = false;
            this.dequeue();

            var self = this;
            $(window).on("resize.pushdown", function () {
                window.clearTimeout(self.resizeTimeout);
                self.resizeTimeout = window.setTimeout(function () {
                    self.onResized();
                }, 50);
            });
        },
        onClosed: function () {
            $(window).off("resize.pushdown");

            var pushdown = this.container.find(">.pushdown-selected").first();
            var body = this.container.find(">.pushdown-body").first();
            var content = body.find(".pushdown-content");

            content.addClass("pushdown-hidden");
            pushdown.append(content);
            body.remove();
            pushdown.siblings().addBack().removeClass("pushdown-selected pushdown-unselected");

            this.busy = false;
            this.closing = false;
            this.dequeue();
        },
        onResized: function () {

            var body = this.container.find(">.pushdown-body").first();
            if (body.length < 1) return;

            body.detach();

            var pushdown = this.container.find(">.pushdown-selected"),
                edge = pushdown;

            while (edge.next().size() > 0 && edge.next().position().left > edge.position().left) {
                edge = edge.next();
            }

            edge.after(body);
        }
    });

    $.fn.pushdown = function () {

        var args = Array.prototype.slice.call(arguments, 0);

        this.each(function () {
            if (args.length === 0 || typeof(args[0]) === "object") {
                var opts = args.length === 0 ? {} : $.extend({}, args[0]);
                new Pushdown($(this), opts);
            } else if (args[0]==="open") {
                var pushdown=$(this).data("pushdown"),
                    param=args[1];
                if (typeof(param)==="string") {
                    pushdown.queue.push({type: 2, element: pushdown.container.find(">.pushdown").filter(param).first()});
                } else if (typeof(param)==="number") {
                    pushdown.queue.push({type: 2, element: $(pushdown.container.find(">.pushdown").get(param))});
                } else if (param instanceof jQuery) {
                    pushdown.queue.push({type: 2, element: param});
                }
                pushdown.dequeue();
            }
        });
        return this;
    };

})(jQuery, window, document);
