const SCENES = [
  {
    "id": "ocean-veranda",
    "title": "Beyond the arch",
    "description": "A slow approach through a coastal veranda towards the ocean.",
    "motion": "Forward dolly",
    "position": "50% 48%",
    "number": 1,
    "group": "original"
  },
  {
    "id": "walawwa-courtyard",
    "title": "Coming home",
    "description": "Move from the shade of a timber doorway into a sunlit family courtyard.",
    "motion": "Doorway approach",
    "position": "50% 52%",
    "number": 2,
    "group": "original"
  },
  {
    "id": "garden-poruwa",
    "title": "A blessed beginning",
    "description": "A gentle, centred approach to an ivory Poruwa in a tropical garden.",
    "motion": "Ceremonial approach",
    "position": "50% 52%",
    "number": 3,
    "group": "original"
  },
  {
    "id": "river-pavilion",
    "title": "Where the river rests",
    "description": "A soft sideways glide across a quiet riverside pavilion.",
    "motion": "Lateral glide",
    "position": "50% 50%",
    "number": 4,
    "group": "original"
  },
  {
    "id": "brass-lamplight",
    "title": "A light for our beginning",
    "description": "Warm lamplight opens into an intimate wedding setting.",
    "motion": "Focus and light reveal",
    "position": "22% 50%",
    "number": 5,
    "group": "original"
  },
  {
    "id": "lotus-water",
    "title": "Upon still waters",
    "description": "Drift just above lotus leaves towards a distant garden pavilion.",
    "motion": "Low floating approach",
    "position": "50% 54%",
    "number": 6,
    "group": "original"
  },
  {
    "id": "jasmine-corridor",
    "title": "Through the jasmine",
    "description": "Follow a garland-lined veranda into the light of the garden.",
    "motion": "Long corridor dolly",
    "position": "50% 50%",
    "number": 7,
    "group": "original"
  },
  {
    "id": "hill-country",
    "title": "Above the mist",
    "description": "A slow rising view over the hills from a shaded manor terrace.",
    "motion": "Rising panorama",
    "position": "50% 46%",
    "number": 8,
    "group": "original"
  },
  {
    "id": "palm-garden",
    "title": "The path to us",
    "description": "Follow the palms towards a celebration in the garden.",
    "motion": "Garden approach",
    "position": "50% 50%",
    "number": 9,
    "group": "original"
  },
  {
    "id": "moonlit-terrace",
    "title": "When the evening glows",
    "description": "Ease away from a twilight terrace as warm light meets the ocean.",
    "motion": "Gentle pullback",
    "position": "50% 50%",
    "number": 10,
    "group": "original"
  },
  {
    "id": "poruwa-ivory",
    "title": "Ivory blessings",
    "description": "A slow approach to a carved ivory Poruwa framed by jasmine and brass lamps.",
    "motion": "Ceremonial approach",
    "camera": "poruwa",
    "group": "poruwa",
    "position": "50% 50%",
    "number": 11
  },
  {
    "id": "poruwa-timber",
    "title": "Carved in devotion",
    "description": "Warm light reveals the timber craftsmanship of a traditional Poruwa.",
    "motion": "Timber and light reveal",
    "camera": "courtyard",
    "group": "poruwa",
    "position": "50% 50%",
    "number": 12
  },
  {
    "id": "poruwa-jasmine",
    "title": "A canopy of blessings",
    "description": "Pass beneath jasmine strands towards a Poruwa in an enclosed garden.",
    "motion": "Jasmine approach",
    "camera": "jasmine",
    "group": "poruwa",
    "position": "50% 50%",
    "number": 13
  },
  {
    "id": "poruwa-lamplight",
    "title": "Before the blessings",
    "description": "Brass lamplight and fresh betel leaves introduce the ceremonial setting.",
    "motion": "Gentle focus reveal",
    "camera": "lamp",
    "group": "poruwa",
    "position": "30% 50%",
    "number": 14
  },
  {
    "id": "poruwa-morning",
    "title": "The first auspicious light",
    "description": "Morning light falls across the Poruwa steps in a quiet timber pavilion.",
    "motion": "Low ceremonial glide",
    "camera": "lotus",
    "group": "poruwa",
    "position": "50% 50%",
    "number": 15
  },
  {
    "id": "dickwella-bay",
    "title": "A bay of our own",
    "description": "An imagined terrace opens towards a palm-fringed turquoise bay.",
    "motion": "Forward coastal dolly",
    "camera": "ocean",
    "group": "dickwella",
    "position": "50% 50%",
    "number": 16
  },
  {
    "id": "dickwella-palms",
    "title": "Under the southern palms",
    "description": "Follow a green resort lawn beneath coconut palms towards the sea.",
    "motion": "Palm garden approach",
    "camera": "palms",
    "group": "dickwella",
    "position": "50% 50%",
    "number": 17
  },
  {
    "id": "dickwella-pool",
    "title": "Blue upon blue",
    "description": "Glide past a blue pool towards the lawn and ocean beyond.",
    "motion": "Poolside lateral glide",
    "camera": "river",
    "group": "dickwella",
    "position": "50% 50%",
    "number": 18
  },
  {
    "id": "dickwella-veranda",
    "title": "The shaded veranda",
    "description": "Step from a shaded cottage veranda into a bright seaside garden.",
    "motion": "Doorway approach",
    "camera": "courtyard",
    "group": "dickwella",
    "position": "50% 50%",
    "number": 19
  },
  {
    "id": "dickwella-headland",
    "title": "Between two blue horizons",
    "description": "An elevated imagined headland reveals palms, coves and turquoise water.",
    "motion": "Rising coastal panorama",
    "camera": "hills",
    "group": "dickwella",
    "position": "50% 50%",
    "number": 20
  },
  {
    "id": "dickwella-beachpath",
    "title": "Barefoot towards forever",
    "description": "A short timber path leads from tropical foliage to pale sand.",
    "motion": "Beach path dolly",
    "camera": "jasmine",
    "group": "dickwella",
    "position": "50% 50%",
    "number": 21
  },
  {
    "id": "dickwella-frangipani",
    "title": "Beneath the frangipani",
    "description": "Dappled light falls through a flowering tree in a quiet resort garden.",
    "motion": "Garden vignette approach",
    "camera": "poruwa",
    "group": "dickwella",
    "position": "50% 50%",
    "number": 22
  },
  {
    "id": "dickwella-rockpool",
    "title": "Where the shore glimmers",
    "description": "Drift above clear shallows and rounded coastal rocks at dawn.",
    "motion": "Water-level glide",
    "camera": "lotus",
    "group": "dickwella",
    "position": "50% 50%",
    "number": 23
  },
  {
    "id": "dickwella-sunset",
    "title": "A southern golden hour",
    "description": "A timber deck frames an imagined peach-coloured coastal sunset.",
    "motion": "Sunset pullback",
    "camera": "moon",
    "group": "dickwella",
    "position": "50% 50%",
    "number": 24
  },
  {
    "id": "dickwella-twilight",
    "title": "An evening to keep",
    "description": "Warm lanterns lead through a twilight garden towards the ocean.",
    "motion": "Twilight light reveal",
    "camera": "lamp",
    "group": "dickwella",
    "position": "50% 50%",
    "number": 25
  }
];