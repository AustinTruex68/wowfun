//setup recently checked
var recentPlayers = firebaseNS.getRecentPlayers();
//check once it's resolved.
recentPlayers.then(function(promiseResult) {
    // need to replace this with a jQuery each (dumb me)
    var firstChar = promiseResult[0][0];
    var secondChar = promiseResult[1][0];
    var thirdChar = promiseResult[2][0];
    var fourthChar = promiseResult[3][0];
    var fifthChar = promiseResult[4][0];
    //firstChar to dom
    $('#firstCharName').text(firstChar.charName);
    $('#firstCharRealm').text(firstChar.charRealm);
    $('#firstCharClass').text(firstChar.charClass);
    $('#firstCharLevel').text(firstChar.charLevel);
    if (firstChar.charThumb === firstChar.charRealm) {
        $('#firstCharThumb').attr({
            src: '../../assets/images/no-icon.png',
            onerror: "characterConfNS.noAvailableCharImage(this)"
        });
    } else {
        $('#firstCharThumb').attr({
            src: 'http://us.battle.net/static-render/us/' + firstChar.charThumb,
            onerror: "characterConfNS.noAvailableCharImage(this)"
        });
    }
    //secondChar to dom
    $('#secondCharName').text(secondChar.charName);
    $('#secondCharRealm').text(secondChar.charRealm);
    $('#secondCharClass').text(secondChar.charClass);
    $('#secondCharLevel').text(secondChar.charLevel);
    if (secondChar.charThumb === secondChar.charRealm) {
        $('#secondCharThumb').attr({
            src: '../../assets/images/no-icon.png',
            onerror: "characterConfNS.noAvailableCharImage(this)"
        });
    } else {
        $('#secondCharThumb').attr({
            src: 'http://us.battle.net/static-render/us/' + secondChar.charThumb,
            onerror: "characterConfNS.noAvailableCharImage(this)"
        });
    }
    //thirdChar to dom
    $('#thirdCharName').text(thirdChar.charName);
    $('#thirdCharRealm').text(thirdChar.charRealm);
    $('#thirdCharClass').text(thirdChar.charClass);
    $('#thirdCharLevel').text(thirdChar.charLevel);
    if (thirdChar.charThumb === thirdChar.charRealm) {
        $('#thirdCharThumb').attr({
            src: '../../assets/images/no-icon.png'
        });
    } else {
        $('#thirdCharThumb').attr({
            src: 'http://us.battle.net/static-render/us/' + thirdChar.charThumb,
            onerror: "characterConfNS.noAvailableCharImage(this)"
        });
    }

    //fourthChar to dom
    $('#fourthCharName').text(fourthChar.charName);
    $('#fourthCharRealm').text(fourthChar.charRealm);
    $('#fourthCharClass').text(fourthChar.charClass);
    $('#fourthCharLevel').text(fourthChar.charLevel);
    if (fourthChar.charThumb === fourthChar.charRealm) {
        $('#fourthCharThumb').attr({
            src: '../../assets/images/no-icon.png'
        });
    } else {
        $('#fourthCharThumb').attr({
            src: 'http://us.battle.net/static-render/us/' + fourthChar.charThumb,
            onerror: "characterConfNS.noAvailableCharImage(this)"
        });
    }

    //fifthChar to dom
    $('#fifthCharName').text(fifthChar.charName);
    $('#fifthCharRealm').text(fifthChar.charRealm);
    $('#fifthCharClass').text(fifthChar.charClass);
    $('#fifthCharLevel').text(fifthChar.charLevel);
    if (fifthChar.charThumb === fifthChar.charRealm) {
        $('#fifthCharThumb').attr({
            src: '../../assets/images/no-icon.png',
            onerror: "characterConfNS.noAvailableCharImage(this)"
        });
    } else {
        $('#fifthCharThumb').attr({
            src: 'http://us.battle.net/static-render/us/' + fifthChar.charThumb,
            onerror: "characterConfNS.noAvailableCharImage(this)"
        });
    }
});

// //setup recently checked guilds
var recentGuilds = firebaseNS.getRecentGuilds();
//check once it's resolved.
var generatedGuildHTML = "";

recentGuilds.then(function(promiseResult) {
    console.log(promiseResult);
    var recentGuilds = promiseResult;
    $.each(recentGuilds, function(index, value) {
        console.log(value);
        if (value[0].guildFaction === "Horde") {
            var guildImagePath = '../../assets/images/horde.png'
        } else {
            var guildImagePath = '../../assets/images/alliance.png'
        }
        var currentGuild =
            '<div class="col-xs-2 text-center">' +
            '<img src="' + guildImagePath + '" alt="' + value[0].guildFaction + '" class="recentPlayThumb">' +
            '<p><span>' + value[0].guildName + '</span>&nbsp;-&nbsp;<span>' + value[0].guildRealm + '</span><br><span>Members:&nbsp;' + value[0].guildMemberCount + '</span></p>' +
            '</div>';
        generatedGuildHTML += currentGuild;
    });
    $('#injectedRecentGuilds').html(generatedGuildHTML);
});