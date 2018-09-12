;
(function () {
    var delayer = new function () {
        var hwdn = 0;
        this.setDelay = function (handler, delay) {
            clearTimeout(hwdn);
            hwdn = setTimeout(handler, delay);
        };
    };

    function showClearCount(length) {
        if (length <= 0) {
            return;
        }

        var btn = $('[type="submit"]');
        if (btn.length > 0) {
            var count = (btn.data('count') || 0) + length;
            var title = '已为您清除了' + count + '条广告';
            var value = '百度一下(' + count + ')';
            btn.data('count', count).attr('title', title).val(value);

            delayer.setDelay(function () {
                btn.data('count', 0);
            }, 1000);
        }
    }

    function clearBaiduAd() {
        return $("#content_left div[data-click] span:contains('广告')")
            .parents("#content_left div[data-click]")
            .remove()
            .length;
    }

    $(document).bind("DOMNodeInserted", function (e) {
        var length = clearBaiduAd();
        showClearCount(length);
    });

    $(function () {
        $('[type="submit"]').click(function () {
            $(this).data('count', 0);
        });
    });
})();