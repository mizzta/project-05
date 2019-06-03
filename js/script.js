// IIFE immeditaley envoked function expression
(function ($) {

    // Document ready shorthand
    $(function () {
        let lastPage = '';

        // console.log(api_vars);

        //TODO add Get request

        $('#new-quote-button').on('click', getRandomQuote);
        $('#quote-submission-form').on('submit', postQuote);
        $('.submit-success-message').hide();

        function getRandomQuote(event) {
            event.preventDefault();

            lastPage = document.URL;

            $.ajax({
                method: 'get',
                url: api_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
            }).done(function (data) {
                // console.log(data);
                const randomQuote = data[0];
                // console.log(randomQuote);
                //update the DOM with the returned quote

                const $title = data[0].title.rendered;
                const $content = data[0].content.rendered;
                const $quoteSource = data[0]._qod_quote_source;
                const $quoteSourceUrl = data[0]._qod_quote_source_url;


                $('.entry-content').html($content);
                $('.entry-meta .entry-title').html('&mdash; ' + $title + ', ');
                $('.entry-meta .source').html(
                    `<a href='${$quoteSourceUrl}'>${$quoteSource}</a>`
                );

                history.pushState(null, null, data[0].slug);
                history.pushState(null, null, randomQuote.slug);


            }).fail(function () {
                // console.log(error);

                // append a message telling the user something went wrong
            });

            $(window).on('popstate', function () {
                window.location.replace(lastPage);
            });

        }//end of getRandomQuote

        //TODO add PostQuote
        function postQuote(event) {
            event.preventDefault();



            const quoteAuthor = $('#quote-author').val();
            const quoteContent = $('#quote-content').val();
            const quoteSource = $('#quote-source').val();
            const quoteSourceUrl = $('#quote-source-url').val();

            if (quoteAuthor !== '') {
                // check if the field is empty
                postAjax();
            }

            if (quoteContent !== '') {
                // check if the field is empty
                postAjax();
            }

            if (quoteSource !== '') {
                // check if the field is empty
                postAjax();
            }

            function postAjax() {

                $.ajax({
                    method: 'post',
                    url: api_vars.rest_url + 'wp/v2/posts',
                    data: {
                        // TODO use the from input .val() for the title, content
                        title: quoteAuthor,
                        content: quoteContent,
                        _qod_quote_source: quoteSource,
                        _qod_quote_source_url: quoteSourceUrl,
                        status: 'pending',
                        // _qod_quote_source:
                        // _qod_quote_source_url:
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce);
                    }
                }).done(function () {
                    console.log('great success');
                    $('#quote-submission-form').slideUp(500);
                    $(".submit-success-message").show(200);
                }).fail(function () {
                    console.log('not so great success');
                });
            } // end of postAjax
        } //end of postQuote

    });//end of doc ready


})(jQuery);
