$("form").submit(function(e) {
    e.preventDefault();
    var $this = $(this);
    $.post(
        $this.attr("action"),
        $this.serialize(),
        function(data) {
            $('#results').text(data);
        },
        "json" // The format the response should be in
    );
});