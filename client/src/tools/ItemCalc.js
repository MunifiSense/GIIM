import {getUserCharacters} from "../services/CharacterService";
import {getUserWeapons} from "../services/WeaponService";
import {getUserItems} from "../services/ItemService";

const xpToNextLevel = [
    0,
    1000,
    1325,
    1700,
    2150,
    2625,
    3150,
    3725,
    4350,
    5000,
    5700,
    6450,
    7225,
    8050,
    8925,
    9825,
    10750,
    11725,
    12725,
    13775,
    14875,
    16800,
    18000,
    19250,
    20550,
    21875,
    23250,
    24650,
    26100,
    27575,
    29100,
    30650,
    32250,
    33875,
    35550,
    37250,
    38975,
    40750,
    42575,
    44425,
    46300,
    50625,
    52700,
    54775,
    56900,
    59075,
    61275,
    63525,
    65800,
    68125,
    70475,
    76500,
    79050,
    81650,
    84275,
    86950,
    89650,
    92400,
    95175,
    98000,
    100875,
    108950,
    112050,
    115175,
    118325,
    121525,
    124775,
    128075,
    131400,
    134775,
    138175,
    148700,
    152375,
    156075,
    159825,
    163600,
    167425,
    171300,
    175225,
    179175,
    183175,
    216225,
    243025,
    273100,
    306800,
    344600,
    386950,
    434425,
    487625,
    547200
];

const xpToLevelWeaponRarity3 = [
    0,
    275,
    425,
    600,
    800,
    1025,
    1275,
    1550,
    1850,
    2175,
    2500,
    2875,
    3250,
    3650,
    4050,
    4500,
    4950,
    5400,
    5900,
    6425,
    6925,
    7850,
    8425,
    9050,
    9675,
    10325,
    10975,
    11650,
    12350,
    13050,
    13800,
    14525,
    15300,
    16100,
    16900,
    17700,
    18550,
    19400,
    20275,
    21175,
    22050,
    24150,
    25125,
    26125,
    27150,
    28200,
    29250,
    30325,
    31425,
    32550,
    33650,
    36550,
    37775,
    39000,
    40275,
    41550,
    42850,
    44150,
    45500,
    46850,
    48225,
    52075,
    53550,
    55050,
    56550,
    58100,
    59650,
    61225,
    62800,
    64400,
    66025,
    71075,
    72825,
    74575,
    76350,
    78150,
    80000,
    81850,
    83700,
    85575
];

const xpToLevelWeaponRarity4 = [
    400,
    625,
    900,
    1200,
    1550,
    1950,
    2350,
    2800,
    3300,
    3800,
    4350,
    4925,
    5525,
    6150,
    6800,
    7500,
    8200,
    8950,
    9725,
    10500,
    11900,
    12775,
    13700,
    14650,
    15625,
    16625,
    17650,
    18700,
    19775,
    20900,
    22025,
    23200,
    24375,
    25600,
    26825,
    28100,
    29400,
    30725,
    32075,
    33425,
    36575,
    38075,
    39600,
    41150,
    42725,
    44325,
    45950,
    47600,
    49300,
    51000,
    55375,
    57225,
    59100,
    61025,
    62950,
    64925,
    66900,
    68925,
    70975,
    73050,
    78900,
    81125,
    83400,
    85700,
    88025,
    90375,
    92750,
    95150,
    97575,
    100050,
    107675,
    110325,
    113000,
    115700,
    118425,
    121200,
    124000,
    126825,
    129675
];

const xpToLevelWeaponRarity5 = [
    0,
    600,
    950,
    1350,
    1800,
    2325,
    2925,
    3525,
    4200,
    4950,
    5700,
    6525,
    7400,
    8300,
    9225,
    10200,
    11250,
    12300,
    13425,
    14600,
    15750,
    17850,
    19175,
    20550,
    21975,
    23450,
    24950,
    26475,
    28050,
    29675,
    31350,
    33050,
    34800,
    36575,
    38400,
    40250,
    42150,
    44100,
    46100,
    48125,
    50150,
    54875,
    57125,
    59400,
    61725,
    64100,
    66500,
    68925,
    71400,
    73950,
    76500,
    83075,
    85850,
    88650,
    91550,
    94425,
    97400,
    100350,
    103400,
    106475,
    109575,
    118350,
    121700,
    125100,
    128550,
    132050,
    135575,
    139125,
    142725,
    146375,
    150075,
    161525,
    165500,
    169500,
    173550,
    177650,
    181800,
    186000,
    190250,
    194525,
    198875,
    234725,
    263825,
    296400,
    332975,
    373950,
    419925,
    471375,
    529050,
    593675
];

export async function getNeededItemsCharacters(user){
        var userCharResponse = {};
        var userItemResponse = {};
        if(user){
            // Get user characters...
            userCharResponse = await getUserCharacters();
            // Get user items...
            userItemResponse = await getUserItems();
        }else{
            userCharResponse.data = JSON.parse(localStorage.getItem("userCharacters"));
            userItemResponse.data = JSON.parse(localStorage.getItem("userItems"));
            userCharResponse.data = userCharResponse.data ? userCharResponse.data : [];
            userItemResponse.data = userItemResponse.data ? userItemResponse.data : [];
        }
        
        // Do calculations
        var neededItems= [];
        if(userItemResponse){
            userCharResponse.data.forEach(character => {
                var level = Number(character.Users[0].UserCharacters.level);
                var desired_level = Number(character.Users[0].UserCharacters.desired_level);
                var normal_atk_level= Number(character.Users[0].UserCharacters.normal_atk_level);
                var normal_atk_desired_level= Number(character.Users[0].UserCharacters.normal_atk_desired_level);
                var q_atk_level= Number(character.Users[0].UserCharacters.q_atk_level);
                var q_atk_desired_level= Number(character.Users[0].UserCharacters.q_atk_desired_level);
                var e_atk_level= Number(character.Users[0].UserCharacters.e_atk_level);
                var e_atk_desired_level= Number(character.Users[0].UserCharacters.e_atk_desired_level);
                var managed = character.Users[0].UserCharacters.managed;
                var ascended = character.Users[0].UserCharacters.ascended;
                var ascend_next_max = character.Users[0].UserCharacters.ascend_next_max;
                if(managed === 1){
                    const characteritems={
                        name: character.name,
                        element: character.element,
                        rarity: character.rarity,
                        crystal: {
                            type: character.asc_item_group,
                            item_rarity2: findItemFromItemGroup(userItemResponse.data, character.asc_item_group, 2).name,
                            item_rarity3: findItemFromItemGroup(userItemResponse.data, character.asc_item_group, 3).name,
                            item_rarity4: findItemFromItemGroup(userItemResponse.data, character.asc_item_group, 4).name,
                            item_rarity5: findItemFromItemGroup(userItemResponse.data, character.asc_item_group, 5).name,
                            rarity2: 0,
                            rarity3: 0,
                            rarity4: 0,
                            rarity5: 0
                        },
                        boss: {
                            item: character.asc_item_group1,
                            amount : 0
                        },
                        specialty: {
                            item: character.asc_item_specialty,
                            amount: 0
                        },
                        common: {
                            type: character.asc_item_common,
                            item_rarity1: findItemFromItemGroup(userItemResponse.data, character.asc_item_common, 1).name,
                            item_rarity2: findItemFromItemGroup(userItemResponse.data, character.asc_item_common, 2).name,
                            item_rarity3: findItemFromItemGroup(userItemResponse.data, character.asc_item_common, 3).name,
                            rarity1: 0,
                            rarity2: 0,
                            rarity3: 0
                        },
                        talent: {
                            type: character.item_talent_common,
                            item_rarity2: findItemFromItemGroup(userItemResponse.data, character.item_talent, 2).name,
                            item_rarity3: findItemFromItemGroup(userItemResponse.data, character.item_talent, 3).name,
                            item_rarity4: findItemFromItemGroup(userItemResponse.data, character.item_talent, 4).name,
                            rarity2: 0,
                            rarity3: 0,
                            rarity4: 0,
                            common_rarity1: 0,
                            common_rarity2: 0,
                            common_rarity3: 0
                        },
                        weeklyBoss: {
                            item: character.item_talent_boss,
                            amount: 0
                        },
                        xp: {
                            total: 0,
                            heroswit: 0,
                            adventurers: 0,
                            wanderers: 0,
                            extra: 0
                        },
                        mora: {
                            total: 0,
                            ascension: 0,
                            leveling: 0,
                            talents: 0
                        }
                    }
                    
                    // Calculate required ascension materials
                    if((desired_level > 20 && level < 20)
                    || (desired_level === 20 && level < 20 && ascend_next_max)
                    || (level===20 && ascended !== 1 && ascend_next_max)){
                        // Need 1x rarity 2 crystal
                        characteritems.crystal.rarity2+=1;
                        // Need 3x specialty
                        characteritems.specialty.amount+=3;
                        // Need 3x rarity 1 common
                        characteritems.common.rarity1+=3;
                        // Mora
                        characteritems.mora.ascension+= 20000;
                    }

                    if((desired_level > 40 && level < 40)
                    || (desired_level === 40 && level < 40 && ascend_next_max)
                    || (level===40 && ascended !== 1 && ascend_next_max)){
                        // Need 3x rarity 3 crystal
                        characteritems.crystal.rarity3+=3;
                        // Need 10x specialty
                        characteritems.specialty.amount+=10;
                        // Need 15x rarity 1 common
                        characteritems.common.rarity1+=15;
                        // Need 2 boss item
                        characteritems.boss.amount+=2;
                        // Mora
                        characteritems.mora.ascension+= 40000;
                    }

                    if((desired_level > 50 && level < 50)
                    || (desired_level === 50 && level < 50 && ascend_next_max)
                    || (level===50 && ascended !== 1 && ascend_next_max)){
                        // Need 6x rarity 3 crystal
                        characteritems.crystal.rarity3+=6;
                        // Need 20x specialty
                        characteritems.specialty.amount+=20;
                        // Need 12x rarity 2 common
                        characteritems.common.rarity2+=12;
                        // Need 4 boss item
                        characteritems.boss.amount+=4;
                        // Mora
                        characteritems.mora.ascension+= 60000;
                    }

                    if((desired_level > 60 && level < 60)
                    || (desired_level === 60 && level < 60 && ascend_next_max)
                    || (level===60 && ascended !== 1 && ascend_next_max)){
                        // Need 3x rarity 4 crystal
                        characteritems.crystal.rarity4+=3;
                        // Need 30x specialty
                        characteritems.specialty.amount+=30;
                        // Need 18x rarity 2 common
                        characteritems.common.rarity2+=18;
                        // Need 8 boss item
                        characteritems.boss.amount+=8;
                        // Mora
                        characteritems.mora.ascension+= 80000;
                    }

                    if((desired_level > 70 && level < 70)
                    || (desired_level === 70 && level < 70 && ascend_next_max)
                    || (level===70 && ascended !== 1 && ascend_next_max)){
                        // Need 6x rarity 4 crystal
                        characteritems.crystal.rarity4+=6;
                        // Need 45x specialty
                        characteritems.specialty.amount+=45;
                        // Need 12x rarity 3 common
                        characteritems.common.rarity3+=12;
                        // Need 12 boss item
                        characteritems.boss.amount+=12;
                        // Mora
                        characteritems.mora.ascension+= 100000;
                    }

                    if((desired_level > 80 && level < 80)
                    || (desired_level === 80 && level < 80 && ascend_next_max)
                    || (level===80 && ascended !== 1 && ascend_next_max)){
                        // Need 6x rarity 5 crystal
                        characteritems.crystal.rarity5+=6;
                        // Need 60x specialty
                        characteritems.specialty.amount+=60;
                        // Need 24x rarity 3 common
                        characteritems.common.rarity3+=24;
                        // Need 20 boss item
                        characteritems.boss.amount+=20;
                        // Mora
                        characteritems.mora.ascension+= 120000;
                    }

                    // Calculate required talent materials
                    if(normal_atk_desired_level >= 2 &&
                        (!(normal_atk_level >= 2))){
                        characteritems.talent.rarity2+=3;
                        characteritems.talent.common_rarity1+=6;
                        characteritems.mora.talents+=12500;
                    }

                    if(normal_atk_desired_level >= 3 &&
                        (!(normal_atk_level >= 3))){
                        characteritems.talent.rarity3+=2;
                        characteritems.talent.common_rarity2+=3;
                        characteritems.mora.talents+=17500;
                    }
                    
                    if(normal_atk_desired_level >= 4 &&
                        (!(normal_atk_level >= 4))){
                        characteritems.talent.rarity3+=4;
                        characteritems.talent.common_rarity2+=4;
                        characteritems.mora.talents+=25000;
                    }

                    if(normal_atk_desired_level >= 5 &&
                        (!(normal_atk_level >= 5))){
                        characteritems.talent.rarity3+=6;
                        characteritems.talent.common_rarity2+=6;
                        characteritems.mora.talents+=30000;
                    }

                    if(normal_atk_desired_level >= 6 &&
                        (!(normal_atk_level >= 6))){
                        characteritems.talent.rarity3+=9;
                        characteritems.talent.common_rarity2+=9;
                        characteritems.mora.talents+=37500;
                    }

                    if(normal_atk_desired_level >= 7 &&
                        (!(normal_atk_level >= 7))){
                        characteritems.talent.rarity4+=4;
                        characteritems.talent.common_rarity3+=4;
                        characteritems.weeklyBoss+=1;
                        characteritems.mora.talents+=120000;
                    }

                    if(normal_atk_desired_level >= 8 &&
                        (!(normal_atk_level >= 8))){
                        characteritems.talent.rarity4+=6;
                        characteritems.talent.common_rarity3+=6;
                        characteritems.weeklyBoss+=1;
                        characteritems.mora.talents+=260000;
                    }

                    if(normal_atk_desired_level >= 9 &&
                        (!(normal_atk_level >= 9))){
                        characteritems.talent.rarity4+=12;
                        characteritems.talent.common_rarity3+=9;
                        characteritems.weeklyBoss+=1;
                        characteritems.mora.talents+=450000;
                    }

                    if(normal_atk_desired_level >= 10 &&
                        (!(normal_atk_level >= 10))){
                        characteritems.talent.rarity4+=16;
                        characteritems.talent.common_rarity3+=12;
                        characteritems.weeklyBoss+=1;
                        characteritems.mora.talents+=700000;
                    }

                    // Calculate required Q talent materials
                    if(q_atk_desired_level >= 2 &&
                        (!(q_atk_level >= 2))){
                        characteritems.talent.rarity2+=3;
                        characteritems.talent.common_rarity1+=6;
                        characteritems.mora.talents+=12500;
                    }

                    if(q_atk_desired_level >= 3 &&
                        (!(q_atk_level >= 3))){
                        characteritems.talent.rarity3+=2;
                        characteritems.talent.common_rarity2+=3;
                        characteritems.mora.talents+=17500;
                    }
                    
                    if(q_atk_desired_level >= 4 &&
                        (!(q_atk_level >= 4))){
                        characteritems.talent.rarity3+=4;
                        characteritems.talent.common_rarity2+=4;
                        characteritems.mora.talents+=25000;
                    }

                    if(q_atk_desired_level >= 5 &&
                        (!(q_atk_level >= 5))){
                        characteritems.talent.rarity3+=6;
                        characteritems.talent.common_rarity2+=6;
                        characteritems.mora.talents+=30000;
                    }

                    if(q_atk_desired_level >= 6 &&
                        (!(q_atk_level >= 6))){
                        characteritems.talent.rarity3+=9;
                        characteritems.talent.common_rarity2+=9;
                        characteritems.mora.talents+=37500;
                    }

                    if(q_atk_desired_level >= 7 &&
                        (!(q_atk_level >= 7))){
                        characteritems.talent.rarity4+=4;
                        characteritems.talent.common_rarity3+=4;
                        characteritems.weeklyBoss+=1;
                        characteritems.mora.talents+=120000;
                    }

                    if(q_atk_desired_level >= 8 &&
                        (!(q_atk_level >= 8))){
                        characteritems.talent.rarity4+=6;
                        characteritems.talent.common_rarity3+=6;
                        characteritems.weeklyBoss+=1;
                        characteritems.mora.talents+=260000;
                    }

                    if(q_atk_desired_level >= 9 &&
                        (!(q_atk_level >= 9))){
                        characteritems.talent.rarity4+=12;
                        characteritems.talent.common_rarity3+=9;
                        characteritems.weeklyBoss+=1;
                        characteritems.mora.talents+=450000;
                    }

                    if(q_atk_desired_level >= 10 &&
                        (!(q_atk_level >= 10))){
                        characteritems.talent.rarity4+=16;
                        characteritems.talent.common_rarity3+=12;
                        characteritems.weeklyBoss+=1;
                        characteritems.mora.talents+=700000;
                    }

                    // Calculate required talent materials
                    if(e_atk_desired_level >= 2 &&
                        (!(e_atk_level >= 2))){
                        characteritems.talent.rarity2+=3;
                        characteritems.talent.common_rarity1+=6;
                        characteritems.mora.talents+=12500;
                    }

                    if(e_atk_desired_level >= 3 &&
                        (!(e_atk_level >= 3))){
                        characteritems.talent.rarity3+=2;
                        characteritems.talent.common_rarity2+=3;
                        characteritems.mora.talents+=17500;
                    }
                    
                    if(e_atk_desired_level >= 4 &&
                        (!(e_atk_level >= 4))){
                        characteritems.talent.rarity3+=4;
                        characteritems.talent.common_rarity2+=4;
                        characteritems.mora.talents+=25000;
                    }

                    if(e_atk_desired_level >= 5 &&
                        (!(e_atk_level >= 5))){
                        characteritems.talent.rarity3+=6;
                        characteritems.talent.common_rarity2+=6;
                        characteritems.mora.talents+=30000;
                    }

                    if(e_atk_desired_level >= 6 &&
                        (!(e_atk_level >= 6))){
                        characteritems.talent.rarity3+=9;
                        characteritems.talent.common_rarity2+=9;
                        characteritems.mora.talents+=37500;
                    }

                    if(e_atk_desired_level >= 7 &&
                        (!(e_atk_level >= 7))){
                        characteritems.talent.rarity4+=4;
                        characteritems.talent.common_rarity3+=4;
                        characteritems.weeklyBoss+=1;
                        characteritems.mora.talents+=120000;
                    }

                    if(e_atk_desired_level >= 8 &&
                        (!(e_atk_level >= 8))){
                        characteritems.talent.rarity4+=6;
                        characteritems.talent.common_rarity3+=6;
                        characteritems.weeklyBoss+=1;
                        characteritems.mora.talents+=260000;
                    }

                    if(e_atk_desired_level >= 9 &&
                        (!(e_atk_level >= 9))){
                        characteritems.talent.rarity4+=12;
                        characteritems.talent.common_rarity3+=9;
                        characteritems.weeklyBoss+=1;
                        characteritems.mora.talents+=450000;
                    }

                    if(e_atk_desired_level >= 10 &&
                        (!(e_atk_level >= 10))){
                        characteritems.talent.rarity4+=16;
                        characteritems.talent.common_rarity3+=12;
                        characteritems.weeklyBoss+=1;
                        characteritems.mora.talents+=700000;
                    }
                    // higher than 8 unknown???????

                    // Calculate number of EXP books needed                   
                    xpToNextLevel.forEach((value, index) => {
                        if(index >= level && index < desired_level){
                            characteritems.xp.total+=value;
                        }
                    })

                    characteritems.xp.heroswit = Math.floor(characteritems.xp.total / 20000);
                    characteritems.xp.adventurers = Math.floor((characteritems.xp.total - (characteritems.xp.heroswit * 20000)) / 5000);
                    characteritems.xp.wanderers = Math.floor((characteritems.xp.total - (characteritems.xp.heroswit * 20000) - (characteritems.xp.adventurers * 5000)) / 1000);
                    characteritems.xp.extra = Math.floor((characteritems.xp.total - (characteritems.xp.heroswit * 20000) 
                        - (characteritems.xp.adventurers * 5000) - (characteritems.xp.wanderers * 1000)));

                    // Calculate mora
                    characteritems.mora.leveling = ((characteritems.xp.heroswit * 20000) + (characteritems.xp.adventurers * 5000) + (characteritems.xp.wanderers * 1000))/5;
                    characteritems.mora.total = characteritems.mora.talents + characteritems.mora.ascension + characteritems.mora.leveling;

                    neededItems.push(characteritems);
                }
            })
        }
        return(neededItems);
}

export async function getNeededItemsWeapons(user){
        var userWeaponResponse = {};
        var userItemResponse = {};
        if(user){
            // Get user characters...
            userWeaponResponse = await getUserWeapons();
            // Get user items...
            userItemResponse = await getUserItems();
        }else{
            userWeaponResponse.data = JSON.parse(localStorage.getItem("userWeapons"));
            userItemResponse.data = JSON.parse(localStorage.getItem("userItems"));
            userWeaponResponse.data = userWeaponResponse.data ? userWeaponResponse.data : [];
            userItemResponse.data = userItemResponse.data ? userItemResponse.data : [];
        }
        // Do calculations
        var neededItems = [];
        if(userItemResponse){
            userWeaponResponse.data.forEach(weapon => {
                var level = Number(weapon.Users[0].UserWeapons.level);
                var desired_level = Number(weapon.Users[0].UserWeapons.desired_level);
                var managed = weapon.Users[0].UserWeapons.managed;
                var ascended = weapon.Users[0].UserWeapons.ascended;
                var ascend_next_max = weapon.Users[0].UserWeapons.ascend_next_max;
                var rarity = Number(weapon.rarity);
                
                if(managed === 1){
                    const weaponitems={
                        name: weapon.name,
                        type: weapon.weapon_type,
                        rarity: weapon.rarity,
                        domain: {
                            type: weapon.asc_item_group,
                            item_rarity2: findItemFromItemGroup(userItemResponse.data, weapon.asc_item_group, 2).name,
                            item_rarity3: findItemFromItemGroup(userItemResponse.data, weapon.asc_item_group, 3).name,
                            item_rarity4: findItemFromItemGroup(userItemResponse.data, weapon.asc_item_group, 4).name,
                            item_rarity5: findItemFromItemGroup(userItemResponse.data, weapon.asc_item_group, 5).name,
                            rarity2: 0,
                            rarity3: 0,
                            rarity4: 0,
                            rarity5: 0
                        },
                        common1: {
                            type: weapon.asc_item_group1,
                            item_rarity2: findItemFromItemGroup(userItemResponse.data, weapon.asc_item_group1, 2).name,
                            item_rarity3: findItemFromItemGroup(userItemResponse.data, weapon.asc_item_group1, 3).name,
                            item_rarity4: findItemFromItemGroup(userItemResponse.data, weapon.asc_item_group1, 4).name,
                            rarity2: 0,
                            rarity3: 0,
                            rarity4: 0
                        },
                        common2: {
                            type: weapon.asc_item_group2,
                            item_rarity1: findItemFromItemGroup(userItemResponse.data, weapon.asc_item_group2, 1).name,
                            item_rarity2: findItemFromItemGroup(userItemResponse.data, weapon.asc_item_group2, 2).name,
                            item_rarity3: findItemFromItemGroup(userItemResponse.data, weapon.asc_item_group2, 3).name,
                            rarity1: 0,
                            rarity2: 0,
                            rarity3: 0
                        },
                        xp: {
                            total: 0,
                            mystic: 0,
                            fine: 0,
                            regular: 0,
                            wasted: 0
                        },
                        mora: {
                            total: 0,
                            ascension: 0,
                            leveling: 0
                        }
                    }

                    // Calculate required ascension materials

                    if(rarity === 5){
                        if((desired_level > 20 && level < 20)
                    || (desired_level === 20 && level < 20 && ascend_next_max)
                    || (level===20 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity2+=5;
                            weaponitems.common1.rarity2+=5;
                            weaponitems.common2.rarity1+=3;
                            weaponitems.mora.ascension+= 10000;
                        }
        
                        if((desired_level > 40 && level < 40)
                    || (desired_level === 40 && level < 40 && ascend_next_max)
                    || (level===40 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity3+=5;
                            weaponitems.common1.rarity2+=18;
                            weaponitems.common2.rarity1+=12;
                            weaponitems.mora.ascension+= 20000;
                        }
        
                        if((desired_level > 50 && level < 50)
                    || (desired_level === 50 && level < 50 && ascend_next_max)
                    || (level===50 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity3+=9;
                            weaponitems.common1.rarity3+=9;
                            weaponitems.common2.rarity2+=9;
                            weaponitems.mora.ascension+= 30000;
                        }
        
                        if((desired_level > 60 && level < 60)
                    || (desired_level === 60 && level < 60 && ascend_next_max)
                    || (level===60 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity4+=5;
                            weaponitems.common1.rarity3+=18;
                            weaponitems.common2.rarity2+=14;
                            weaponitems.mora.ascension+= 45000;
                        }
        
                        if((desired_level > 70 && level < 70)
                    || (desired_level === 70 && level < 70 && ascend_next_max)
                    || (level===70 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity4+=9;
                            weaponitems.common1.rarity4+=14;
                            weaponitems.common2.rarity3+=9;
                            weaponitems.mora.ascension+= 55000;
                        }
        
                        if((desired_level > 80 && level < 80)
                    || (desired_level === 80 && level < 80 && ascend_next_max)
                    || (level===80 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity5+=6;
                            weaponitems.common1.rarity4+=27;
                            weaponitems.common2.rarity3+=18;
                            weaponitems.mora.ascension+= 65000;
                        }
                    }else if(rarity === 4){
                        if((desired_level > 20 && level < 20)
                    || (desired_level === 20 && level < 20 && ascend_next_max)
                    || (level===20 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity2+=3;
                            weaponitems.common1.rarity2+=3;
                            weaponitems.common2.rarity1+=2;
                            weaponitems.mora.ascension+= 5000;
                        }
        
                        if((desired_level > 40 && level < 40)
                    || (desired_level === 40 && level < 40 && ascend_next_max)
                    || (level===40 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity3+=3;
                            weaponitems.common1.rarity2+=12;
                            weaponitems.common2.rarity1+=8;
                            weaponitems.mora.ascension+= 15000;
                        }
        
                        if((desired_level > 50 && level < 50)
                    || (desired_level === 50 && level < 50 && ascend_next_max)
                    || (level===50 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity3+=6;
                            weaponitems.common1.rarity3+=6;
                            weaponitems.common2.rarity2+=6;
                            weaponitems.mora.ascension+= 20000;
                        }
        
                        if((desired_level > 60 && level < 60)
                    || (desired_level === 60 && level < 60 && ascend_next_max)
                    || (level===60 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity4+=3;
                            weaponitems.common1.rarity3+=12;
                            weaponitems.common2.rarity2+=9;
                            weaponitems.mora.ascension+= 30000;
                        }
        
                        if((desired_level > 70 && level < 70)
                    || (desired_level === 70 && level < 70 && ascend_next_max)
                    || (level===70 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity4+=6;
                            weaponitems.common1.rarity4+=9;
                            weaponitems.common2.rarity3+=6;
                            weaponitems.mora.ascension+= 35000;
                        }
        
                        if((desired_level > 80 && level < 80)
                    || (desired_level === 80 && level < 80 && ascend_next_max)
                    || (level===80 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity5+=4;
                            weaponitems.common1.rarity4+=18;
                            weaponitems.common2.rarity3+=12;
                            weaponitems.mora.ascension+= 45000;
                        }
                    }else if(rarity === 3){
                        if((desired_level > 20 && level < 20)
                    || (desired_level === 20 && level < 20 && ascend_next_max)
                    || (level===20 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity2+=2;
                            weaponitems.common1.rarity2+=2;
                            weaponitems.common2.rarity1+=1;
                            weaponitems.mora.ascension+= 5000;
                        }
        
                        if((desired_level > 40 && level < 40)
                    || (desired_level === 40 && level < 40 && ascend_next_max)
                    || (level===40 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity3+=2;
                            weaponitems.common1.rarity2+=8;
                            weaponitems.common2.rarity1+=5;
                            weaponitems.mora.ascension+= 10000;
                        }
        
                        if((desired_level > 50 && level < 50)
                    || (desired_level === 50 && level < 50 && ascend_next_max)
                    || (level===50 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity3+=4;
                            weaponitems.common1.rarity3+=4;
                            weaponitems.common2.rarity2+=4;
                            weaponitems.mora.ascension+= 15000;
                        }
        
                        if((desired_level > 60 && level < 60)
                    || (desired_level === 60 && level < 60 && ascend_next_max)
                    || (level===60 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity4+=2;
                            weaponitems.common1.rarity3+=8;
                            weaponitems.common2.rarity2+=8;
                            weaponitems.mora.ascension+= 20000;
                        }
        
                        if((desired_level > 70 && level < 70)
                    || (desired_level === 70 && level < 70 && ascend_next_max)
                    || (level===70 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity4+=4;
                            weaponitems.common1.rarity4+=6;
                            weaponitems.common2.rarity3+=4;
                            weaponitems.mora.ascension+= 25000;
                        }
        
                        if((desired_level > 80 && level < 80)
                    || (desired_level === 80 && level < 80 && ascend_next_max)
                    || (level===80 && ascended !== 1 && ascend_next_max)){
                            weaponitems.domain.rarity5+=3;
                            weaponitems.common1.rarity4+=12;
                            weaponitems.common2.rarity3+=8;
                            weaponitems.mora.ascension+= 30000;
                        }
                    }

                    // Calculate number of EXP books needed
                    if(rarity === 3){
                        xpToLevelWeaponRarity3.forEach((value, index) => {
                            if(index >= level && index < desired_level){
                                    weaponitems.xp.total+= value;
                            }
                        })
                    }else if(rarity === 4){
                        xpToLevelWeaponRarity4.forEach((value, index) => {
                            if(index >= level && index < desired_level){
                                    weaponitems.xp.total+= value;
                            }
                        })
                    }else if(rarity === 5){
                        xpToLevelWeaponRarity5.forEach((value, index) => {
                            if(index >= level && index < desired_level){
                                    weaponitems.xp.total+= value;
                            }
                        })
                    }
                    
                    weaponitems.xp.mystic = Math.floor(weaponitems.xp.total / 10000);
                    weaponitems.xp.fine = Math.floor((weaponitems.xp.total - (weaponitems.xp.mystic * 10000)) / 2000);
                    weaponitems.xp.regular = Math.floor((weaponitems.xp.total - (weaponitems.xp.mystic * 10000) - (weaponitems.xp.fine * 2000)) / 400);
                    const extra = Math.floor((weaponitems.xp.total - (weaponitems.xp.mystic * 10000) 
                    - (weaponitems.xp.fine * 2000) - (weaponitems.xp.regular * 400)));
                    if(extra > 0){
                        weaponitems.xp.wasted = Math.floor((weaponitems.xp.total - (weaponitems.xp.mystic * 10000) 
                        - (weaponitems.xp.fine * 2000) - (weaponitems.xp.regular * 400)));
                        weaponitems.xp.regular++;
                    }
                    // Calculate mora
                    weaponitems.mora.leveling = ((weaponitems.xp.mystic * 10000) + (weaponitems.xp.fine * 2000) + (weaponitems.xp.regular * 400))/10;
                    weaponitems.mora.total = weaponitems.mora.ascension + weaponitems.mora.leveling;

                    neededItems.push(weaponitems);
                }       
            })
        }
        return(neededItems);
}

async function setupNeededItems(userItems){
    userItems.forEach(element => {
        element.needed = 0;
        element.neededWeaponAsc = 0;
        element.neededWeaponLevel = 0;
        element.neededCharacterAsc = 0;
        element.neededCharacterLevel = 0;
        element.neededCharacterTalent = 0;
        element.canForge = 0;
        element.totalAmount = 0;
    })
    return userItems;
}

export async function retrieveNeededWeaponItems(user, userItems){
    var neededItems = await getNeededItemsWeapons(user);
    if(neededItems){
        neededItems.forEach(weapon => {
            var item = findItemIndex(userItems, weapon.domain.item_rarity2);
            userItems[item].needed += weapon.domain.rarity2;
            userItems[item].neededWeaponAsc += weapon.domain.rarity2;
            item = findItemIndex(userItems, weapon.domain.item_rarity3);
            userItems[item].needed += weapon.domain.rarity3;
            userItems[item].neededWeaponAsc += weapon.domain.rarity3;
            item = findItemIndex(userItems, weapon.domain.item_rarity4);
            userItems[item].needed += weapon.domain.rarity4;
            userItems[item].neededWeaponAsc += weapon.domain.rarity4;
            item = findItemIndex(userItems, weapon.domain.item_rarity5);
            userItems[item].needed += weapon.domain.rarity5;
            userItems[item].neededWeaponAsc += weapon.domain.rarity5;

            item = findItemIndex(userItems, weapon.common1.item_rarity2);
            userItems[item].needed += weapon.common1.rarity2;
            userItems[item].neededWeaponAsc += weapon.common1.rarity2;
            item = findItemIndex(userItems, weapon.common1.item_rarity3);
            userItems[item].needed += weapon.common1.rarity3;
            userItems[item].neededWeaponAsc += weapon.common1.rarity3;
            item = findItemIndex(userItems, weapon.common1.item_rarity4);
            userItems[item].needed += weapon.common1.rarity4;
            userItems[item].neededWeaponAsc += weapon.common1.rarity4;

            item = findItemIndex(userItems, weapon.common2.item_rarity1);
            userItems[item].needed += weapon.common2.rarity1;
            userItems[item].neededWeaponAsc += weapon.common2.rarity1;
            item = findItemIndex(userItems, weapon.common2.item_rarity2);
            userItems[item].needed += weapon.common2.rarity2;
            userItems[item].neededWeaponAsc += weapon.common2.rarity2;
            item = findItemIndex(userItems, weapon.common2.item_rarity3);
            userItems[item].needed += weapon.common2.rarity3;
            userItems[item].neededWeaponAsc += weapon.common2.rarity3;

            item = findItemIndex(userItems, "Mystic Enhancement Ore");
            userItems[item].needed += weapon.xp.mystic;
            userItems[item].neededWeaponLevel += weapon.xp.mystic;
            item = findItemIndex(userItems, "Fine Enhancement Ore");
            userItems[item].needed += weapon.xp.fine;
            userItems[item].neededWeaponLevel += weapon.xp.mystic;
            item = findItemIndex(userItems, "Enhancement Ore");
            userItems[item].needed += weapon.xp.regular;
            userItems[item].neededWeaponLevel += weapon.xp.mystic;

            item = findItemIndex(userItems, "Mora");
            userItems[item].needed += weapon.mora.total;
            userItems[item].neededWeaponAsc += weapon.mora.ascension;
            userItems[item].neededWeaponLevel += weapon.mora.leveling;
        });
        return userItems;
    }
};

export async function retrieveNeededCharacterItems(user, userItems){
    var neededItems = await getNeededItemsCharacters(user);
    if(neededItems){
        for(var character of neededItems){
            var item = findItemIndex(userItems, character.crystal.item_rarity2);
            userItems[item].needed += character.crystal.rarity2;
            userItems[item].neededCharacterAsc += character.crystal.rarity2;
            item = findItemIndex(userItems, character.crystal.item_rarity3);
            userItems[item].needed += character.crystal.rarity3;
            userItems[item].neededCharacterAsc += character.crystal.rarity3;
            item = findItemIndex(userItems, character.crystal.item_rarity4);
            userItems[item].needed += character.crystal.rarity4;
            userItems[item].neededCharacterAsc += character.crystal.rarity4;
            item = findItemIndex(userItems, character.crystal.item_rarity5);
            userItems[item].needed += character.crystal.rarity5;
            userItems[item].neededCharacterAsc += character.crystal.rarity5;

            item = findItemIndex(userItems, character.boss.item);
            userItems[item].needed += character.boss.amount;
            userItems[item].neededCharacterAsc += character.boss.amount;
            item = findItemIndex(userItems, character.specialty.item);
            userItems[item].needed += character.specialty.amount;
            userItems[item].neededCharacterAsc += character.specialty.amount;

            item = findItemIndex(userItems, character.common.item_rarity1);
            userItems[item].needed += character.common.rarity1;
            userItems[item].neededCharacterAsc += character.common.rarity1;
            userItems[item].neededCharacterTalent += character.talent.common_rarity1;
            item = findItemIndex(userItems, character.common.item_rarity2);
            userItems[item].needed += character.common.rarity2;
            userItems[item].neededCharacterAsc += character.common.rarity2;
            userItems[item].neededCharacterTalent += character.talent.common_rarity2;
            item = findItemIndex(userItems, character.common.item_rarity3);
            userItems[item].needed += character.common.rarity3;
            userItems[item].neededCharacterAsc += character.common.rarity3;
            userItems[item].neededCharacterTalent += character.talent.common_rarity3;

            item = findItemIndex(userItems, character.talent.item_rarity2);
            userItems[item].needed += character.talent.rarity2;
            userItems[item].neededCharacterTalent += character.talent.rarity2;
            item = findItemIndex(userItems, character.talent.item_rarity3);
            userItems[item].needed += character.talent.rarity3;
            userItems[item].neededCharacterTalent += character.talent.rarity3;
            item = findItemIndex(userItems, character.talent.item_rarity4);
            userItems[item].needed += character.talent.rarity4;
            userItems[item].neededCharacterTalent += character.talent.rarity4;

            item = findItemIndex(userItems, character.weeklyBoss.item);
            userItems[item].needed += character.weeklyBoss.amount;
            userItems[item].neededCharacterTalent += character.weeklyBoss.amount;

            item = findItemIndex(userItems, "Hero's Wit");
            userItems[item].needed += character.xp.heroswit;
            userItems[item].neededCharacterLevel += character.xp.heroswit;
            item = findItemIndex(userItems, "Adventurer's Experience");
            userItems[item].needed += character.xp.adventurers;
            userItems[item].neededCharacterLevel += character.xp.adventurers;
            item = findItemIndex(userItems, "Wanderer's Advice");
            userItems[item].needed += character.xp.wanderers;
            userItems[item].neededCharacterLevel += character.xp.wanderers;

            item = findItemIndex(userItems, "Mora");
            userItems[item].needed += character.mora.total;
            userItems[item].neededCharacterAsc += character.mora.ascension;
            userItems[item].neededCharacterLevel += character.mora.leveling;
            userItems[item].neededCharacterTalent += character.mora.talents;
        };
        return userItems;
    }     
}

export async function checkForge(userItems){
    var item = -1;
    for(var i = 0; i<userItems.length; i++){
        if(userItems[i].craftable === 1){
            if(userItems[i].item_group === "Weapon EXP Material"){
                if(userItems[i].name === "Mystic Enhancement Ore"){
                    item = findItemIndex(userItems, "Crystal Chunk");
                    userItems[i].canForge = Math.floor(userItems[item].Users[0].UserItems.amount/3);
                } else if(userItems[i].name === "Fine Enhancement Ore"){
                    item = findItemIndex(userItems, "White Iron Chunk");
                    userItems[i].canForge = Math.floor(userItems[item].Users[0].UserItems.amount/3);
                } else if(userItems[i].name === "Enhancement Ore"){
                    item = findItemIndex(userItems, "Iron Chunk");
                    userItems[i].canForge = Math.floor(userItems[item].Users[0].UserItems.amount/3);
                }
            }else{
                item = findItemIndexFromItemGroup(userItems, userItems[i].item_group, userItems[i].rarity-1);
                if(userItems[item].Users[0].UserItems.amount >= 3){
                    userItems[i].canForge = Math.floor(userItems[item].Users[0].UserItems.amount/3);
                }
            }

            userItems[i].totalAmount = userItems[i].Users[0].UserItems.amount + userItems[i].Users[0].UserItems.forge;
            userItems[item].needed += userItems[i].Users[0].UserItems.forge*3;
        }else{
            userItems[i].canForge = -1;
            userItems[i].Users[0].UserItems.forge = -1;
        }
    }
    for(i = 0; i<userItems.length; i++){
        userItems[i].totalAmount = userItems[i].Users[0].UserItems.amount - userItems[i].needed;
    }
    return userItems;
}

export async function retrieveNeeded(user, userItems){
    userItems = await setupNeededItems(userItems);
    userItems = await retrieveNeededWeaponItems(user, userItems);
    userItems = await retrieveNeededCharacterItems(user, userItems);
    userItems = await checkForge(userItems);
    return userItems;
}

function findItemIndex(items, name){
    return items.findIndex(element => element.name === name);
}

function findItemFromItemGroup(items, item_group, rarity){
    return items.find(item => {
        return item.item_group === item_group && item.rarity === rarity
    });
}

function findItemIndexFromItemGroup(userItems, item_group, rarity){
    return userItems.findIndex(element => (
        element.rarity === rarity && 
        element.item_group === item_group
    ));
}