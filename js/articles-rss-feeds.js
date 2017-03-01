//$(document).ready(function() {

function loadFeeds()
{

    $.mobile.loading("show");

    var feedUrl = 'http://feeds.denverpost.com/dp-news-breaking-local';
    
    var apiUrl = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=';

    var url = apiUrl + encodeURI(feedUrl);

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        success: function (result) {


            var feed = result.responseData.feed;


            var feedTitle = feed.description;
            var feedList = '<ul data-role="listview" xdata-filter="true">';

			//alert(feed.entries.length);
			
            for(var i = 0; i < feed.entries.length; i++) {
                var entry = feed.entries[i];
                feedList += '<li>';
                feedList += '<a target="_blank" id= "#feedContent"'+i+ '" rel="external" href="'+entry.link+'">';
                feedList += '<h1>' + entry.title + '</h1>';
                feedList += '<p>' + entry.contentSnippet + '</p>';
                feedList += '</a>';
                feedList += '</li>';
            }

            feedList += '</ul>';

            $('#article-feed-title').html(feedTitle);
            $('#article-feed-title').trigger('create');

            $('#articles-rss-feeds').html(feedList);
            $('#articles-rss-feeds').trigger('create');

            $.mobile.loading("hide");
        },
        error: function (error) {
            console.log("Failure" + JSON.stringify(error));
        }
    });
}
//});
