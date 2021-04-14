define(['jquery'],
    function ($) {
        return {
            init: function (colors) {
                if (!document.fullscreenEnabled) {
                    var fs_btn = document.getElementById('mod-wordcloud-fs-btn');
                    fs_btn.style.display = "none";
                }
                $.mod_wordcloud_fs_toggle = function () {
                    if (document.fullscreenElement === null) {
                        var fs_element = document.getElementById('mod-wordcloud-content');
                        fs_element.requestFullscreen();
                    } else {
                        document.exitFullscreen();
                    }
                };
                document.onfullscreenchange = function () {
                    var fs_icon = document.getElementById('mod-wordcloud-fs-icon');
                    if (document.fullscreenElement === null) {
                        fs_icon.className = fs_icon.className.replace(/\bfa-compress\b/g, "fa-expand");
                    } else {
                        fs_icon.className = fs_icon.className.replace(/\bfa-expand\b/g, "fa-compress");
                    }
                };

                var stylerules = '';
                var editCSS = document.createElement('style');

                for (var i = 1; i <= colors.length; i++) {
                    stylerules += '.mod-wordcloud-w' + i + ' {color: #' + colors[i-1] + ';} \n';
                }

                editCSS.innerHTML = stylerules;
                document.body.appendChild(editCSS);
            }
        };
    });