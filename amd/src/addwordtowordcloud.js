define(['jquery', 'core/ajax', 'core/notification', 'core/modal_factory', 'core/str'],
    function ($, ajax, notification, ModalFactory, str) {
        return {
            init: function (refreshtime, aid, timestamphtml, colors) {
                $('#mod-wordcloud-new-word').keypress(function (e) {
                    // filter enter key to auto commit the word
                    if (e.keyCode === 13) {
                        $('#mod-wordcloud-btn').click();
                    }
                });
                $.mod_wordcloud_add_word = function () {
                    var word = $('#mod-wordcloud-new-word').val();

                    if (!word.trim()) {
                        return;
                    }

                    ajax.call([{
                        methodname: 'mod_wordcloud_add_word',
                        args: {aid: aid, word: word},
                        done: function (returnval) {
                            if (!returnval.cloudhtml) {
                                ModalFactory.create({
                                    type: ModalFactory.types.CANCEL,
                                    title: str.get_string('warning', 'mod_wordcloud'),
                                    body: returnval.warnings[0].message,
                                }).then(function (modal) {
                                    modal.show();
                                });
                            } else {
                                $('#mod-wordcloud-words-box').html(returnval.cloudhtml);
                                $('#mod-wordcloud-new-word').val('');
                            }
                        },
                        fail: notification.exception
                    }]);
                };
                setInterval(function(){
                    ajax.call([{
                        methodname: 'mod_wordcloud_get_words',
                        args: {aid: aid, timestamphtml: timestamphtml},
                        done: function (returnval) {
                            if (returnval.cloudhtml) {
                                $('#mod-wordcloud-words-box').html(returnval.cloudhtml);
                                timestamphtml = returnval.timestamphtml;
                            }
                        },
                        fail: notification.exception
                    }]);
                },refreshtime*1000);

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