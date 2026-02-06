export type Specimen = {
  id: string;
  name: string;
  origin: string;
  classification: string;
  image: string;
};

export const SPECIMENS: Specimen[] = [
  {
    id: "001",
    name: "SPIDER MAN",
    origin: "QUEENS, NY",
    classification: "HERO [MUTATED]",
    image: "/heroes/spiderman.jpg"
  },
  {
    id: "089",
    name: "LOKI",
    origin: "ASGARD",
    classification: "DEITY [CHAOTIC]",
    image: "/heroes/loki.jpg"
  },
  {
    id: "104",
    name: "BAT MAN",
    origin: "GOTHAM",
    classification: "HUMAN [VIGILANTE]",
    image: "/heroes/batman.jpg"
  },
  {
    id: "X09",
    name: "WOLVERINE",
    origin: "UNKNOWN",
    classification: "MUTANT [FERAL]",
    image: "/heroes/wolverine.jpg"
  },
  {
    id: "002",
    name: "SUPER MAN",
    origin: "KRYPTON",
    classification: "ALIEN [GOD-TIER]",
    image: "/heroes/superman.jpg"
  },
  {
    id: "616",
    name: "SCARLET WITCH",
    origin: "SOKOVIA",
    classification: "NEXUS BEING",
    image: "/heroes/wanda.jpg"
  },
  {
    id: "TB1",
    name: "BILLY BUTCHER",
    origin: "LONDON, UK",
    classification: "HUMAN [VIGILANTE]",
    image: "/heroes/billybutcher.jpg"
  },
  {
    id: "HL1",
    name: "HOMELANDER",
    origin: "VOUGHT LAB",
    classification: "SUPER [UNSTABLE]",
    image: "/heroes/homelander.jpg"
  },
  {
    id: "SL1",
    name: "STARLIGHT",
    origin: "VOUGHT TOWER",
    classification: "SUPER [RADIANT]",
    image: "/heroes/starlight.jpg"
  },
  {
    id: "003",
    name: "CAPTAIN AMERICA",
    origin: "BROOKLYN, NY",
    classification: "SUPER SOLDIER",
    image: "/heroes/captain_america.jpg"
  },
  {
    id: "MK1",
    name: "IRON MAN",
    origin: "MALIBU, CA",
    classification: "HUMAN [AUGMENTED]",
    image: "/heroes/ironman.jpg"
  },
  {
    id: "THR",
    name: "THOR",
    origin: "ASGARD",
    classification: "GOD [THUNDER]",
    image: "/heroes/thor.jpg"
  },
  {
    id: "G01",
    name: "HULK",
    origin: "DAYTON, OH",
    classification: "GAMMA MUTATE",
    image: "/heroes/hulk.jpg"
  },
  {
    id: "DDD",
    name: "DOCTOR DOOM",
    origin: "LATVERIA",
    classification: "MONARCH [SORCERER]",
    image: "/heroes/doctordoom.jpg"
  },
  {
    id: "OCT",
    name: "DOCTOR OCTOPUS",
    origin: "NEW YORK, NY",
    classification: "HUMAN [CYBERNETIC]",
    image: "/heroes/doctoroctopus.jpg"
  },
  {
    id: "MAG",
    name: "MAGNETO",
    origin: "GERMANY",
    classification: "MUTANT [OMEGA]",
    image: "/heroes/magneto.jpg"
  }
];
