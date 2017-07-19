$("form").submit(function(e) {
    e.preventDefault();
    var $this = $(this);
    $.post(
        $this.attr("action"),
        $this.serialize(),
        function(data) {
            var parsedData = jQuery.parseJSON(data[0]);
            var guildData = guildConfNS.generateGuildInfo(parsedData);

            $("#guildName").text('<' + guildData[0].guildName + '>' +
                ' - ' + guildData[0].guildRealm);

            $("#guildLevel").text(guildData[0].guildLevel);

            $("#guildAchieve").text(guildData[0].guildAchievePoints);

            $("#guildMemberCount").text(guildData[0].memberList.length);

            if (guildData[0].guildFaction === "Horde") {
                $("#guildImage").attr({
                    src: '../../assets/images/horde.png'
                });
                $("#guildData").addClass('panel-danger');
            } else {
                $("#guildImage").attr({
                    src: '../../assets/images/alliance.png'
                });
                $("#guildData").addClass('panel-info');
            }

            $("#guildData").show();
            var generatedHTML = "";

            // for (var i = 0; i < guildData[0].memberList.length; i++) {
            //     var guildC = guildData[0].memberList[i][0];

            // }
            console.log(guildData[0].memberList[0][0]);




            $.each(guildData[0].memberList, function(index, value) {
                console.log(value[0]);
                var currentGuildie =
                    '<div class="row guildMemberRow">' +
                        '<div class="col-xs-2">' +
                            '<img class="guildMemberImage" onerror="characterConfNS.noAvailableCharImage(this)" alt="guildy picture" src="http://us.battle.net/static-render/us/' + value[0].charThumb + '"></div>'+
                        '<div class="col-xs-2"><p>' + value[0].charName + '</p></div>' +
                        '<div class="col-xs-2"><p>' + value[0].charLevel + '</p></div>'+
                        '<div class="col-xs-2"><p>' + value[0].charRace + '</p></div>'+
                        '<div class="col-xs-2"><p>' + value[0].charClass + '</p></div>'+
                    '</div>'

                generatedHTML += currentGuildie;
            });

            $("#guildMembers").html(generatedHTML);










        },
        "json" // The format the response should be in
    );








});
