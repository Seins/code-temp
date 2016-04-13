.controller("webview", function($scope, $http, $stateParams,$sce) {
    var url = decodeURIComponent($stateParams.url);
    console.log("webview url:%o", url);
    $scope._u = url;
    $scope._w = $(window).width();
    $scope._h = $(window).height();
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
})

.controller("wy-detail", function($scope, $http, $stateParams) {
    var url = $stateParams.url;
    console.log("news url:%o", url);
    if (url === "" || url === undefined) {
        $scope.new = "该新闻不是文字类的新闻，不支持查看！";
    } else {
        $http.get(url)
            .success(function(res) {
                var test = /(<div class="content">)(\s|\S)+/;
                var news = res.split('<div class="content">')[1].split('</div>')[0];
                var linkTest = /(href=")(\S)+(")/g;
                var uriarray = news.match(linkTest);
                var result = changeURI(news, uriarray);
                $scope.new = result;
                $scope._u = url;
            })
    }


    function changeURI(res, uriarray) {
        for (var i = 0; i < uriarray.length; i++) {
            var _t = uriarray[i];
            var _r = uriarray[i].replace("href=\"", "");
            _r = _r.replace("\"", "");
            var _rc = "href=\"#/app/web-view?url=" + encodeURIComponent(_r) + "\"";
            res = res.replace(uriarray[i], _rc);
        }

        return res;
    }
})
