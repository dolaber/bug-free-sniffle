$.widget("custom.newsfeeditem", {
    _create: function () {
        this.element.empty();

        let title = $(document.createElement("a"));
        title.addClass('title');
        title.html(this.options.title);
        title.attr('href', this.options.url);

        let via = $(document.createElement("div")).addClass('via');
        via.text(" via ");
        via.append($(document.createElement('a')).text(this.options.domain).attr('href', 'http:\\' + this.options.domain));

        let stats = $(document.createElement('div')).addClass('stats');
        stats.append($('<span class="ups">&uarr; ' + this.options.ups + '</span>'));
        stats.append($('<span class="downs">&darr; ' + this.options.downs + '</span>'));

        this.element.append(title);
        this.element.append(via);
        this.element.append(stats);
    }
})

$.widget("custom.newsfeed", {
    options: {
        source: 'https://www.reddit.com/r/worldnews.json'
    },
    _create: function () {
        this.element.addClass('newsfeed');
        this.element.empty();
        this.element.append($("<div>Loading...</div>").addClass('loading'));
        $.getJSON('https://www.reddit.com/r/worldnews.json', this._show.bind(this));
    },
    _show: function (data) {
        let widget = this.element;
        widget.empty();
        if (!data || !data.data || !data.data.children) {
            this._noresults();
            return;
        }
        let articles = data.data.children;
        let shownArticles = 0;
        articles.forEach(element => {
            if (!element.data || shownArticles >= 5) {
                return;
            }
            widget.append($(document.createElement('div')).addClass('newsitem').newsfeeditem(element.data));
            shownArticles++;
        });
    },
    _noresults: function () {
        this.element.append("Sorry, there were no news articles found.");
    }
});