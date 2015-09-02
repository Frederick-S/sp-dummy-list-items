var SPDummyListItemsCreation = require('sp-dummy-list-items');

var getQueryStringParameter = function (param) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";

    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");

        if (singleParam[0] == param) {
            return decodeURIComponent(singleParam[1]);
        }
    }
};

var appWebUrl = getQueryStringParameter('SPAppWebUrl');
var dummyListItemsCreation = new SPDummyListItemsCreation(appWebUrl, 'Test');

dummyListItemsCreation.create({
    'Title': 'Title',
    'Score': 100
}, 20, function (sender, args) {
    $('#message').html('List items are createdly successfully. <a href=\'' + appWebUrl + '/Lists/Test\'>Check it</a>.');
}, function (sender, args) {
    $('#message').text(args.get_message());
});