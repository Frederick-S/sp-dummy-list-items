/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var SPDummyListItemsCreation = __webpack_require__(1);

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

/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
