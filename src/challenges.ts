export type ChallengeType = "build" | "survive" | "explore" | "ice" | "redstone" | "nether" | "festive";
export type Difficulty = "easy" | "medium" | "hard";

export interface Challenge {
  title: string;
  challenge: string;
  tip: string;
}

export interface Day extends Record<Difficulty, Challenge> {
  type: ChallengeType;
}

export const TYPE_LABELS: Record<ChallengeType, string> = {
  build: "Build",
  survive: "Survival",
  explore: "Explore",
  ice: "Winter",
  redstone: "Redstone",
  nether: "Nether",
  festive: "Big day",
};

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

// One entry per door, in date order: entry 0 is Nov 1, entry 54 is Dec 25.
export const DAYS: Day[] = [
  // November
  {
    type: "build",
    easy: { title: "Cozy Cabin", challenge: "Build a spruce log cabin with a stone-brick chimney. Put a campfire at the top so it smokes.", tip: "Hay bale under the campfire makes the smoke rise twice as high." },
    medium: { title: "Snowed-In Lodge", challenge: "Build a two-story spruce cabin with a fireplace, a stocked pantry and a bedroom upstairs.", tip: "Barrels make tidy pantry shelves." },
    hard: { title: "Mountain Chalet", challenge: "Build a three-story chalet on a mountainside with a wraparound balcony and smoke rising from two chimneys.", tip: "Upside-down stairs make roof overhangs look carved." },
  },
  {
    type: "explore",
    easy: { title: "Winter Home", challenge: "Find a snowy taiga or snowy plains biome and set your bed and base there for the season.", tip: "Bring a few stacks of torches. Snow builds up on unlit blocks." },
    medium: { title: "Frontier Base", challenge: "Set up a snowy base with a bed, furnace, crafting table, chest room and a fenced perimeter.", tip: "Fence gates let you through and keep most mobs out." },
    hard: { title: "Far North", challenge: "Travel at least 5,000 blocks from spawn, then build a snowy base and stay there until tomorrow's door opens.", tip: "Note your coordinates before you leave so you can find spawn again." },
  },
  {
    type: "survive",
    easy: { title: "Snowball Stockpile", challenge: "Collect 64 snowballs with a shovel, then craft them into 16 snow blocks.", tip: "A Silk Touch shovel drops snow layers instead of snowballs." },
    medium: { title: "Snow Fort", challenge: "Build a snow fort with four walls, a gate and a lookout, using only snow blocks.", tip: "Snow blocks don't melt next to torches, so light it up freely." },
    hard: { title: "Snowball Turrets", challenge: "Build 10 snow golems and post them behind a wall at your base to pelt passing mobs.", tip: "Rain hurts snow golems, so give them a roof." },
  },
  {
    type: "survive",
    easy: { title: "Loyal Companion", challenge: "Tame a wolf with bones and dye its collar red.", tip: "Right-click the tamed wolf with red dye to recolor the collar." },
    medium: { title: "The Pack", challenge: "Tame three wolves and give each one a different collar color.", tip: "Right-click a wolf to make it sit so it stays safe at base." },
    hard: { title: "Winter Menagerie", challenge: "Tame a wolf, a cat and a parrot, and bring all three home to one snowy base.", tip: "Parrots live in jungles and tame with seeds. Cats usually hang around villages." },
  },
  {
    type: "build",
    easy: { title: "Sleigh Workshop", challenge: "Build a sleigh from stairs, slabs and trapdoors, big enough to sit in.", tip: "Put a minecart or boat inside so you can actually sit down." },
    medium: { title: "Team of Four", challenge: "Build a full-size sleigh with four block reindeer in front of it.", tip: "Brown terracotta bodies with fence antlers read well from a distance." },
    hard: { title: "Sky Sleigh", challenge: "Build a sleigh and a team of eight reindeer floating at least 50 blocks in the air, with a safe way up and down.", tip: "Scaffolding climbs fast and breaks away easily when you're done." },
  },
  {
    type: "survive",
    easy: { title: "Sapling Patch", challenge: "Plant and grow 3 spruce trees.", tip: "Bone meal speeds up saplings." },
    medium: { title: "Tree Farm", challenge: "Grow 10 spruce trees from saplings. Grow at least one giant 2×2 spruce.", tip: "Giant spruce needs four saplings in a square and room above." },
    hard: { title: "Christmas Tree Farm", challenge: "Grow 4 giant 2×2 spruce trees in neat rows, with a fence and a path around them.", tip: "Bone meal works on a full 2×2 of saplings too." },
  },
  {
    type: "build",
    easy: { title: "Frosty Friend", challenge: "Build a snow golem from two snow blocks and a carved pumpkin.", tip: "Shear the pumpkin face off to see what's underneath." },
    medium: { title: "Golem Patrol", challenge: "Build 4 snow golems and station them around your base.", tip: "Snow golems leave a trail of snow wherever they wander." },
    hard: { title: "Iron Guardian", challenge: "Build an iron golem to stand guard beside three snow golems in a village.", tip: "Four iron blocks in a T shape with a carved pumpkin on top." },
  },
  {
    type: "survive",
    easy: { title: "Holiday Fishing", challenge: "Catch 10 cod for the holiday feast.", tip: "Rain improves your fishing speed." },
    medium: { title: "Mixed Catch", challenge: "Catch one of each fish: cod, salmon, tropical fish and pufferfish.", tip: "Fish are random in any open water, so settle in and be patient." },
    hard: { title: "Treasure Catch", challenge: "Fish up a treasure item: a name tag, saddle or enchanted book.", tip: "Treasure needs open water at least 5 blocks wide and deep. Luck of the Sea helps." },
  },
  {
    type: "build",
    easy: { title: "Lantern Walk", challenge: "Craft 8 lanterns and light the path to your front door.", tip: "A lantern is a torch surrounded by iron nuggets." },
    medium: { title: "Lantern Road", challenge: "Light a path of 25 lanterns from your base to the nearest village.", tip: "Hang lanterns under fences or chains for a street-lamp look." },
    hard: { title: "Lantern Highway", challenge: "Build a raised road of at least 200 blocks between two villages, with a lantern every 10 blocks.", tip: "Mobs can't spawn on bottom slabs, so they make safe road tops." },
  },
  {
    type: "build",
    easy: { title: "Festive Flags", challenge: "Design a red and green banner on a loom and hang 12 copies around your base.", tip: "Copy a banner by combining it with a blank banner of the same color." },
    medium: { title: "Village Colors", challenge: "Design a banner with at least 3 patterns and hang a copy over every door of your base.", tip: "A loom saves dye compared to a crafting table." },
    hard: { title: "Holiday Shield", challenge: "Design a 6-layer banner and apply it to a shield you carry for the rest of the month.", tip: "Combine a banner and a shield in a crafting grid." },
  },
  {
    type: "build",
    easy: { title: "Gingerbread Hut", challenge: "Build a 5×5 gingerbread hut from brown blocks with white trim.", tip: "White wool works as frosting early on." },
    medium: { title: "Gingerbread House", challenge: "Build a gingerbread house: brown terracotta walls with white concrete frosting.", tip: "Red and white concrete stripes make candy-cane corners." },
    hard: { title: "Gingerbread Village", challenge: "Build 4 gingerbread houses along a candy street with gumdrop lamps.", tip: "Stained glass over glowstone looks like a gumdrop." },
  },
  {
    type: "survive",
    easy: { title: "Night Watch", challenge: "Stay awake through one night in a lit shelter and step outside at dawn.", tip: "Add a window so you can watch the snow." },
    medium: { title: "Long Cold Night", challenge: "Survive one full night outside in a snowy biome without sleeping.", tip: "Light up a perimeter first, then stand your ground." },
    hard: { title: "No Shelter", challenge: "On Hard difficulty, survive one full night outside in a snowy biome with no walls or roof.", tip: "Keep food in your hotbar and watch your back." },
  },
  {
    type: "ice",
    easy: { title: "Winter Kit", challenge: "Craft a bucket and a pair of leather boots for the season ahead.", tip: "Cows drop leather, and a bucket takes 3 iron ingots." },
    medium: { title: "Powder Trap", challenge: "Find powder snow and collect a bucketful. Wear leather boots to walk on it.", tip: "Look on snowy slopes and grove biomes, or use a cauldron during snowfall." },
    hard: { title: "Powder Pit", challenge: "Build a powder snow pit and trap a skeleton in it until it turns into a stray.", tip: "A skeleton left in powder snow slowly converts." },
  },
  {
    type: "survive",
    easy: { title: "Bake a Cake", challenge: "Bake a cake from milk, sugar, eggs and wheat.", tip: "Chickens and cows near a farm make this a quick one." },
    medium: { title: "Pie Night", challenge: "Bake 8 pumpkin pies for the holiday table.", tip: "A pie needs a pumpkin, sugar and an egg." },
    hard: { title: "Full Bakery", challenge: "Build a bakery supplied by your own wheat, sugar cane, pumpkin, chicken and cow farms, then bake 3 cakes.", tip: "Water next to farmland makes crops grow faster." },
  },
  {
    type: "build",
    easy: { title: "Crafting Corner", challenge: "Set up a crafting table, furnace and chest under a roof with one lantern.", tip: "Even a tiny roof turns a corner into a workshop." },
    medium: { title: "Elf Workshop", challenge: "Build a toy workshop with a crafting table, loom, cartography table and smithing table.", tip: "Give each station its own little bench with item frames above." },
    hard: { title: "Toy Factory", challenge: "Build a three-floor factory with a workstation for every villager job.", tip: "There are 13 job blocks. Barrels, composters and lecterns are easy starters." },
  },
  {
    type: "survive",
    easy: { title: "Gift Exchange", challenge: "Complete trades with 5 different villagers.", tip: "Fletchers buy sticks, an easy early trade." },
    medium: { title: "Trading Post", challenge: "Raise one villager to Journeyman level.", tip: "Villagers restock at their job block, so give them access to it." },
    hard: { title: "Master Trader", challenge: "Raise one villager all the way to Master level.", tip: "Curing a zombie villager gives big discounts." },
  },
  {
    type: "ice",
    easy: { title: "Frozen Pond", challenge: "Make a frozen pond in front of your base and add benches around it.", tip: "Frost Walker boots can freeze water for you later in the month." },
    medium: { title: "Skating Rink", challenge: "Build an ice rink at least 15×15 with a fence, lanterns and a warm-up hut.", tip: "Regular ice melts near light. Packed ice doesn't." },
    hard: { title: "Lake Village", challenge: "Build 3 ice-fishing huts on a frozen lake, joined by a lantern-lit path.", tip: "Check for lanterns near regular ice, or lay packed ice under the path." },
  },
  {
    type: "ice",
    easy: { title: "Boat Lap", challenge: "Build a 20-block ice track with a start and finish, then ride it in a boat.", tip: "Regular ice is fine for a short track." },
    medium: { title: "Ice Boat Race", challenge: "Build a 50-block ice boat track out of packed ice with walls and a finish line.", tip: "Blue ice is faster than packed ice if you find some." },
    hard: { title: "Grand Prix", challenge: "Build a 200-block blue ice circuit with sharp turns, walls and a finish line.", tip: "Nine packed ice craft one blue ice." },
  },
  {
    type: "explore",
    easy: { title: "Berry Basket", challenge: "Gather 16 sweet berries from a taiga.", tip: "Bushes hurt to walk through, so pick from the edge." },
    medium: { title: "Holly and Berries", challenge: "Gather a stack of sweet berries and 16 glow berries.", tip: "Glow berries grow in lush caves underground." },
    hard: { title: "Berry Farm", challenge: "Build a fenced farm of 16 sweet berry bushes and a tunnel of glow berry vines.", tip: "Bone meal makes cave vines grow berries." },
  },
  {
    type: "survive",
    easy: { title: "Sparklers", challenge: "Craft 8 plain firework rockets.", tip: "All you need is paper and gunpowder." },
    medium: { title: "Firework Factory", challenge: "Craft 16 firework rockets with colored stars.", tip: "Creepers drop gunpowder, so wait for nightfall." },
    hard: { title: "Grand Finale Stock", challenge: "Craft 64 rockets using at least 5 different firework stars with trails or twinkles.", tip: "Diamonds add a trail and glowstone dust adds a twinkle." },
  },
  {
    type: "build",
    easy: { title: "Little Snowman", challenge: "Build a snowman 5 blocks tall with a red wool scarf.", tip: "Coal or black wool works for the eyes." },
    medium: { title: "Giant Snowman", challenge: "Build a snowman statue at least 10 blocks tall with a top hat.", tip: "Coal blocks for the eyes and buttons, an orange terracotta nose." },
    hard: { title: "Snow Titan", challenge: "Build a snowman at least 30 blocks tall with arms, a scarf and a hollow room inside.", tip: "Build each round layer from the middle outward." },
  },
  {
    type: "build",
    easy: { title: "Ornament Tree", challenge: "Decorate a spruce with glowstone, sea lanterns and colored wool ornaments.", tip: "Mix light sources so the tree glows at night." },
    medium: { title: "Home-Grown Tree", challenge: "Build your own 15-block tree from spruce logs and leaves, with ornaments and a star.", tip: "Leaves you place yourself never decay." },
    hard: { title: "Town Square Tree", challenge: "Build a 40-block tree in a village whose lights turn on by themselves at night.", tip: "Right-click a daylight detector to invert it." },
  },
  {
    type: "explore",
    easy: { title: "Home-Made Igloo", challenge: "Build your own igloo dome from snow blocks with a bed inside.", tip: "Leave a small tunnel as the door." },
    medium: { title: "Igloo Hunt", challenge: "Find an igloo. If it has a trapdoor, explore the basement.", tip: "Basements hide under the carpet. Break it to check." },
    hard: { title: "Basement Rescue", challenge: "Find an igloo basement and cure the zombie villager inside.", tip: "The basement holds a weakness potion and a golden apple." },
  },
  {
    type: "build",
    easy: { title: "Wrapped Presents", challenge: "Build 6 giant presents from concrete with a contrasting ribbon on each.", tip: "Use a different ribbon color on each box." },
    medium: { title: "Gift Pile", challenge: "Build 10 presents in 3 different sizes, piled under your tree.", tip: "Mixed sizes make the pile look natural." },
    hard: { title: "Mega Gift", challenge: "Build a hollow present 20 blocks wide with a giant bow on top and a secret room inside.", tip: "Hide the entrance under a carpet." },
  },
  {
    type: "survive",
    easy: { title: "Snowy Patrol", challenge: "Defeat 3 hostile mobs in a snowy biome.", tip: "Bring a sword and a shield." },
    medium: { title: "Frozen Archers", challenge: "Defeat 5 strays, the frozen skeletons that spawn in snowy biomes.", tip: "Their arrows give Slowness. Carry a shield." },
    hard: { title: "Frozen Army", challenge: "Defeat 15 strays using only a bow.", tip: "Strays can drop Slowness arrows. Save them." },
  },
  {
    type: "redstone",
    easy: { title: "Lamp Post", challenge: "Wire a redstone lamp to a lever and switch it on.", tip: "Redstone dust carries power up to 15 blocks." },
    medium: { title: "Twinkle Lights", challenge: "Build a redstone clock that makes a row of redstone lamps flash on and off.", tip: "Two repeaters and a comparator loop make a simple clock." },
    hard: { title: "Light Show", challenge: "Build a row of 20 lamps that light up one after another in a chase.", tip: "A loop of repeaters carrying a single pulse makes lights chase." },
  },
  {
    type: "build",
    easy: { title: "Fireplace", challenge: "Build an indoor fireplace with a mantel and a fire that never goes out.", tip: "Netherrack burns forever. Keep wood well away from it." },
    medium: { title: "Stone Hearth", challenge: "Build a stone-brick hearth with a chimney that rises above your roof, and smoke coming out of it.", tip: "Soul campfires burn blue for a wintry look." },
    hard: { title: "Great Hall", challenge: "Build a great hall with a fireplace you can light and put out with a lever.", tip: "A dispenser holding flint and steel can light netherrack." },
  },
  {
    type: "explore",
    easy: { title: "Frozen Find", challenge: "Find a frozen lake or river and walk across the ice.", tip: "Ice is slippery, so take it slow." },
    medium: { title: "Spike Climb", challenge: "Travel to an ice spikes biome and climb to the top of any spike.", tip: "Carry a water bucket in case you slip." },
    hard: { title: "Ice Spikes", challenge: "Travel to an ice spikes biome and build a lookout on top of a spike.", tip: "Packed ice drops nothing without Silk Touch." },
  },
  {
    type: "explore",
    easy: { title: "Snow Bunny", challenge: "Find a rabbit in a snowy biome and feed it a carrot.", tip: "Rabbits are skittish, so hold the carrot and let them come to you." },
    medium: { title: "Polar Encounter", challenge: "Find a polar bear and walk away without angering it.", tip: "Mothers with cubs attack if you get close." },
    hard: { title: "Arctic Safari", challenge: "Find a polar bear, a fox and a stray in a single trip without going home.", tip: "Foxes are most active at night." },
  },
  {
    type: "build",
    easy: { title: "Treetop Perch", challenge: "Build a small platform 10 blocks up a tree with a ladder.", tip: "Add a fence so you don't step off." },
    medium: { title: "Treehouse Lodge", challenge: "Build a treehouse lodge with a rope bridge and a lantern-lit deck.", tip: "Chains work well as bridge ropes." },
    hard: { title: "Canopy Village", challenge: "Build 3 treehouses joined by rope bridges, with a watchtower above them.", tip: "Giant spruce trees give you the most room." },
  },
  // December
  {
    type: "survive",
    easy: { title: "Cookie Snack", challenge: "Bake 8 cookies.", tip: "Two wheat and one cocoa bean make 8 cookies." },
    medium: { title: "Cookie Day", challenge: "Bake 32 cookies with cocoa beans and wheat.", tip: "Cocoa grows on jungle logs. Plant a few pods." },
    hard: { title: "Cookie Factory", challenge: "Build cocoa and wheat farms, then bake 128 cookies from your own harvest.", tip: "Flowing water can sweep a harvest into a hopper." },
  },
  {
    type: "survive",
    easy: { title: "Horse Friend", challenge: "Tame one horse and ride it around your base.", tip: "Keep mounting until hearts appear." },
    medium: { title: "Reindeer Stable", challenge: "Tame two horses and name one Rudolph with a name tag. Build them a stable.", tip: "Name tags come from fishing, chests and librarian trades." },
    hard: { title: "The Full Team", challenge: "Tame eight horses, name each one after a reindeer, and build a stable for them all.", tip: "An anvil is the tool for naming tags." },
  },
  {
    type: "redstone",
    easy: { title: "First Rails", challenge: "Lay 30 rails and ride a minecart to the end.", tip: "A block at the end of the line stops the cart." },
    medium: { title: "Holiday Express", challenge: "Build a minecart rail line from your base to the village.", tip: "Powered rails every 34 blocks keep a cart at full speed." },
    hard: { title: "Rail Network", challenge: "Connect 3 locations with powered rail and build a station at each stop.", tip: "A button beside a powered rail launches a waiting cart." },
  },
  {
    type: "explore",
    easy: { title: "Iron Haul", challenge: "Mine 8 iron ore and smelt it.", tip: "Look for orange flecks in cave walls." },
    medium: { title: "Gift to Yourself", challenge: "Mine 5 diamonds.", tip: "Diamonds are most common deep down, around Y -58." },
    hard: { title: "Ancient Gift", challenge: "Mine ancient debris in the Nether and forge a netherite ingot.", tip: "Debris is most common around Y 15. An ingot takes 4 scrap and 4 gold." },
  },
  {
    type: "redstone",
    easy: { title: "Three Notes", challenge: "Place 3 note blocks and tune them to a rising scale.", tip: "Right-click a note block to raise its pitch." },
    medium: { title: "Jingle Loop", challenge: "Play a 4-note jingle on repeat, wired with repeaters.", tip: "Repeater delay sets the tempo." },
    hard: { title: "Note Block Carol", challenge: "Play a holiday melody on at least 8 note blocks.", tip: "Gold blocks under note blocks make a bell sound." },
  },
  {
    type: "festive",
    easy: { title: "Secret Santa", challenge: "Hide a chest of gifts somewhere and leave a sign with a riddle that leads to it.", tip: "Great for a friend on your server." },
    medium: { title: "Treasure Trail", challenge: "Hide a chest and leave 3 signs with clues along a path to it.", tip: "Each clue should point to a landmark." },
    hard: { title: "Grand Hunt", challenge: "Set a hunt with 5 clues across your world, ending at a chest behind a redstone puzzle.", tip: "Use a cartography table to copy a map for each clue." },
  },
  {
    type: "build",
    easy: { title: "Mini Cane", challenge: "Build a candy cane 5 blocks tall in red and white stripes.", tip: "Alternate colors on every block." },
    medium: { title: "Candy Cane Tower", challenge: "Build a candy cane at least 15 blocks tall with a red and white spiral.", tip: "Plan the spiral on graph paper or build it layer by layer." },
    hard: { title: "Candy Cane Forest", challenge: "Build 5 candy canes of different sizes along a lit path, the tallest at least 30 blocks.", tip: "Finish the spiral on the biggest one first." },
  },
  {
    type: "survive",
    easy: { title: "Wool Season", challenge: "Shear sheep until you have a full stack of white wool.", tip: "Two sheep and wheat give you a breeding loop." },
    medium: { title: "Rainbow Flock", challenge: "Dye 6 sheep different colors and keep them in one pen.", tip: "Sheep keep their color, and lambs can inherit it." },
    hard: { title: "Auto Shear", challenge: "Build an automatic wool farm using a dispenser, shears and an observer.", tip: "An observer can see wool grow back on a sheep." },
  },
  {
    type: "ice",
    easy: { title: "Ice Cottage", challenge: "Build a one-room cottage from snow blocks with ice windows.", tip: "Keep torches away from regular ice." },
    medium: { title: "Frost Tower", challenge: "Build a tower 20 blocks tall from packed ice with a spiral staircase.", tip: "Packed ice won't melt near light." },
    hard: { title: "Ice Palace", challenge: "Build a palace from packed ice and blue ice with at least two towers.", tip: "Sea lanterns hidden in the floor make the ice glow." },
  },
  {
    type: "nether",
    easy: { title: "Snowball Drill", challenge: "Hit 5 different kinds of mob with snowballs.", tip: "Snowballs barely hurt most mobs, but they do push them back." },
    medium: { title: "Nether Visit", challenge: "Build a Nether portal and bring back 8 Nether quartz.", tip: "Pour water over a lava pool to make obsidian." },
    hard: { title: "Nether Snowball Fight", challenge: "Defeat 5 blazes using only snowballs.", tip: "Each snowball hits a blaze for 3 damage." },
  },
  {
    type: "ice",
    easy: { title: "Snow Slide", challenge: "Build a 10-block slope of snow or ice and slide down it in a boat.", tip: "Steps of one block keep the boat moving." },
    medium: { title: "Sledding Hill", challenge: "Build a snowy slope with a boat or minecart run from top to bottom.", tip: "A boat slides down slopes fast on ice." },
    hard: { title: "Mountain Run", challenge: "Build a 100-block run from a mountaintop to the valley, with both ice and rail sections.", tip: "Light every stretch so nothing spawns on the track." },
  },
  {
    type: "survive",
    easy: { title: "Warm Boots", challenge: "Craft a pair of leather or iron boots and wear them all day.", tip: "Leather boots also keep you on top of powder snow." },
    medium: { title: "First Enchant", challenge: "Build an enchanting table and enchant a pair of boots.", tip: "Bookshelves around the table unlock stronger enchantments." },
    hard: { title: "Frost Walker", challenge: "Get a pair of boots enchanted with Frost Walker and walk across a lake.", tip: "Look for it on enchanted books from librarians or in loot." },
  },
  {
    type: "build",
    easy: { title: "Warm Bath", challenge: "Build a 3×3 stone pool with a campfire beside it.", tip: "A smooth stone rim looks tidy." },
    medium: { title: "Hot Spring", challenge: "Build a hot spring spa with steam rising from magma blocks under the water.", tip: "Magma under water creates bubble columns that pull you down." },
    hard: { title: "Spa Resort", challenge: "Build a resort with pools on two levels, a sauna, and a bubble elevator between them.", tip: "Soul sand pushes you up and magma pulls you down." },
  },
  {
    type: "build",
    easy: { title: "Porch Lights", challenge: "Hang lanterns on 3 houses in a village.", tip: "Hang them from fences for a porch-light look." },
    medium: { title: "Village Lights", challenge: "Hang at least one lantern on every house in a village.", tip: "Villagers will thank you by fewer zombie raids." },
    hard: { title: "Festival of Lights", challenge: "Light every building in a village and wire the lamps to turn on at dusk.", tip: "A daylight detector and buried redstone keep the wires hidden." },
  },
  {
    type: "explore",
    easy: { title: "Peak Bagger", challenge: "Climb a snowy peak and plant a banner at the top.", tip: "Bring a stack of blocks to bridge the gaps." },
    medium: { title: "Goat Herder", challenge: "Find goats on a snowy peak and breed two of them with wheat.", tip: "Goats can ram you off a ledge, so stay away from edges." },
    hard: { title: "Goat Horn", challenge: "Find a goat on a snowy peak and get it to drop a goat horn.", tip: "Goats ram stone, logs or ore and drop horns when they hit." },
  },
  {
    type: "build",
    easy: { title: "Santa's Mailroom", challenge: "Build a post office with barrels as mail slots and item frames for labels.", tip: "Signs over each barrel can name your friends or villagers." },
    medium: { title: "Mail Route", challenge: "Build a hopper line that sends items from one barrel to another.", tip: "Hoppers pull from the container above them." },
    hard: { title: "Sorting Office", challenge: "Build a sorter with hoppers and comparators that sends 4 item types to their own chests.", tip: "Filter slots in each hopper decide what passes through." },
  },
  {
    type: "survive",
    easy: { title: "Stone Age Dash", challenge: "Craft a full set of stone tools within one in-game day.", tip: "Punch a tree first and go straight for stone." },
    medium: { title: "Iron Dash", challenge: "Craft an iron pickaxe, sword and shield within one in-game day.", tip: "A shield needs one iron ingot and six planks." },
    hard: { title: "Speed Run", challenge: "Gather a full set of iron armor within one in-game day.", tip: "Caves with exposed iron save the most time." },
  },
  {
    type: "build",
    easy: { title: "First Stall", challenge: "Build one decorated market stall with a roof and a sign.", tip: "Trapdoors make good counters." },
    medium: { title: "Christmas Market", challenge: "Build a market square with at least 5 decorated stalls.", tip: "Different roof colors make each stall stand out." },
    hard: { title: "Village Fair", challenge: "Build a market of 10 stalls with a stage and a lit tree, with villagers working in it.", tip: "Job blocks at the stalls draw villagers in." },
  },
  {
    type: "redstone",
    easy: { title: "Hidden Room", challenge: "Dig a small room and hide the entrance behind a painting.", tip: "You can walk straight through a painting." },
    medium: { title: "Hillside Den", challenge: "Build a room in a hillside behind an iron door with a hidden lever.", tip: "Iron doors only open with redstone." },
    hard: { title: "Grinch Lair", challenge: "Build a hidden lair inside a mountain that overlooks a village.", tip: "A piston door adds a proper secret entrance." },
  },
  {
    type: "build",
    easy: { title: "Family Meal", challenge: "Set a table with 5 different foods.", tip: "Item frames on slabs look like plates." },
    medium: { title: "Banquet Hall", challenge: "Build a feast table and set out 20 different foods in item frames or on campfires.", tip: "Campfires can cook four raw items at a time." },
    hard: { title: "Grand Feast", challenge: "Build a two-floor hall with a kitchen, and set out at least 30 different foods.", tip: "A smoker cooks food twice as fast as a furnace." },
  },
  {
    type: "survive",
    easy: { title: "Fireside Night", challenge: "Spend one night outside in full armor beside a campfire.", tip: "Light the area around you first." },
    medium: { title: "Dusk to Dawn", challenge: "Survive one full night outside wearing only leather armor.", tip: "Bring a shield and plenty of food." },
    hard: { title: "Solstice Night", challenge: "Survive the longest night: one full night outside without armor.", tip: "Start with full health and a shield, and stay near light." },
  },
  {
    type: "build",
    easy: { title: "Tiny Globe", challenge: "Build a 5×5 glass box around a small snowy tree.", tip: "Place glass last so you have room to work." },
    medium: { title: "Glass Dome", challenge: "Build a glass dome 11 blocks wide over a snowy tree.", tip: "Build it one ring at a time." },
    hard: { title: "Snow Globe", challenge: "Build a glass dome with a tiny snowy village inside.", tip: "Use a dome generator plan or build it in rings." },
  },
  {
    type: "redstone",
    easy: { title: "First Sparks", challenge: "Launch 3 rockets by hand at dusk.", tip: "Right-click the ground to launch." },
    medium: { title: "Dispenser Salute", challenge: "Launch 5 rockets at once with dispensers and a button.", tip: "Dispensers facing up fire rockets straight into the sky." },
    hard: { title: "Fireworks Show", challenge: "Launch 20 rockets at once with dispensers and a redstone button.", tip: "Dispensers facing up shoot rockets straight into the sky." },
  },
  {
    type: "festive",
    easy: { title: "Stockings Up", challenge: "Hang 4 stockings over your fireplace.", tip: "Red banners with a white top border look like stockings." },
    medium: { title: "Christmas Eve", challenge: "Put a sleigh on your roof and hang 4 stockings over the fireplace.", tip: "Red banners with a white top border look like stockings." },
    hard: { title: "Santa's Visit", challenge: "Build a roof sleigh, a chimney drop that delivers thrown gifts into a chest, and a lit tree indoors.", tip: "A hopper at the bottom of the chimney feeds the chest." },
  },
  {
    type: "festive",
    easy: { title: "Christmas Day", challenge: "Tour every build from this calendar and put a gold block star on top of your tallest tree.", tip: "Take a screenshot from above to remember your winter world." },
    medium: { title: "Christmas Morning", challenge: "Fill a chest under your tree with one item from 10 different builds in this calendar.", tip: "Keep a shulker box or bundle handy for the tour." },
    hard: { title: "Grand Finale", challenge: "Tour every build, put a gold block star on your tallest tree, then launch a firework finale from it.", tip: "Save your rockets from the Firework Factory day." },
  },
];
