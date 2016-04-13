.controller("webview", function($scope, $http, $stateParams,$sce) {
    
    //url from parameters was encoded,decode first
    var url = decodeURIComponent($stateParams.url);
    console.log("webview url:%o", url);
    
    //data
    $scope._u = url;
    $scope._w = $(window).width();
    $scope._h = $(window).height();
    
    //resolve iframe cors problem
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
})

.controller("wy-detail", function($scope, $http, $stateParams) {
    
    var url = $stateParams.url;
    console.log("news url:%o", url);
    
    if (url === "" || url === undefined) {
        //image view page unbuild noew,intead by text tip
        $scope.new = "该新闻不是文字类的新闻，不支持查看！";
    } else {
        //request page and get content we need! 
        $http.get(url)
            .success(function(res) {
                var news = res.split('<div class="content">')[1].split('</div>')[0];
                var linkTest = /(href=")(\S)+(")/g;
                var uriArray = news.match(linkTest);
                var result = changeURI(news, uriArray);
                $scope.new = result;
                $scope._u = url;
            });
        
    }

    /**
     * change link to argularjs controller map
     *@param res data need to deal  
     *@param uriArray  all uri in {res} which need to deal
     */
    function changeURI(res, uriArray) {
        
        for (var i = 0; i < uriArray.length; i++) {
            var _t = uriArray[i];
            var _r = uriArray[i].replace("href=\"", "");
            _r = _r.replace("\"", "");
            var _rc = "href=\"#/app/web-view?url=" + encodeURIComponent(_r) + "\"";
            res = res.replace(uriArray[i], _rc);
        }
        
        return res;
    }
})
