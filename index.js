function SPDummyListItemsCreation(webUrl, listTitle, crossSite) {
    var web = null;
    var appContextSite = null;
    this.clientContext = null;

    if (crossSite) {
        this.clientContext = SP.ClientContext.get_current();
        appContextSite = new SP.AppContextSite(this.clientContext, webUrl);
        web = appContextSite.get_web();
    } else {
        this.clientContext = new SP.ClientContext(webUrl);
        web = this.clientContext.get_web();
    }

    this.list = web.get_lists().getByTitle(listTitle);
}

SPDummyListItemsCreation.prototype.create = function (fieldValues, count, successHandler, errorHandler) {
    for (var i = 0; i < count; i++) {
        var listItemCreateInfo = new SP.ListItemCreationInformation();
        var listItem = this.list.addItem(listItemCreateInfo);

        for (var fieldName in fieldValues) {
            if (fieldValues.hasOwnProperty(fieldName)) {
                listItem.set_item(fieldName, fieldValues[fieldName]);
            }
        }

        listItem.update();
        this.clientContext.load(listItem);
    }

    this.clientContext.executeQueryAsync(successHandler, errorHandler);
};

module.exports = SPDummyListItemsCreation;
