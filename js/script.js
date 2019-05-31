(function ($) {

    // alert('hello');
    // // all of your code goes
    // $('body').append('hello world');
    // $('.documents').always(function () {
    //   });
    
add_action( 'wp_ajax_foobar', 'my_ajax_foobar_handler' );

$('#new-quote-button').click(function(){
alert('hello');

    // var text = jQuery('textarea#textInput').val();
    // var method = jQuery('select#methodOptions').val();

    if (text!='')
    {
        $.ajax({
            url: 'http://localhost:8888/quote-on-dev/wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
            type: 'GET',
            data: 'data=' + text + '&method='+ method,
            dataType: 'html',
            // success: function( message) {
            //     jQuery('textarea#textOutput').val(message);
            // }
        });
    }
});





//   title
// quote
// quote source
// quote source url

// For the Ajax get request you are going to want to use a url like: `wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1`

// You would need the full url e.g. `http://localhost:8888/name-of-your-wp-folder/wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1`




$("#new-quote-button").on("click", function (event) {
    event.preventDefault();

    $.ajax({
        method: 'post',
        // url: api_vars.ajax_url,
        url: api_vars.rest_url + 'wp/v2/posts/' + api_vars.post_id,
        data: {
            // action: 'qod_status_ajax',
            // security: api_vars.status_nonce,
            // the_post_id: api_vars.post_id
            "post_status": "draft"
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce)
        }
    }).done(function (response) {
        alert('Success! The status has been changed.');
    });
});






})(jQuery); //end of js file


