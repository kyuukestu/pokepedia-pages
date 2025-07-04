```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

// Event data with encounters
const swarms = [
  {
    title: 'Week 1',
    start: '2021-07-01 00:00:00',
    end: '2021-07-07 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Combee',
        location: 'Amber Castle',
        image: '@images/415.png',
        tip: 'Eterna Forest',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Drifloon',
        location: 'Valley Windworks',
        image: '@images/425.png',
        tip: 'East of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valley_Windworks',
      },
      {
        name: 'Drowzee',
        location: "Xatu's Forest",
        image: '@images/096.png',
        tip: 'Near Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Xatu%27s_Forest',
      },
      {
        name: 'Duskull',
        location: 'Bewilder Forest',
        image: '@images/355.png',
        tip: 'Between Sandgem & Jubilife City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Bewilder_Forest',
      },
      {
        name: 'Feebas',
        location: 'Lake Verity',
        image: '@images/349.png',
        tip: 'North of Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Verity',
      },
      {
        name: 'Hatenna',
        location: 'Bewilder Forest',
        image: '@images/856.png',
        tip: 'Between Sandgem & Jubilife City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Bewilder_Forest',
      },
      {
        name: 'Hawlucha',
        location: 'Eterna Forest',
        image: '@images/701.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Noibat',
        location: 'Mt. Coronet',
        image: '@images/714.png',
        tip: 'Eterna Side',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Porygon',
        location: 'Trophy Garden',
        image: '@images/137.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Trophy_Garden',
      },
      {
        name: 'Slowpoke-Galarian',
        location: 'Lake Psyduck',
        image: '@images/079-Galar.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Psyduck',
      },
      {
        name: 'Slugma',
        location: 'Stark Mountain',
        image: '@images/218.png',
        tip: 'Battle Zone',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Stark_Mountain',
      },
      {
        name: 'Tengela',
        location: 'Emeragrove Town',
        image: '@images/114.png',
        tip: 'Near Hearthome City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Emeragrove_Town',
      },
      {
        name: 'Trapinch',
        location: 'R228',
        image: '@images/328.png',
        tip: 'Battle Zone',
      },
      {
        name: 'Wimpod',
        location: 'Sandgem Beach',
        image: '@images/767.png',
      },
      {
        name: 'Wooper',
        location: 'Chocovine Town',
        image: '@images/194.png',
        tip: 'Southeast of Snowpoint',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Chocovine_Town',
      },
      {
        name: 'Zubat',
        location: 'Oreburgh Gate',
        image: '@images/041.png',
        tip: 'Cave between Oreburgh & Jubilife City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_Gate',
      },
    ],
  },
  {
    title: 'Week 2',
    start: '2021-07-08 00:00:00',
    end: '2021-07-14 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Audino',
        location: 'Route 210',
        image: '@images/531.png',
        tip: 'Between Solaceon Town & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Ducklett',
        location: 'Route 219',
        image: '@images/580.png',
        tip: 'South of Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_219',
      },
      {
        name: 'Castform',
        location: 'Trophy Garden',
        image: '@images/351.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Trophy_Garden',
      },
      {
        name: 'Charmander',
        location: 'Route 221',
        image: '@images/004.png',
        tip: 'South-East of Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_221',
      },
      {
        name: 'Karrablast',
        location: 'Valor Forest',
        image: '@images/588.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Komala',
        location: 'Sunyshore Wood',
        image: '@images/775.png',
        tip: 'Forestry between Lake Valor & Sunyshore City',
      },
      {
        name: 'Mareanie',
        location: 'Long Beach',
        image: '@images/747.png',
        tip: 'Beach South of Sunyshore City',
      },
      {
        name: 'Phanpy',
        location: 'Route 207',
        image: '@images/231.png',
        tip: 'East of Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_207',
      },
      {
        name: 'Ralts',
        location: 'Route 212',
        image: '@images/280.png',
        tip: 'Between Hearthome & Pastoria',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Scorbunny',
        location: 'Pal Park',
        image: '@images/813.png',
        tip: 'South East of Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Pal_Park',
      },
      {
        name: 'Slowpoke',
        location: 'Route 205',
        image: '@images/079.png',
        tip: 'Between Floaroma & Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_205',
      },
      {
        name: 'Starly',
        location: 'Route 201',
        image: '@images/396.png',
        tip: 'Between Twinleaf & Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_201',
      },
      {
        name: 'Stunky',
        location: 'Great Marsh',
        image: '@images/434.png',
        tip: 'Pastoria Great Marsh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Great_Marsh',
      },
      {
        name: 'Tentacool',
        location: "Diablo's Bay",
        image: '@images/072.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Diablo%27s_Ocean',
      },
      {
        name: 'Torchic',
        location: 'Finit Forest',
        image: '@images/255.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Whismur',
        location: 'Ravaged Path',
        image: '@images/293.png',
        tip: 'Between Jubilife & Floaroma',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Ravaged_Path',
      },
    ],
  },
  {
    title: 'Week 3',
    start: '2021-07-15 00:00:00',
    end: '2021-07-21 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Applin',
        location: 'Heart Forest',
        image: '@images/840.png',
        tip: 'South West of Pastoria',
      },
      {
        name: 'Bagon',
        location: 'Route 210',
        image: '@images/371.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Carvanha',
        location: 'Lake Valor',
        image: '@images/318.png',
        tip: 'Between Pastoria, Veilstone, & Sunyshore',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Valor',
      },
      {
        name: 'Chimchar',
        location: 'Route 227',
        image: '@images/390.png',
        tip: 'Battle Zone - South of Mt. Stark',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_227',
      },
      {
        name: 'Cryogonal',
        location: 'Mt. Coronet',
        image: '@images/615.png',
        tip: 'Snowpoint Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Fennekin',
        location: "Xatu's Forest",
        image: '@images/653.png',
        tip: 'Near Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Xatu%27s_Forest',
      },
      {
        name: 'Foongus',
        location: 'Great Marsh',
        image: '@images/590.png',
        tip: 'Pastoria Great Marsh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Great_Marsh',
      },
      {
        name: 'Kangaskhan',
        location: 'Valor Forest',
        image: '@images/115.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Klink',
        location: 'Mt. Coronet',
        tip: 'Hearthome Entrance',
        image: '@images/599.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Ledyba',
        location: 'Eterna Forest',
        image: '@images/165.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Luvdisc',
        location: 'Old Basin',
        image: '@images/370.png',
        tip: 'Lake on Route 210, between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Oranguru',
        location: 'Long Forest',
        image: '@images/765.png',
        tip: 'South West of Route 212',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Pancham',
        location: 'Celestic Wood',
        image: '@images/674.png',
        tip: 'Forests around Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Celestic_Town',
      },
      {
        name: 'Sigilyph',
        location: 'Solaceon Ruins',
        image: '@images/561.png',
        tip: 'East of Solaceon Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Solaceon_Ruins',
      },
      {
        name: 'Smeargle',
        location: 'Route 208',
        image: '@images/235.png',
        tip: 'Between Hearthome & Mt Coronet',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_208',
      },
      {
        name: 'Snivy',
        location: 'Great Floaroma Flower Meadow',
        image: '@images/495.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Floaroma_Meadow',
      },
    ],
  },
  {
    title: 'Week 4',
    start: '2021-07-22 00:00:00',
    end: '2021-07-28 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Chingling',
        location: 'Oreburgh Gate',
        image: '@images/433.png',
        tip: 'Cave between Oreburgh & Jubilife City (2nd Flr)',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_Gate',
      },
      {
        name: 'Clobbopus',
        location: 'Sandgem Beach',
        image: '@images/852.png',
      },
      {
        name: 'Corsola-Galarian',
        location: "Diablo's Bay",
        image: '@images/222-Galar.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Diablo%27s_Bay',
      },
      {
        name: 'Darumaka-Galarian',
        location: 'Snow-White Woodland',
        image: '@images/554-Galar.png',
        tips: 'Forestry around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Goomy',
        location: 'Route 212',
        image: '@images/704.png',
        tip: 'Between Hearthome & Pastoria',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Kecleon',
        location: 'Long Forest',
        image: '@images/352.png',
        tip: 'South West of Route 212',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Litleo',
        location: 'Sinnoh Grand Forest',
        image: '@images/667.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Mawile',
        location: 'Wayward Cave',
        image: '@images/303.png',
        tip: 'Along R206, South of Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Wayward_Cave',
      },
      {
        name: 'Minun',
        location: 'Veilstone Wood',
        image: '@images/312.png',
        tip: 'Forestry around Veilstone City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Veilstone_City',
      },
      {
        name: 'Oshawott',
        location: 'Majolica Lake',
        image: '@images/501.png',
        tip: 'Surrounding Majolica Town, South West of Hearthome',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Majolica_Town',
      },
      {
        name: 'Pikipek',
        location: 'Sunyshore Wood',
        image: '@images/731.png',
        tip: 'Forestry around Sunyshore City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sunyshore_City',
      },
      {
        name: 'Riolu',
        location: 'Iron Island',
        image: '@images/447.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Iron_Island',
      },
      {
        name: 'Rolycoly',
        location: 'Coal Valley',
        image: '@images/837.png',
        tip: 'Caverns and Caves around Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_City',
      },
      {
        name: 'Sandile',
        location: 'Long Beach',
        image: '@images/551.png',
        tip: 'Beach South of Sunyshore City',
      },
      {
        name: 'Yamper',
        location: 'Valley Wind Works',
        image: '@images/835.png',
        tip: 'East of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valley_Windworks',
      },
      {
        name: 'Wooloo',
        location: 'Route 210',
        image: '@images/831.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
    ],
  },
  {
    title: 'Week 5',
    start: '2021-07-29 00:00:00',
    end: '2021-08-04 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Bellsprout',
        location: 'Sinnoh Grand Forest',
        image: '@images/069.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Blipbug',
        location: 'Bewilder Forest',
        image: '@images/824.png',
        tip: 'Between Sandgem & Jubilife City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Bewilder_Forest',
      },
      {
        name: 'Buizel',
        location: 'Route 205',
        image: '@images/418.png',
        tip: 'Between Floaroma & Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_205',
      },
      {
        name: 'Chikorita',
        location: 'Great Floaroma Flower Meadow',
        image: '@images/152.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Floaroma_Meadow',
      },
      {
        name: 'Clamperl',
        location: 'Remembrance Bay',
        image: '@images/366.png',
        tip: 'Bay Area between Sandgem & Pal Park',
      },
      {
        name: 'Clauncher',
        location: 'Lake Verity',
        image: '@images/692.png',
        tip: 'North of Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Verity',
      },
      {
        name: 'Cyndaquil',
        location: 'Pal Wood',
        image: '@images/155.png',
        tip: 'South East of Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Pal_Park',
      },
      {
        name: 'Elgyem',
        location: 'Dandelion Island',
        image: '@images/605.png',
        tip: 'Around Lily of the Valley Island',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Dandelion_Island',
      },
      {
        name: 'Lunatone',
        location: 'Mt. Coronet',
        image: '@images/337.png',
        tip: 'Celestic Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Oricorio',
        location: 'Trophy Garden',
        image: '@images/741.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Trophy_Garden',
      },
      {
        name: 'Plusle',
        location: 'Veilstone Wood',
        image: '@images/311.png',
        tip: 'Forestry around Veilstone City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Veilstone_City',
      },
      {
        name: 'Sableye',
        location: 'Wayward Cave',
        image: '@images/302.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
      {
        name: 'Sizzlipede',
        location: 'Route 206',
        image: '@images/850.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
      {
        name: 'Slakoth',
        location: 'Finit Forest',
        image: '@images/287.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Snom',
        location: 'Snow-White Woodland',
        image: '@images/872.png',
        tips: 'Forestry around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Toxel',
        location: 'Heart Forest',
        image: '@images/848.png',
        tip: 'South West of Pastoria',
      },
    ],
  },
  {
    title: 'Week 6',
    start: '2021-08-05 00:00:00',
    end: '2021-08-11 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Arrokuda',
        location: 'Route 205',
        image: '@images/846.png',
        tip: 'Between Floaroma & Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_205',
      },
      {
        name: 'Cherubi',
        location: 'Eterna Forest',
        image: '@images/420.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Chinchou',
        location: 'Sunyshore Lake',
        image: '@images/170.png',
        tip: 'North of Arrowroot Town, between Lake Valor & Sunyshore City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Arrowroot_Town',
      },
      {
        name: 'Darumaka',
        location: 'Ravaged Path',
        image: '@images/554.png',
        tip: 'Between Jubilife & Floaroma',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Ravaged_Path',
      },
      {
        name: 'Dewpider',
        location: 'Old Basin',
        image: '@images/751.png',
        tip: 'Lake on Route 210, between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Durant',
        location: 'Fuego Ironworks',
        image: '@images/632.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Fuego_Ironworks',
      },
      {
        name: 'Larvitar',
        location: 'Mt. Shady',
        image: '@images/246.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Meditite',
        location: 'Mt. Coronet',
        image: '@images/307.png',
        tip: 'Eterna Entrance',

        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Meowth-Galarian',
        location: 'Iron Island',
        image: '@images/052-Galar.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Iron_Island',
      },
      {
        name: 'Patrat',
        location: 'Finit Forest',
        image: '@images/504.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Shuppet',
        location: 'Valor Forest',
        image: '@images/353.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Yanma',
        location: 'Great Marsh',
        image: '@images/193.png',
        tip: 'Pastoria Great Marsh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Great_Marsh',
      },
    ],
  },
  {
    title: 'Hidden Grotto',
    start: '2021-08-05 00:00:00',
    end: '2021-08-11 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Wishiwashi',
        location: 'Lake Acuity',
        image: '@images/746.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Dratini',
        location: 'Mt. Coronet',
        image: '@images/147.png',
        tip: 'Underground Lake',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Mudkip',
        location: 'Lake Valor (Cave)',
        image: '@images/258.png',
        tip: 'Between Pastoria, Veilstone, & Sunyshore',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Valor',
      },
      {
        name: 'Totodile',
        location: 'Lake Verity (Cave)',
        image: '@images/158.png',
        tip: 'North of Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Verity',
      },
    ],
  },
  {
    title: 'Week 7',
    start: '2021-08-12 00:00:00',
    end: '2021-08-18 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Absol',
        location: 'Sendoff Spring',
        image: '@images/359.png',
        tip: 'Between Veilstone & Pastoria',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sendoff_Spring',
      },
      {
        name: 'Archen',
        location: 'Oreburgh Mining Complex',
        image: '@images/566.png',
        tip: 'South of Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_Mine',
      },
      {
        name: 'Bulbasaur',
        location: 'Sinnoh Grand Forest',
        image: '@images/001.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Deerling',
        location: 'Valor Forest',
        image: '@images/585.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Elekid',
        location: 'Fuego Ironworks',
        image: '@images/239.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Fuego_Ironworks',
      },
      {
        name: 'Fletchling',
        location: 'Eterna Forest',
        image: '@images/661.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Indeedee',
        location: 'Route 212 (Northern)',
        image: '@images/876.png',
        tip: 'Between Hearthome & Pastoria',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Mime Jr.',
        location: 'Route 209',
        image: '@images/439.png',
        tip: 'Between Hearthome & Solaceon',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_209',
      },
      {
        name: 'Munchlax',
        location: 'Valor Forest',
        image: '@images/446.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Petilil',
        location: 'Route 229',
        image: '@images/548.png',
        tip: 'North of Resort Area',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_229',
      },
      {
        name: 'Poochyena',
        location: 'Celestic Wood',
        image: '@images/261.png',
        tip: 'Forests around Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Celestic_Town',
      },
      {
        name: 'Rockruff',
        location: 'Ravaged Path',
        image: '@images/744.png',
        tip: 'Between Jubilife & Floaroma',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Ravaged_Path',
      },
      {
        name: 'Salandit',
        location: 'Survival Area',
        image: '@images/757.png',
        tip: '',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Survival_Area',
      },
      {
        name: 'Swinub',
        location: 'Mt. Coronet',
        image: '@images/220.png',
        tip: 'Snowpoint Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Turtwig',
        location: 'Finit Forest',
        image: '@images/387.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Wingull',
        location: 'Remembrance Bay',
        image: '@images/278.png',
        tip: 'Bay Area between Sandgem & Pal Park',
      },
    ],
  },
  {
    title: 'Week 8',
    start: '2021-08-19 00:00:00',
    end: '2021-08-25 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Binacle',
        location: "Diablo's Bay",
        image: '@images/688.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Diablo%27s_Bay',
      },
      {
        name: 'Budew',
        location: 'Sinnoh Grand Forest',
        image: '@images/406.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Buneary',
        location: 'Eterna Forest',
        image: '@images/427.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Caterpie',
        location: 'Finit Forest',
        image: '@images/010.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Cleffa',
        location: 'Mt. Coronet',
        image: '@images/173.png',
        tip: 'Hearthome Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Dreepy',
        location: 'Mt. Shady',
        image: '@images/885.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Goldeen',
        location: 'Pastoria Bay',
        image: '@images/118.png',
        tip: "Bay Area on Pastoria's East",
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Pastoria_City',
      },
      {
        name: 'Growlithe',
        location: 'Valor Forest',
        image: '@images/058.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Kricketot',
        location: 'Finit Forest',
        image: '@images/401.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Litwick',
        location: 'Lost Tower',
        image: '@images/607.png',
        tip: 'South of Solaceon Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lost_Tower',
      },
      {
        name: 'Magnemite',
        location: 'Valley Wind Works',
        image: '@images/081.png',
        tip: 'East of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valley_Windworks',
      },
      {
        name: 'Numel',
        location: 'Route 228',
        image: '@images/322.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Route_228',
      },
      {
        name: 'Popplio',
        location: 'Lake Acuity',
        image: '@images/728.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Scraggy',
        location: 'Route 225',
        image: '@images/559.png',
        tip: 'Between Fight & Survival Area',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_225',
      },
      {
        name: 'Shieldon',
        location: 'Oreburgh Mining Complex',
        image: '@images/410.png',
        tip: 'South of Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_Mine',
      },
      {
        name: 'Sobble',
        location: 'Sendoff Spring',
        image: '@images/816.png',
        tip: 'Between Veilstone & Pastoria',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sendoff_Spring',
      },
    ],
  },
  {
    title: 'Week 9',
    start: '2021-08-26 00:00:00',
    end: '2021-09-01 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Beldum',
        location: 'Mt. Metagross',
        image: '@images/374.png',
        tip: 'South of Snowpoint City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Metagross_Mountain',
      },
      {
        name: 'Bergmite',
        location: 'Lake Acuity (Banks)',
        image: '@images/712.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Cottonee',
        location: 'Great Floaroma Flower Meadow',
        image: '@images/546.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Floaroma_Meadow',
      },
      {
        name: 'Exeggcute',
        location: 'Heart Forest',
        image: '@images/102.png',
        tip: 'South West of Pastoria',
      },
      {
        name: 'Fomantis',
        location: 'Sunyshore Wood',
        image: '@images/753.png',
        tip: 'Forestry between Lake Valor & Sunyshore City',
      },
      {
        name: 'Froakie',
        location: 'Lake Verity',
        image: '@images/656.png',
        tip: 'North of Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Verity',
      },
      {
        name: 'Helioptile',
        location: 'Valley Wind Works',
        image: '@images/694.png',
        tip: 'East of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valley_Windworks',
      },
      {
        name: 'Magby',
        location: 'Fuego Iron Works',
        image: '@images/240.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Fuego_Ironworks',
      },
      {
        name: 'Pawniard',
        location: 'Iron Island',
        image: '@images/624.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Iron_Island',
      },
      {
        name: 'Rowlet',
        location: 'Sinnoh Grand Forest',
        image: '@images/722.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Sandshrew-Alolan',
        location: 'Mt. Coronet',
        image: '@images/027-Alola.png',
        tip: 'Snowpoint Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Snowpoint_Entrance',
      },
      {
        name: 'Shelmet',
        location: 'Celestic Wood',
        image: '@images/616.png',
        tip: 'Forests around Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Celestic_Town',
      },
      {
        name: 'Sinistea',
        location: 'Lost Tower (Top Floor)',
        image: '@images/854.png',
        tip: 'South of Solaceon Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lost_Tower',
      },
      {
        name: 'Snorunt',
        location: 'Snow-White Woodland (North)',
        image: '@images/361.png',
        tips: 'Forestry around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Snover',
        location: 'Snow-White Woodland (South)',
        image: '@images/459.png',
        tips: 'Forestry around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Solosis',
        location: "Xatu's Forest",
        image: '@images/577.png',
        tip: 'Near Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Xatu%27s_Forest',
      },
    ],
  },
  {
    title: 'Week 10',
    start: '2021-09-02 00:00:00',
    end: '2021-09-08 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Abra',
        location: 'Bewilder Forest',
        image: '@images/063.png',
        tip: 'Between Sandgem & Jubilife City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Bewilder_Forest',
      },
      {
        name: 'Aron',
        location: 'Coal Valley',
        image: '@images/304.png',
        tip: 'Caverns and Caves around Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_City',
      },
      {
        name: 'Axew',
        location: 'Mt. Shady',
        image: '@images/610.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Bronzor',
        location: 'Mt. Coronet ',
        image: '@images/436.png',
        tip: 'Eterna Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Crabrawler',
        location: 'Long Forest',
        image: '@images/739.png',
        tip: 'South West of Route 212',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Deino',
        location: 'Mt. Shady',
        image: '@images/633.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Dwebble',
        location: 'Oreburgh Mining Complex',
        image: '@images/557.png',
        tip: 'South of Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_Mine',
      },
      {
        name: 'Eevee',
        location: 'Finit Forest',
        image: '@images/133.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Geodude-Alolan',
        location: 'Mt. Coronet (Hearthome Entrance)',
        image: '@images/074-Alola.png',
        tip: 'Hearthome Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Lickitung',
        location: 'Route 214',
        image: '@images/108.png',
        tip: 'South of Veilstone',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_214',
      },
      {
        name: 'Nidoran-F',
        location: 'Eterna Forest',
        image: '@images/029.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Pansear',
        location: 'Veilstone Wood',
        image: '@images/513.png',
        tip: 'Forestry around Veilstone City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Veilstone_City',
      },
      {
        name: 'Pinsir',
        location: 'Route 210',
        image: '@images/127.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Ponyta',
        location: 'Route 206',
        image: '@images/077.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
      {
        name: 'Roggenrola',
        location: 'Wayward Cave',
        image: '@images/524.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
      {
        name: 'Zorua',
        location: 'Route 208',
        image: '@images/570.png',
        tip: 'Between Hearthome & Mt Coronet',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_208',
      },
    ],
  },
  {
    title: 'Week 11',
    start: '2021-09-09 00:00:00',
    end: '2021-09-15 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Blitzle',
        location: 'Route 207',
        image: '@images/522.png',
        tip: 'East of Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_207',
      },
      {
        name: 'Croagunk',
        location: 'Great Marsh',
        image: '@images/453.png',
        tip: 'Pastoria Great Marsh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Great_Marsh',
      },
      {
        name: 'Frillish',
        location: 'Pastoria Bay',
        image: '@images/592.png',
        tip: "Bay Area on Pastoria's East",
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Pastoria_City',
      },
      {
        name: 'Grubbin',
        location: 'Heart Forest',
        image: '@images/736.png',
        tip: 'South West of Pastoria',
      },
      {
        name: 'Inkay',
        location: "Xatu's Forest",
        image: '@images/686.png',
        tip: 'Near Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Xatu%27s_Forest',
      },
      {
        name: 'Miltank',
        location: 'Route 210',
        image: '@images/241.png',
        tip: 'Between Solaceon & Celestic Town - Southern Half',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Oddish',
        location: 'Eterna Forest',
        image: '@images/043.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Paras',
        location: 'Eterna Forest',
        image: '@images/046.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Pichu',
        location: 'Lily Valley Wood',
        image: '@images/172.png',
        tip: 'Lily of the Valley Island',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lily_of_the_Valley_Island',
      },
      {
        name: 'Pidove',
        location: 'Route 204',
        image: '@images/519.png',
        tip: 'Between Floaroma & Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_204',
      },
      {
        name: 'Qwilfish',
        location: 'Old Basin',
        image: '@images/211.png',
        tip: 'Lake on Route 210, between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Shroomish',
        location: 'Sinnoh Grand Forest',
        image: '@images/285.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Skrelp',
        location: 'Heart Forest (Lake)',
        image: '@images/690.png',
        tip: 'South West of Pastoria',
      },
      {
        name: 'Swablu',
        location: 'Route 210 ',
        image: '@images/333.png',
        tip: 'Between Solaceon & Celestic Town - Northern Half',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Treecko',
        location: 'Sunyshore Forest',
        image: '@images/252.png',
        tip: 'Forestry between Lake Valor & Sunyshore City',
      },
      {
        name: 'Venonat',
        location: 'Route 215',
        image: '@images/048.png',
        tip: 'West of Veilstone',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_215',
      },
    ],
  },
  {
    title: 'Week 12',
    start: '2021-09-16 00:00:00',
    end: '2021-09-22 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Bidoof',
        location: 'Route 202',
        image: '@images/399.png',
        tip: 'Between Sandgem & Jubilife',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_202',
      },
      {
        name: 'Dunsparce',
        location: 'Wayward Cave',
        image: '@images/206.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
      {
        name: 'Houndour',
        location: 'Valor Forest',
        image: '@images/228.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Horsea',
        location: 'Lake Acuity',
        image: '@images/116.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Illumise',
        location: 'Long Forest',
        image: '@images/314.png',
        tip: 'South West of Route 212',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Joltik',
        location: 'Finit Forest',
        image: '@images/595.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Litten',
        location: 'Sunyshore Wood',
        image: '@images/725.png',
        tip: 'Forestry between Lake Valor & Sunyshore City',
      },
      {
        name: 'Munna',
        location: 'Bewilder Forest',
        image: '@images/517.png',
        tip: 'Between Sandgem & Jubilife City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Bewilder_Forest',
      },
      {
        name: 'Pansage',
        location: 'Finit Forest',
        image: '@images/511.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Rookidee',
        location: 'Iron Island',
        image: '@images/821.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Iron_Island',
      },
      {
        name: 'Sewaddle',
        location: 'Celestic Wood',
        image: '@images/540.png',
        tip: 'Forests around Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Celestic_Town',
      },
      {
        name: 'Solrock',
        location: 'Mt. Coronet',
        image: '@images/338.png',
        tip: 'Eterna Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Stufful',
        location: 'Pal Wood',
        image: '@images/759.png',
        tip: 'South East of Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Pal_Park',
      },
      {
        name: 'Vanillite',
        location: 'Snow-White Woodland',
        image: '@images/582.png',
        tips: 'Forestry around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Wynaut',
        location: 'Route 210',
        image: '@images/360.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Zigzagoon-Galarian',
        location: 'Eterna Forest',
        image: '@images/263-Galar.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
    ],
  },
  {
    title: 'Week 13',
    start: '2021-09-23 00:00:00',
    end: '2021-09-29 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Bunnelby',
        location: 'Route 208',
        image: '@images/659.png',
        tip: 'Between Hearthome & Mt Coronet',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_208',
      },
      {
        name: 'Emolga',
        location: 'Sunyshore Wood',
        image: '@images/587.png',
        tip: 'Forestry between Lake Valor & Sunyshore City',
      },
      {
        name: 'Glameow',
        location: 'Valor Forest',
        image: '@images/431.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Happiny',
        location: 'Route 210',
        image: '@images/440.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Heracross',
        location: 'Eterna Forest',
        image: '@images/214.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Hoothoot',
        location: 'Finit Wood',
        image: '@images/163.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Jangmo-o',
        location: 'Mt. Shady',
        image: '@images/782.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Lapras',
        location: 'Remembrance Bay',
        image: '@images/131.png',
        tip: 'Bay Area between Sandgem & Palpark',
      },
      {
        name: 'Nincada',
        location: 'Sinnoh Grand Forest',
        image: '@images/290.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Panpour',
        location: 'Celestic Wood',
        image: '@images/515.png',
        tip: 'Forests around Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Celestic_Town',
      },
      {
        name: 'Poliwag',
        location: 'Psyduck Lake',
        image: '@images/060.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Psyduck',
      },
      {
        name: 'Pyukumuku',
        location: 'Long Beach',
        image: '@images/771.png',
        tip: 'Beach South of Sunyshore City',
      },
      {
        name: 'Remoraid',
        location: 'Pastoria Bay',
        image: '@images/223.png',
        tip: "Bay Area on Pastoria's East",
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Pastoria_City',
      },
      {
        name: 'Shellos',
        location: 'Route 213',
        image: '@images/422.png',
        tip: 'East of Pastoria',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_213',
      },
      {
        name: 'Skitty',
        location: 'Veilstone Wood',
        image: '@images/300.png',
        tip: 'Forestry around Veilstone City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Veilstone_City',
      },
      {
        name: 'Wurmple',
        location: 'Long Forest',
        image: '@images/265.png',
        tip: 'South West of Route 212',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
    ],
  },
  {
    title: 'Week 14',
    start: '2021-09-30 00:00:00',
    end: '2021-10-06 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Anorith',
        location: 'Remembrance Bay',
        image: '@images/347.png',
        tip: 'Bay Area between Sandgem & Palpark',
      },
      {
        name: 'Bounsweet',
        location: 'Long Forest',
        image: '@images/761.png',
        tip: 'South West of Route 212',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Cramorant',
        location: 'Pastoria Bay',
        image: '@images/845.png',
        tip: "Bay Area on Pastoria's East",
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Pastoria_City',
      },
      {
        name: 'Flabébé',
        location: 'Great Floaroma Flower Field',
        image: '@images/669.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Floaroma_Meadow',
      },
      {
        name: 'Gothita',
        location: 'Finit Forest',
        image: '@images/574.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Minccino',
        location: 'Sinnoh Grand Forest',
        image: '@images/572.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Nuzleaf',
        location: 'Heart Forest',
        image: '@images/274.png',
        tip: 'South West of Pastoria',
      },
      {
        name: 'Onix',
        location: 'Coal Valley',
        image: '@images/095.png',
        tip: 'Caverns and Caves around Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_City',
      },
      {
        name: 'Pineco',
        location: 'Eterna Forest',
        image: '@images/204.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Snubbull',
        location: 'Valor Forest',
        image: '@images/209.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Stunfisk',
        location: 'Long Beach',
        image: '@images/618.png',
        tip: 'Beach South of Sunyshore City',
      },
      {
        name: 'Tepig',
        location: 'Pal Wood',
        image: '@images/498.png',
        tip: 'South East of Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Pal_Park',
      },
      {
        name: 'Tropius',
        location: 'Veilstone Wood',
        image: '@images/357.png',
        tip: 'Forestry around Veilstone City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Veilstone_City',
      },
      {
        name: 'Turtonator',
        location: 'Mt. Stark',
        image: '@images/776.png',
        tip: 'Battle Zone',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Stark_Mountain',
      },
      {
        name: 'Tyrogue',
        location: 'Mt. Shady',
        image: '@images/236.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Tynamo',
        location: 'Mt. Coronet',
        image: '@images/602.png',
        tip: 'Hearthome Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
    ],
  },
  {
    title: 'Week 15',
    start: '2021-10-07 00:00:00',
    end: '2021-10-13 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Chatot',
        location: 'Sunyshore Forest',
        image: '@images/441.png',
        tip: 'Forestry between Lake Valor & Sunyshore City',
      },
      {
        name: 'Duraludon',
        location: 'Iron Island',
        image: '@images/884.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Iron_Island',
      },
      {
        name: "Farfetch'd-Galarian",
        location: 'Valor Forest',
        image: '@images/083-Galar.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Gastly',
        location: 'Eterna Forest',
        image: '@images/092.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Hippopotas',
        location: 'Route 214',
        image: '@images/449.png',
        tip: 'South of Veilstone',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_214',
      },
      {
        name: 'Larvesta',
        location: 'Route 227',
        image: '@images/636.png',
        tip: 'Battle Zone - South of Mt. Stark',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_227',
      },
      {
        name: 'Pidgey',
        location: 'Route 202',
        image: '@images/016.png',
        tip: 'Between Sandgem & Jubilife',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_202',
      },
      {
        name: 'Rattata-Alolan',
        location: 'Route 202',
        image: '@images/019-Alola.png',
        tip: 'Between Sandgem & Jubilife',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_202',
      },
      {
        name: 'Scyther',
        location: 'Route 210',
        image: '@images/123.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Shellder',
        location: 'Snowpoint Bay',
        image: '@images/090.png',
        tip: 'Water-body South of Snowpoint',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Snowpoint_City',
      },
      {
        name: 'Shinx',
        location: 'Route 204',
        image: '@images/403.png',
        tip: 'Between Floaroma & Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_204',
      },
      {
        name: 'Swirlix',
        location: 'Route 205',
        image: '@images/684.png',
        tip: 'Between Floaroma & Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_205',
      },
      {
        name: 'Taillow',
        location: 'Route 203',
        image: '@images/276.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_203',
      },
      {
        name: 'Throh',
        location: 'Veilstone Wood',
        image: '@images/538.png',
        tip: 'Forestry around Veilstone City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Veilstone_City',
      },
      {
        name: 'Tyrunt',
        location: 'Mt. Shady',
        image: '@images/696.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Vulpix',
        location: 'Route 206',
        image: '@images/037.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
    ],
  },
  {
    title: 'Week 16',
    start: '2021-10-14 00:00:00',
    end: '2021-10-20 23:59:59',
    image: 'https://archives.bulbagarden.net/media/upload/f/f8/Sinnoh_BDSP.png',
    encounters: [
      {
        name: 'Baltoy',
        location: 'Dandelion Island',
        image: '@images/343.png',
        tip: 'Around Lily of the Valley Island',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Dandelion_Island',
      },
      {
        name: 'Chewtle',
        location: 'Ravaged Path',
        image: '@images/833.png',
        tip: 'Between Jubilife & Floaroma',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Ravaged_Path',
      },
      {
        name: 'Cubone',
        location: 'Coal Valley',
        image: '@images/104.png',
        tip: 'Caverns and Caves around Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_City',
      },
      {
        name: 'Drilbur',
        location: 'Mt. Coronet',
        image: '@images/529.png',
        tip: 'Hearthome Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Ekans',
        location: 'Celestic Wood',
        image: '@images/023.png',
        tip: 'Forests around Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Celestic_Town',
      },
      {
        name: 'Finneon',
        location: 'Lake Valor',
        image: '@images/456.png',
        tip: 'Between Pastoria, Veilstone, & Sunyshore',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Valor',
      },
      {
        name: 'Gligar',
        location: 'Route 206',
        image: '@images/207.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
      {
        name: 'Grookey',
        location: 'Finit Forest',
        image: '@images/810.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Natu',
        location: "Xatu's Forest",
        image: '@images/177.png',
        tip: 'Near Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Xatu%27s_Forest',
      },
      {
        name: 'Nidoran-M',
        location: 'Eterna Forest',
        image: '@images/032.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Purrloin',
        location: 'Sinnoh Grand Forest',
        image: '@images/509.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Seel',
        location: 'Lake Acuity',
        image: '@images/086.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Skarmory',
        location: 'Iron Island',
        image: '@images/227.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Iron_Island',
      },
      {
        name: 'Smoochum',
        location: 'Snow-White Woodland',
        image: '@images/238.png',
        tips: 'Forestry around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Surskit',
        location: 'Lake Psyduck',
        image: '@images/283.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Psyduck',
      },
      {
        name: 'Vulpix-Alolan',
        location: 'Acuity Lakefront',
        image: '@images/037-Alola.png',
        tip: 'Around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
    ],
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedEvent = ref<any>(null)
const currentPage = ref(1)
const itemsPerPage = 4 // Display 4 encounters per page

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleEventClick = (clickInfo: any) => {
  selectedEvent.value = clickInfo.event
  currentPage.value = 1 // Reset to first page when opening dialog
}

const closeEventDetails = () => {
  selectedEvent.value = null
}

// Compute paginated encounters
const paginatedEncounters = computed(() => {
  if (!selectedEvent.value?.extendedProps?.encounters) return []
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return selectedEvent.value.extendedProps.encounters.slice(start, end)
})

// Compute total pages for pagination
const totalPages = computed(() => {
  if (!selectedEvent.value?.extendedProps?.encounters) return 1
  return Math.ceil(selectedEvent.value.extendedProps.encounters.length / itemsPerPage)
})

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  initialView: 'dayGridMonth',
  initialDate: '2021-07-01',
  dayMaxEvents: true,
  weekends: true,
  events: swarms,
  eventClick: handleEventClick,
  height: 'auto',
})

function getImageSrc(imagePath: string) {
  // If the path starts with '@images/', use import.meta.glob or a static import
  if (imagePath.startsWith('@images/')) {
    // Adjust this according to your alias configuration
    return new URL(`../../../assets/images/${imagePath.replace('@images/', '')}`, import.meta.url)
      .href
  }
  // Otherwise, treat as relative path
  return new URL(imagePath, import.meta.url).href
}
</script>

<template>
  <v-parallax
    src="https://archives.bulbagarden.net/media/upload/thumb/0/08/Sinnoh_BDSP_artwork.png/450px-Sinnoh_BDSP_artwork.png"
  >
    <v-container class="pa-4">
      <v-row justify="center">
        <v-col cols="12" lg="10" xl="8">
          <v-card class="pa-4" elevation="2">
            <v-card-title class="text-h5 mb-4">Swarm Calendar</v-card-title>
            <div class="calendar-wrapper">
              <FullCalendar :options="calendarOptions" />
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Encounter List Dialog -->
      <v-dialog v-model="selectedEvent" max-width="800px" scrollable>
        <v-card
          v-if="selectedEvent"
          class="event-dialog-card"
          :style="
            selectedEvent.extendedProps?.image
              ? {
                  backgroundImage: `url(${selectedEvent.extendedProps.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }
              : {}
          "
        >
          <div class="dialog-overlay">
            <v-card-title class="d-flex justify-space-between align-center text-white">
              <span class="text-h6">{{ selectedEvent.title }} Encounters</span>
              <v-btn
                icon="mdi-close"
                variant="text"
                size="small"
                color="white"
                @click="closeEventDetails"
              />
            </v-card-title>
            <v-alert
              type="info"
              variant="tonal"
              color="#FFF"
              class="mb-4"
              border="bottom"
              border-color="#FFF"
              elevation="2"
              text="Hover LOCATION for tooltip; click link ICON for Bulbapedia"
            ></v-alert>
            <v-card-text class="dialog-content">
              <v-container>
                <v-row v-if="paginatedEncounters.length">
                  <v-col
                    v-for="(encounter, index) in paginatedEncounters"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <v-card class="encounter-card" elevation="4" hover>
                      <v-img
                        :src="getImageSrc(encounter.image)"
                        alt="Encounter Image"
                        height="150"
                        contain
                        class="rounded-t"
                      />
                      <v-card-title class="text-center text-subtitle-1 font-weight-medium">
                        {{ encounter.name }}
                      </v-card-title>
                      <v-card-subtitle class="text-center">
                        {{ encounter.location }}
                        <v-btn
                          v-show="encounter.bulbapedia"
                          size="xs"
                          variant="tonal"
                          icon="mdi-link-variant"
                          :href="encounter.bulbapedia"
                        ></v-btn>
                        <v-tooltip activator="parent" location="bottom">
                          {{ encounter.tip || 'No additional location details available.' }}
                        </v-tooltip>
                      </v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col>
                    <v-alert type="info" text="No encounters available for this event." />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-pagination
                v-model="currentPage"
                :length="totalPages"
                :total-visible="5"
                color="white"
                rounded="circle"
                density="compact"
              />
            </v-card-actions>
            <v-card-actions>
              <v-spacer />
              <v-btn color="white" variant="outlined" @click="closeEventDetails">Close</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </v-parallax>
</template>

<style scoped>
.calendar-wrapper {
  overflow-x: auto;
}

.event-dialog-card {
  position: relative;
  overflow: hidden;
}

.dialog-overlay {
  background: rgba(0, 0, 0, 0.7);
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
}

.dialog-content {
  position: relative;
  z-index: 2;
  padding: 0;
}

.encounter-card {
  background: rgba(255, 255, 255, 0.9);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.encounter-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}

.v-theme--dark .encounter-card {
  background: rgba(0, 0, 0, 0.7);
}

.encounter-card .v-card-title,
.encounter-card .v-card-subtitle {
  color: #333 !important;
}

.v-theme--dark .encounter-card .v-card-title,
.v-theme--dark .encounter-card .v-card-subtitle {
  color: #fff !important;
}

.rounded-t {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.v-pagination .v-btn {
  color: white !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.calendar-wrapper :deep(.fc-toolbar) {
  flex-wrap: wrap;
  gap: 0.5rem;
}

.calendar-wrapper :deep(.fc-toolbar-chunk) {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .calendar-wrapper :deep(.fc-toolbar) {
    flex-direction: column;
  }

  .calendar-wrapper :deep(.fc-toolbar-chunk) {
    justify-content: center;
    margin-bottom: 0.5rem;
  }
}
</style>
