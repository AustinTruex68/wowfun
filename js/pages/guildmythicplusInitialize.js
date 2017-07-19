$("form").submit(function(e) {
    e.preventDefault();
    var $this = $(this);
    $.post(
        $this.attr("action"),
        $this.serialize(),
        function(data) {
            var parsedData = jQuery.parseJSON(data[0]);
            var guildData = guildConfNS.generateGuildInfo(parsedData);

            $("#guildName").text(guildData[0].guildName);
            if (guildData[0].guildFaction === "Horde") {
                $("#guildImage").attr({
                    src: '../../assets/images/horde.png'
                });
            } else {
                $("#guildImage").attr({
                    src: '../../assets/images/alliance.png'
                });
            }

            $("#guildData").show();
            console.log(guildData);
        },
        "json" // The format the response should be in
    );

});
