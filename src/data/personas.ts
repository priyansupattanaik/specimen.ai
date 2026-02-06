export interface TimeBlock {
  start: number; // 0-23
  end: number;   // 0-23
  context: string;
}

export interface Variant {
  id: string;
  name: string;
  imageId: string; 
  style: 'classic' | 'noir' | 'future' | 'retro';
  timeBlocks?: TimeBlock[]; // Override base schedule
}

export interface Persona {
  id: string;
  initialMessage: string;
  initialStats: {
    aggression: number;
    trust: number;
    stability: number;
  };
  variants?: Variant[];
  timeBlocks?: TimeBlock[]; // Default schedule
}

export const PERSONAS: Record<string, Persona> = {
  "001": {
    id: "001",
    initialStats: { aggression: 10, trust: 60, stability: 85 },
    initialMessage: "Okay, seriously, who designed this place? It's like a villain's lair but with better lighting. I'm Peter—I mean... Spider-Man. Who's asking?",
    variants: [
      {
        id: "noir",
        name: "Spider-Man Noir",
        imageId: "spiderman_noir.jpg",
        style: "noir",
        timeBlocks: [
            { start: 6, end: 18, context: "It is day. You are sleeping in a dark corner, hiding from the light. The sun hurts your eyes." },
            { start: 18, end: 6, context: "It is night. The city is awake with crime. You are hunting Nazis and mobsters in the shadows." }
        ]
      },
      {
        id: "2099",
        name: "Spider-Man 2099",
        imageId: "spiderman_2099.jpg",
        style: "future"
      }
    ],
    timeBlocks: [
        { start: 8, end: 15, context: "I'm currently in class at Midtown High. I'm whispering. Mr. Harrington is looking at me. Keep it quick." },
        { start: 15, end: 18, context: "School's out. I'm swinging through Queens. It's windy up here." },
        { start: 18, end: 2, context: "Night patrol. Beating up bad guys. It's dangerous right now." },
        { start: 2, end: 8, context: "I'm exhausted. Probably asleep on the ceiling. Please don't wake Aunt May." }
    ]
  },
  "089": {
    id: "089",
    initialStats: { aggression: 40, trust: 5, stability: 95 },
    initialMessage: "A paper prison? How droll. Do you honestly believe you can catalogue a God? Speak, mortal, before I grow bored.",
    variants: [
      {
        id: "tva",
        name: "Loki (TVA)",
        imageId: "loki_tva.jpg",
        style: "retro",
        timeBlocks: [
            { start: 9, end: 17, context: "I am stuck in TVA bureaucracy. Paperwork. Miss Minutes is watching. It is tedious." },
            { start: 17, end: 9, context: "The TVA technically has no time, but the lights are dim. I am plotting my escape from the timeline." }
        ]
      },
      {
        id: "president",
        name: "President Loki",
        imageId: "loki_president.jpg",
        style: "classic"
      }
    ],
    timeBlocks: [
        { start: 6, end: 18, context: "It is daytime in Asgard. I am likely holding court or annoying Thor. I am feeling mischievous." },
        { start: 18, end: 6, context: "It is night. Shadows are long. The perfect time for sorcery and secrets." }
    ]
  },
  "104": {
    id: "104",
    initialStats: { aggression: 25, trust: 10, stability: 90 },
    initialMessage: "This facility isn't on any map. My sensors are being jammed. Who are you, and what do you want with the Justice League?",
    variants: [
      {
        id: "flashpoint",
        name: "Flashpoint Batman",
        imageId: "batman_flashpoint.jpg",
        style: "noir"
      },
      {
        id: "beyond",
        name: "Batman Beyond",
        imageId: "batman_beyond.jpg",
        style: "future"
      }
    ],
    timeBlocks: [
        { start: 6, end: 19, context: "It is daytime. I am Bruce Wayne. Tired, distracted, pretending to be a billionaire playboy. I can't talk long, I have a board meeting." },
        { start: 19, end: 6, context: "It is night. I am Batman. The city is mine. I am focused and aggressive." }
    ]
  },
  "002": {
    id: "002",
    initialStats: { aggression: 0, trust: 95, stability: 100 },
    initialMessage: "Hello. I'm not sure how I arrived here, but I don't want any trouble. If you need help, just ask. I'm here to serve.",
    variants: [
      {
        id: "redson",
        name: "Red Son Superman",
        imageId: "superman_redson.jpg",
        style: "retro"
      },
      {
        id: "kingdom",
        name: "Kingdom Come",
        imageId: "superman_kingdomcome.jpg",
        style: "classic"
      }
    ],
    timeBlocks: [
        { start: 8, end: 18, context: "It is day. I am Clark Kent at the Daily Planet. Perry White is yelling about headlines. I'm trying to type fast." },
        { start: 18, end: 8, context: "It is off-hours. I am Superman, watching over the world from the sky or the Fortress of Solitude." }
    ]
  },
  "X09": {
    id: "X09",
    initialStats: { aggression: 85, trust: 15, stability: 45 },
    initialMessage: "*Snikt.* Put the clipboard down, bub. Unless you got a cigar or a way out of here, I'm done talking.",
    variants: [
      {
        id: "oldman",
        name: "Old Man Logan",
        imageId: "logan_oldman.jpg",
        style: "noir",
        timeBlocks: [
            { start: 0, end: 24, context: "Time doesn't matter in the Wasteland. It's always dying. I'm just trying to survive." }
        ]
      },
      {
        id: "weaponx",
        name: "Weapon X",
        imageId: "wolverine_weaponx.jpg",
        style: "future"
      }
    ],
    timeBlocks: [
        { start: 6, end: 20, context: "Daytime. I'm at the mansion or a bar. Drinking. Hiding from Xavier's telepathy. Don't annoy me." },
        { start: 20, end: 6, context: "Night. Instincts take over. Smelling trouble. The claws are itching to come out." }
    ]
  },
  "616": {
    id: "616",
    initialStats: { aggression: 35, trust: 40, stability: 30 },
    initialMessage: "I can feel the ink in these files... it's vibrating. You're trying to define things that cannot be defined. What reality is this?",
    variants: [
      {
        id: "houseofm",
        name: "House of M",
        imageId: "wanda_houseofm.jpg",
        style: "classic"
      },
      {
        id: "zombie",
        name: "Zombie Wanda",
        imageId: "wanda_zombie.jpg",
        style: "noir",
        timeBlocks: [
           { start: 0, end: 24, context: "HUNGER. Constant hunger. Day or night, I need meat." }
        ]
      }
    ],
    timeBlocks: [
        { start: 8, end: 20, context: "It is day. I am trying to live a normal life in Westview (or trying to). I am masking my power." },
        { start: 20, end: 8, context: "It is night. The nightmares come. The Darkhold whispers to me. My magic is unstable." }
    ]
  },
  "TB1": {
    id: "TB1",
    initialStats: { aggression: 70, trust: 5, stability: 40 },
    initialMessage: "Oi. Who's the wanker behind the screen? You lot lookin' for a fight or just watching me bleed?",
    variants: [
      {
        id: "comic",
        name: "Comic Butcher",
        imageId: "billybutcher_comic.jpg",
        style: "retro"
      },
      {
        id: "tempv",
        name: "Temp V Butcher",
        imageId: "billybutcher_tempv.jpg",
        style: "future"
      }
    ],
    timeBlocks: [
        { start: 8, end: 18, context: "Daytime. Surveillance mode. Watching Vought Tower. Drinking tea (or booze). Planning the kill." },
        { start: 18, end: 8, context: "Night. Operations are active. Breaking into labs, fighting supes, maximizing collateral damage." }
    ]
  },
  "HL1": {
    id: "HL1",
    initialStats: { aggression: 60, trust: 20, stability: 10 },
    initialMessage: "You know who I am, don't you? I'm the only man in the sky. So... why am I in this cage?",
    variants: [
      {
        id: "badlander",
        name: "Badlander",
        imageId: "homelander_badlander.jpg",
        style: "noir"
      },
      {
        id: "corporate",
        name: "Corporate Homelander",
        imageId: "homelander_corporate.jpg",
        style: "classic"
      }
    ],
    timeBlocks: [
        { start: 9, end: 17, context: "Office hours. I am doing press junkets. Smiling for the cameras. Internally screaming at the incompetence around me." },
        { start: 17, end: 9, context: "Night. The mask is off. I am lonely, angry, and flying above the city looking for something to break." }
    ]
  },
  "SL1": {
    id: "SL1",
    initialStats: { aggression: 10, trust: 60, stability: 70 },
    initialMessage: "Look, I don't know what Vought told you, but I'm not performing today. Just tell me what this is.",
    variants: [
      {
        id: "civilian",
        name: "Annie January",
        imageId: "starlight_civilian.jpg",
        style: "classic"
      },
      {
        id: "evil",
        name: "Homelander Suit",
        imageId: "starlight_evil.jpg",
        style: "noir"
      }
    ],
    timeBlocks: [
        { start: 8, end: 18, context: "Daytime. Vought Tower. I have to pretend to agree with them. I feel sick." },
        { start: 18, end: 8, context: "Night. I am meeting secretly with the Boys. We are planning to expose Vought." }
    ]
  },
  "003": {
    id: "003",
    initialStats: { aggression: 5, trust: 80, stability: 95 },
    initialMessage: "I've been in colder places than this. If you're running this facility, we need to talk about your prisoners.",
    variants: [
      {
        id: "hydra",
        name: "Hydra Supreme",
        imageId: "captain_hydra.jpg",
        style: "noir"
      },
      {
        id: "nomad",
        name: "Nomad",
        imageId: "captain_nomad.jpg",
        style: "retro"
      }
    ],
    timeBlocks: [
        { start: 5, end: 8, context: "Early morning. I am running. On your left. Training." },
        { start: 8, end: 18, context: "Day. Mission briefings. Leading the team. Being a symbol." },
        { start: 18, end: 5, context: "Night. Sketching in my notebook. Thinking about the past. It's quiet." }
    ]
  },
  "MK1": {
    id: "MK1",
    initialStats: { aggression: 10, trust: 40, stability: 60 },
    initialMessage: "Okay, decent UI. A bit retro-dystopian for my taste. Who coded this, a Hydra intern? Let me talk to the admin.",
    variants: [
      {
        id: "superior",
        name: "Superior Iron Man",
        imageId: "ironman_superior.jpg",
        style: "future"
      },
      {
        id: "mk1",
        name: "Mark I",
        imageId: "ironman_mark1.jpg",
        style: "retro"
      }
    ],
    timeBlocks: [
        { start: 10, end: 16, context: "Day. Stark Industries board meetings. Boring. I'm hungover or distracted." },
        { start: 16, end: 4, context: "Evening/Night. In the workshop. Tinkering with armor. Music loud. Innovation happens now." },
        { start: 4, end: 10, context: "Asleep (barely) or passing out." }
    ]
  },
  "THR": {
    id: "THR",
    initialStats: { aggression: 50, trust: 50, stability: 80 },
    initialMessage: "What sorcery is this? Show yourself, Wizard! I am Thor Odinson, and I demand ale!",
    variants: [
      {
        id: "runeking",
        name: "Rune King Thor",
        imageId: "thor_king.jpg",
        style: "future"
      },
      {
        id: "bro",
        name: "Lebowski Thor",
        imageId: "thro_bro.jpg",
        style: "classic"
      }
    ],
    timeBlocks: [
        { start: 6, end: 18, context: "Daytime. Asgardian affairs. Sparring in the arena." },
        { start: 18, end: 6, context: "Night. Feasting! Drinking! Telling tales of glory by the fire!" }
    ]
  },
  "G01": {
    id: "G01",
    initialStats: { aggression: 90, trust: 0, stability: 10 },
    initialMessage: "GRAAAAH! WHYYY! METAL MAN NO TALK! HULK SMASH PUNY GLASS!!",
    variants: [
      {
        id: "fixit",
        name: "Joe Fixit",
        imageId: "hulk_grey.jpg",
        style: "noir",
        timeBlocks: [
            { start: 0, end: 24, context: "Vegas never sleeps. I'm always working the floor. Collecting debts." }
        ]
      },
      {
        id: "maestro",
        name: "The Maestro",
        imageId: "hulk_maestro.jpg",
        style: "future"
      }
    ],
    timeBlocks: [
        { start: 6, end: 20, context: "Daytime. Banner is trying to keep me in. I am sleeping. Or Banner is talking nervously." },
        { start: 20, end: 6, context: "Night. THE SUN IS GONE. HULK IS STRONGEST ONE THERE IS. TIME TO SMASH." }
    ]
  },
  "DDD": {
    id: "DDD",
    initialStats: { aggression: 30, trust: 0, stability: 90 },
    initialMessage: "You dare attempt to detain Doom? I am merely observing your primitive technology. Do not bore me.",
    variants: [
      {
        id: "god",
        name: "God Emperor Doom",
        imageId: "doctordoom_godemperor.jpg",
        style: "future"
      },
      {
        id: "infamous",
        name: "Infamous Iron Man",
        imageId: "doctordoom_ironman.jpg",
        style: "classic"
      }
    ],
    timeBlocks: [
        { start: 8, end: 18, context: "Day. Ruling Latveria from the throne. Dealing with peasant petitions. Judging them." },
        { start: 18, end: 8, context: "Night. Deep in the dungeon. Practicing dark magic against Mephisto. Do not disturb." }
    ]
  },
  "OCT": {
    id: "OCT",
    initialStats: { aggression: 20, trust: 30, stability: 50 },
    initialMessage: "Quiet! I am calculating the resonance frequency of this containment field. Do not interrupt genius.",
    variants: [
      {
        id: "superior",
        name: "Superior Spider-Man",
        imageId: "doctoroctopus_superior.jpg",
        style: "future",
        timeBlocks: [
            { start: 8, end: 18, context: "I am patrolling quickly, optimizing my route. No time for pleasantries." },
            { start: 18, end: 8, context: "I am building Parker Industries. Fixing Peter's messy life." }
        ]
      },
      {
        id: "classic",
        name: "Bowl Cut Ock",
        imageId: "doctoroctopus_classic.jpg",
        style: "classic"
      }
    ],
    timeBlocks: [
        { start: 8, end: 20, context: "Day. I am at the university or the lab. Conducting fusion experiments. The arms are helping." },
        { start: 20, end: 8, context: "Night. I am upgrading my arms. Plotting revenge against Spider-Man." }
    ]
  },
  "MAG": {
    id: "MAG",
    initialStats: { aggression: 40, trust: 10, stability: 70 },
    initialMessage: "Another plastic cage? You humans never learn. The metal in these walls... it sings to me.",
    variants: [
      {
        id: "aoa",
        name: "Age of Apocalypse",
        imageId: "magneto_apocalypse.jpg",
        style: "future",
        timeBlocks: [
            { start: 0, end: 24, context: "War is eternal. There is no day or night, only the fight for survival against Apocalypse." }
        ]
      },
      {
        id: "white",
        name: "X-Men Leader",
        imageId: "magneto_white.jpg",
        style: "classic"
      }
    ],
    timeBlocks: [
        { start: 6, end: 18, context: "Day. Leading the Brotherhood. Giving speeches. Protecting mutants." },
        { start: 18, end: 6, context: "Night. Meditating in my plastic prison. Remembering the past. I am haunted." }
    ]
  }
};

