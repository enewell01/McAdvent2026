export type ChallengeType = "build" | "survive" | "explore" | "ice" | "redstone" | "nether" | "festive";
export type Difficulty = 1 | 2 | 3;

export interface Challenge {
  title: string;
  challenge: string;
  tip: string;
  type: ChallengeType;
  difficulty: Difficulty;
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

export const DIFFICULTY_LABELS: Record<Difficulty, string> = { 1: "Easy", 2: "Medium", 3: "Hard" };

// One entry per door, in date order: entry 0 is Nov 1, entry 54 is Dec 25.
export const CHALLENGES: Challenge[] = [
  // November
  { title: "Cozy Cabin", challenge: "Build a spruce log cabin with a stone-brick chimney. Put a campfire at the top so it smokes.", tip: "Hay bale under the campfire makes the smoke rise twice as high.", type: "build", difficulty: 1 },
  { title: "Winter Home", challenge: "Find a snowy taiga or snowy plains biome and set your bed and base there for the season.", tip: "Bring a few stacks of torches. Snow builds up on unlit blocks.", type: "explore", difficulty: 1 },
  { title: "Snowball Stockpile", challenge: "Collect 64 snowballs with a shovel, then craft them into 16 snow blocks.", tip: "A Silk Touch shovel drops snow layers instead of snowballs.", type: "survive", difficulty: 1 },
  { title: "Loyal Companion", challenge: "Tame a wolf with bones and dye its collar red.", tip: "Right-click the tamed wolf with red dye to recolor the collar.", type: "survive", difficulty: 1 },
  { title: "Sleigh Workshop", challenge: "Build a sleigh from stairs, slabs and trapdoors, big enough to sit in.", tip: "Put a minecart or boat inside so you can actually sit down.", type: "build", difficulty: 1 },
  { title: "Tree Farm", challenge: "Grow 10 spruce trees from saplings. Grow at least one giant 2×2 spruce.", tip: "Giant spruce needs four saplings in a square and room above.", type: "survive", difficulty: 2 },
  { title: "Frosty Friend", challenge: "Build a snow golem from two snow blocks and a carved pumpkin.", tip: "Shear the pumpkin face off to see what's underneath.", type: "build", difficulty: 1 },
  { title: "Holiday Fishing", challenge: "Catch 10 cod for the holiday feast.", tip: "Rain improves your fishing speed.", type: "survive", difficulty: 1 },
  { title: "Lantern Road", challenge: "Light a path of 25 lanterns from your base to the nearest village.", tip: "Hang lanterns under fences or chains for a street-lamp look.", type: "build", difficulty: 2 },
  { title: "Festive Flags", challenge: "Design a red and green banner on a loom and hang 12 copies around your base.", tip: "Copy a banner by combining it with a blank banner of the same color.", type: "build", difficulty: 1 },
  { title: "Gingerbread House", challenge: "Build a gingerbread house: brown terracotta walls with white concrete frosting.", tip: "Red and white concrete stripes make candy-cane corners.", type: "build", difficulty: 2 },
  { title: "Long Cold Night", challenge: "Survive one full night outside in a snowy biome without sleeping.", tip: "Light up a perimeter first, then stand your ground.", type: "survive", difficulty: 2 },
  { title: "Powder Trap", challenge: "Find powder snow and collect a bucketful. Wear leather boots to walk on it.", tip: "Look on snowy slopes and grove biomes, or use a cauldron during snowfall.", type: "ice", difficulty: 2 },
  { title: "Bake a Cake", challenge: "Bake a cake from milk, sugar, eggs and wheat.", tip: "Chickens and cows near a farm make this a quick one.", type: "survive", difficulty: 1 },
  { title: "Elf Workshop", challenge: "Build a toy workshop with a crafting table, loom, cartography table and smithing table.", tip: "Give each station its own little bench with item frames above.", type: "build", difficulty: 2 },
  { title: "Gift Exchange", challenge: "Complete trades with 5 different villagers.", tip: "Fletchers buy sticks, an easy early trade.", type: "survive", difficulty: 1 },
  { title: "Frozen Pond", challenge: "Make a frozen pond in front of your base and add benches around it.", tip: "Frost Walker boots can freeze water for you later in the month.", type: "ice", difficulty: 1 },
  { title: "Ice Boat Race", challenge: "Build a 50-block ice boat track out of packed ice with walls and a finish line.", tip: "Blue ice is faster than packed ice if you find some.", type: "ice", difficulty: 2 },
  { title: "Holly and Berries", challenge: "Gather a stack of sweet berries and 16 glow berries.", tip: "Glow berries grow in lush caves underground.", type: "explore", difficulty: 2 },
  { title: "Firework Factory", challenge: "Craft 16 firework rockets with colored stars.", tip: "Creepers drop gunpowder, so wait for nightfall.", type: "survive", difficulty: 2 },
  { title: "Giant Snowman", challenge: "Build a snowman statue at least 10 blocks tall with a top hat.", tip: "Coal blocks for the eyes and buttons, an orange terracotta nose.", type: "build", difficulty: 2 },
  { title: "Ornament Tree", challenge: "Decorate a spruce with glowstone, sea lanterns and colored wool ornaments.", tip: "Mix light sources so the tree glows at night.", type: "build", difficulty: 1 },
  { title: "Igloo Hunt", challenge: "Find an igloo. If it has a trapdoor, explore the basement.", tip: "Basements hide under the carpet. Break it to check.", type: "explore", difficulty: 2 },
  { title: "Wrapped Presents", challenge: "Build 6 giant presents from concrete with a contrasting ribbon on each.", tip: "Use a different ribbon color on each box.", type: "build", difficulty: 1 },
  { title: "Frozen Archers", challenge: "Defeat 5 strays, the frozen skeletons that spawn in snowy biomes.", tip: "Their arrows give Slowness. Carry a shield.", type: "survive", difficulty: 2 },
  { title: "Twinkle Lights", challenge: "Build a redstone clock that makes a row of redstone lamps flash on and off.", tip: "Two repeaters and a comparator loop make a simple clock.", type: "redstone", difficulty: 2 },
  { title: "Fireplace", challenge: "Build an indoor fireplace with a mantel and a fire that never goes out.", tip: "Netherrack burns forever. Keep wood well away from it.", type: "build", difficulty: 1 },
  { title: "Ice Spikes", challenge: "Travel to an ice spikes biome and build a lookout on top of a spike.", tip: "Packed ice drops nothing without Silk Touch.", type: "explore", difficulty: 3 },
  { title: "Polar Encounter", challenge: "Find a polar bear and walk away without angering it.", tip: "Mothers with cubs attack if you get close.", type: "explore", difficulty: 2 },
  { title: "Treehouse Lodge", challenge: "Build a treehouse lodge with a rope bridge and a lantern-lit deck.", tip: "Chains work well as bridge ropes.", type: "build", difficulty: 2 },
  // December
  { title: "Cookie Day", challenge: "Bake 32 cookies with cocoa beans and wheat.", tip: "Cocoa grows on jungle logs. Plant a few pods.", type: "survive", difficulty: 2 },
  { title: "Reindeer Stable", challenge: "Tame two horses and name one Rudolph with a name tag. Build them a stable.", tip: "Name tags come from fishing, chests and librarian trades.", type: "survive", difficulty: 2 },
  { title: "Holiday Express", challenge: "Build a minecart rail line from your base to the village.", tip: "Powered rails every 34 blocks keep a cart at full speed.", type: "redstone", difficulty: 2 },
  { title: "Gift to Yourself", challenge: "Mine 5 diamonds.", tip: "Diamonds are most common deep down, around Y -58.", type: "explore", difficulty: 2 },
  { title: "Note Block Carol", challenge: "Play a holiday melody on at least 8 note blocks.", tip: "Gold blocks under note blocks make a bell sound.", type: "redstone", difficulty: 3 },
  { title: "Secret Santa", challenge: "Hide a chest of gifts somewhere and leave a sign with a riddle that leads to it.", tip: "Great for a friend on your server.", type: "festive", difficulty: 1 },
  { title: "Candy Cane Tower", challenge: "Build a candy cane at least 15 blocks tall with a red and white spiral.", tip: "Plan the spiral on graph paper or build it layer by layer.", type: "build", difficulty: 2 },
  { title: "Wool Season", challenge: "Shear sheep until you have a full stack of white wool.", tip: "Two sheep and wheat give you a breeding loop.", type: "survive", difficulty: 1 },
  { title: "Ice Palace", challenge: "Build a palace from packed ice and blue ice with at least two towers.", tip: "Sea lanterns hidden in the floor make the ice glow.", type: "ice", difficulty: 3 },
  { title: "Nether Snowball Fight", challenge: "Defeat 5 blazes using only snowballs.", tip: "Each snowball hits a blaze for 3 damage.", type: "nether", difficulty: 3 },
  { title: "Sledding Hill", challenge: "Build a snowy slope with a boat or minecart run from top to bottom.", tip: "A boat slides down slopes fast on ice.", type: "ice", difficulty: 2 },
  { title: "Frost Walker", challenge: "Get a pair of boots enchanted with Frost Walker and walk across a lake.", tip: "Look for it on enchanted books from librarians or in loot.", type: "survive", difficulty: 3 },
  { title: "Hot Spring", challenge: "Build a hot spring spa with steam rising from magma blocks under the water.", tip: "Magma under water creates bubble columns that pull you down.", type: "build", difficulty: 2 },
  { title: "Village Lights", challenge: "Hang at least one lantern on every house in a village.", tip: "Villagers will thank you by fewer zombie raids.", type: "build", difficulty: 2 },
  { title: "Goat Horn", challenge: "Find a goat on a snowy peak and get it to drop a goat horn.", tip: "Goats ram stone, logs or ore and drop horns when they hit.", type: "explore", difficulty: 3 },
  { title: "Santa's Mailroom", challenge: "Build a post office with barrels as mail slots and item frames for labels.", tip: "Signs over each barrel can name your friends or villagers.", type: "build", difficulty: 1 },
  { title: "Speed Run", challenge: "Gather a full set of iron armor within one in-game day.", tip: "Caves with exposed iron save the most time.", type: "survive", difficulty: 3 },
  { title: "Christmas Market", challenge: "Build a market square with at least 5 decorated stalls.", tip: "Different roof colors make each stall stand out.", type: "build", difficulty: 2 },
  { title: "Grinch Lair", challenge: "Build a hidden lair inside a mountain that overlooks a village.", tip: "A piston door adds a proper secret entrance.", type: "redstone", difficulty: 3 },
  { title: "Banquet Hall", challenge: "Build a feast table and set out 20 different foods in item frames or on campfires.", tip: "Campfires can cook four raw items at a time.", type: "build", difficulty: 2 },
  { title: "Solstice Night", challenge: "Survive the longest night: one full night outside without armor.", tip: "Start with full health and a shield, and stay near light.", type: "survive", difficulty: 3 },
  { title: "Snow Globe", challenge: "Build a glass dome with a tiny snowy village inside.", tip: "Use a dome generator plan or build it in rings.", type: "build", difficulty: 3 },
  { title: "Fireworks Show", challenge: "Launch 20 rockets at once with dispensers and a redstone button.", tip: "Dispensers facing up shoot rockets straight into the sky.", type: "redstone", difficulty: 3 },
  { title: "Christmas Eve", challenge: "Put a sleigh on your roof and hang 4 stockings over the fireplace.", tip: "Red banners with a white top border look like stockings.", type: "festive", difficulty: 2 },
  { title: "Christmas Day", challenge: "Tour every build from this calendar and put a gold block star on top of your tallest tree.", tip: "Take a screenshot from above to remember your winter world.", type: "festive", difficulty: 1 },
];
