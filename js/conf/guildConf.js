guildConfNS = {
    generateGuildInfo: function(guildData) {
        var memberList = [];
        for (var i = 0; i < guildData.members.length; i++) {
            memberList.push(characterConfNS.generateCharInfo(guildData.members[i].character, true));
        }

        if (guildData.side === 1) {
            var guildFaction = "Horde";
        } else {
            var guildFaction = "Alliance";
        }

        var guildRealm = guildData.realm;
        var guildName = guildData.name;
        var guildLevel = guildData.level;
        var guildAchievePoints = guildData.achievementPoints;


        return [{ "guildFaction": guildFaction, "guildName": guildName, "guildRealm": guildRealm, "guildLevel": guildLevel, "guildAchievePoints": guildAchievePoints, "memberList": memberList }];
    }
}
