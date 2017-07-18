guildConfNS = {
    generateGuildInfo: function(guildData) {


        var memberList = [{}];

        for(var i = 0; i < guildData.members.length; i++){
            console.log(guildData.members[i]);
        }

        // console.log(guildData.members);
        // console.log(memberList);

        var guildRealm = guildData.realm;
        var guildName = guildData.name;
        var guildLevel = guildData.level;
        var guildAchievePoints = guildData.achievementPoints;

        return [{ "guildName": guildName, "guildRealm": guildRealm, "guildLevel": guildLevel, "guildAchievePoints": guildAchievePoints }]
    }
}
