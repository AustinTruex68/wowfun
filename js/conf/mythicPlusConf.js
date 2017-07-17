mythicPlusConfNS = {
    generateMythicPlus: function(parseAchieve) {
        console.log('Generating Mythic Data Nicely');
        for (var i = 0; i < parseAchieve.achievements.criteria.length; i++) {
            //plus twos
            if (parseAchieve.achievements.criteria[i] === 33096) {
                var plusTwoQuan = parseAchieve.achievements.criteriaQuantity[i];
            }
            //plus fives
            if (parseAchieve.achievements.criteria[i] === 33097) {
                var plusFiveQuan = parseAchieve.achievements.criteriaQuantity[i];
            }
            //plus tens
            if (parseAchieve.achievements.criteria[i] === 33098) {
                var plusTenQuan = parseAchieve.achievements.criteriaQuantity[i];
            }
            //plus fifteens
            if (parseAchieve.achievements.criteria[i] === 32028) {
                var plusFifteenQuan = parseAchieve.achievements.criteriaQuantity[i];
            }
        }

        return [{ "plusTwos": plusTwoQuan, "plusFives": plusFiveQuan, "plusTens": plusTenQuan, "plusFifteens": plusFifteenQuan }];
    }
}
