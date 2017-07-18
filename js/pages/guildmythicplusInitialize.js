$("form").submit(function(e) {
    e.preventDefault();
    var $this = $(this);
    $.post(
        $this.attr("action"),
        $this.serialize(),
        function(data) {
            var parsedData = jQuery.parseJSON(data[0]);
            var guildData = guildConfNS.generateGuildInfo(parsedData);

        },
        "json" // The format the response should be in
    );

});
