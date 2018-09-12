;
(function () {
    var delayer = new function () {
        var _hwdn = 0;
        this.setDelay = function (handler, delay) {
            if (_hwdn) clearTimeout(_hwdn);
            _hwdn = setTimeout(handler, delay);
        };
    };

    var counter = new function () {
        var _count = 0;

        this.addCount = function (count) {
            _count = _count + count;
            return _count;
        };

        this.clear = function () {
            _count = 0;
        };

        this.showCount = function () {
            var btn = $('[type="submit"]');
            if (btn.length) {
                var title = '';
                var value = '百度一下';
                if (_count) {
                    value = value + '(' + _count + ')'
                    title = '已为您清除了' + _count + '条广告';
                }
                btn.attr('title', title).val(value);
            }
            return _count;
        };
    };

    function clearBaiduAd() {
        return $("#content_left div[data-click] span:contains('广告')")
            .parents("#content_left div[data-click]")
            .remove()
            .length;
    }

    $(document).bind("DOMNodeInserted", function (e) {
        var length = clearBaiduAd();
        counter.addCount(length);
        counter.showCount();

        // 1s之后将计数计重置为0
        delayer.setDelay(function () {
            counter.clear();
        }, 1000);
    });

    // 页面加载完成后，点击“百度一下”重新计数
    $(function () {
        $('[type="submit"]').click(function () {
            counter.clear();
            counter.showCount();
        });
    });
})();