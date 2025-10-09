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
        image: '/pokepedia-pages/sprites/415.png',
        tip: 'Eterna Forest',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Drifloon',
        location: 'Valley Windworks',
        image: '/pokepedia-pages/sprites/425.png',
        tip: 'East of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valley_Windworks',
      },
      {
        name: 'Drowzee',
        location: "Xatu's Forest",
        image: '/pokepedia-pages/sprites/096.png',
        tip: 'Near Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Xatu%27s_Forest',
      },
      {
        name: 'Duskull',
        location: 'Bewilder Forest',
        image: '/pokepedia-pages/sprites/355.png',
        tip: 'Between Sandgem & Jubilife City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Bewilder_Forest',
      },
      {
        name: 'Feebas',
        location: 'Lake Verity',
        image: '/pokepedia-pages/sprites/349.png',
        tip: 'North of Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Verity',
      },
      {
        name: 'Hatenna',
        location: 'Bewilder Forest',
        image: '/pokepedia-pages/sprites/856.png',
        tip: 'Between Sandgem & Jubilife City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Bewilder_Forest',
      },
      {
        name: 'Hawlucha',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/701.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Noibat',
        location: 'Mt. Coronet',
        image: '/pokepedia-pages/sprites/714.png',
        tip: 'Eterna Side',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Porygon',
        location: 'Trophy Garden',
        image: '/pokepedia-pages/sprites/137.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Trophy_Garden',
      },
      {
        name: 'Slowpoke-Galarian',
        location: 'Lake Psyduck',
        image: '/pokepedia-pages/sprites/079-Galar.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Psyduck',
      },
      {
        name: 'Slugma',
        location: 'Stark Mountain',
        image: '/pokepedia-pages/sprites/218.png',
        tip: 'Battle Zone',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Stark_Mountain',
      },
      {
        name: 'Tengela',
        location: 'Emeragrove Town',
        image: '/pokepedia-pages/sprites/114.png',
        tip: 'Near Hearthome City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Emeragrove_Town',
      },
      {
        name: 'Trapinch',
        location: 'R228',
        image: '/pokepedia-pages/sprites/328.png',
        tip: 'Battle Zone',
      },
      {
        name: 'Wimpod',
        location: 'Sandgem Beach',
        image: '/pokepedia-pages/sprites/767.png',
      },
      {
        name: 'Wooper',
        location: 'Chocovine Town',
        image: '/pokepedia-pages/sprites/194.png',
        tip: 'Southeast of Snowpoint',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Chocovine_Town',
      },
      {
        name: 'Zubat',
        location: 'Oreburgh Gate',
        image: '/pokepedia-pages/sprites/041.png',
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
        image: '/pokepedia-pages/sprites/531.png',
        tip: 'Between Solaceon Town & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Ducklett',
        location: 'Route 219',
        image: '/pokepedia-pages/sprites/580.png',
        tip: 'South of Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_219',
      },
      {
        name: 'Castform',
        location: 'Trophy Garden',
        image: '/pokepedia-pages/sprites/351.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Trophy_Garden',
      },
      {
        name: 'Charmander',
        location: 'Route 221',
        image: '/pokepedia-pages/sprites/004.png',
        tip: 'South-East of Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_221',
      },
      {
        name: 'Karrablast',
        location: 'Valor Forest',
        image: '/pokepedia-pages/sprites/588.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Komala',
        location: 'Sunyshore Wood',
        image: '/pokepedia-pages/sprites/775.png',
        tip: 'Forestry between Lake Valor & Sunyshore City',
      },
      {
        name: 'Mareanie',
        location: 'Long Beach',
        image: '/pokepedia-pages/sprites/747.png',
        tip: 'Beach South of Sunyshore City',
      },
      {
        name: 'Phanpy',
        location: 'Route 207',
        image: '/pokepedia-pages/sprites/231.png',
        tip: 'East of Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_207',
      },
      {
        name: 'Ralts',
        location: 'Route 212',
        image: '/pokepedia-pages/sprites/280.png',
        tip: 'Between Hearthome & Pastoria',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Scorbunny',
        location: 'Pal Park',
        image: '/pokepedia-pages/sprites/813.png',
        tip: 'South East of Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Pal_Park',
      },
      {
        name: 'Slowpoke',
        location: 'Route 205',
        image: '/pokepedia-pages/sprites/079.png',
        tip: 'Between Floaroma & Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_205',
      },
      {
        name: 'Starly',
        location: 'Route 201',
        image: '/pokepedia-pages/sprites/396.png',
        tip: 'Between Twinleaf & Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_201',
      },
      {
        name: 'Stunky',
        location: 'Great Marsh',
        image: '/pokepedia-pages/sprites/434.png',
        tip: 'Pastoria Great Marsh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Great_Marsh',
      },
      {
        name: 'Tentacool',
        location: "Diablo's Bay",
        image: '/pokepedia-pages/sprites/072.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Diablo%27s_Ocean',
      },
      {
        name: 'Torchic',
        location: 'Finit Forest',
        image: '/pokepedia-pages/sprites/255.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Whismur',
        location: 'Ravaged Path',
        image: '/pokepedia-pages/sprites/293.png',
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
        image: '/pokepedia-pages/sprites/840.png',
        tip: 'South West of Pastoria',
      },
      {
        name: 'Bagon',
        location: 'Route 210',
        image: '/pokepedia-pages/sprites/371.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Carvanha',
        location: 'Lake Valor',
        image: '/pokepedia-pages/sprites/318.png',
        tip: 'Between Pastoria, Veilstone, & Sunyshore',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Valor',
      },
      {
        name: 'Chimchar',
        location: 'Route 227',
        image: '/pokepedia-pages/sprites/390.png',
        tip: 'Battle Zone - South of Mt. Stark',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_227',
      },
      {
        name: 'Cryogonal',
        location: 'Mt. Coronet',
        image: '/pokepedia-pages/sprites/615.png',
        tip: 'Snowpoint Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Fennekin',
        location: "Xatu's Forest",
        image: '/pokepedia-pages/sprites/653.png',
        tip: 'Near Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Xatu%27s_Forest',
      },
      {
        name: 'Foongus',
        location: 'Great Marsh',
        image: '/pokepedia-pages/sprites/590.png',
        tip: 'Pastoria Great Marsh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Great_Marsh',
      },
      {
        name: 'Kangaskhan',
        location: 'Valor Forest',
        image: '/pokepedia-pages/sprites/115.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Klink',
        location: 'Mt. Coronet',
        tip: 'Hearthome Entrance',
        image: '/pokepedia-pages/sprites/599.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Ledyba',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/165.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Luvdisc',
        location: 'Old Basin',
        image: '/pokepedia-pages/sprites/370.png',
        tip: 'Lake on Route 210, between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Oranguru',
        location: 'Long Forest',
        image: '/pokepedia-pages/sprites/765.png',
        tip: 'South West of Route 212',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Pancham',
        location: 'Celestic Wood',
        image: '/pokepedia-pages/sprites/674.png',
        tip: 'Forests around Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Celestic_Town',
      },
      {
        name: 'Sigilyph',
        location: 'Solaceon Ruins',
        image: '/pokepedia-pages/sprites/561.png',
        tip: 'East of Solaceon Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Solaceon_Ruins',
      },
      {
        name: 'Smeargle',
        location: 'Route 208',
        image: '/pokepedia-pages/sprites/235.png',
        tip: 'Between Hearthome & Mt Coronet',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_208',
      },
      {
        name: 'Snivy',
        location: 'Great Floaroma Flower Meadow',
        image: '/pokepedia-pages/sprites/495.png',
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
        image: '/pokepedia-pages/sprites/433.png',
        tip: 'Cave between Oreburgh & Jubilife City (2nd Flr)',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_Gate',
      },
      {
        name: 'Clobbopus',
        location: 'Sandgem Beach',
        image: '/pokepedia-pages/sprites/852.png',
      },
      {
        name: 'Corsola-Galarian',
        location: "Diablo's Bay",
        image: '/pokepedia-pages/sprites/222-Galar.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Diablo%27s_Bay',
      },
      {
        name: 'Darumaka-Galarian',
        location: 'Snow-White Woodland',
        image: '/pokepedia-pages/sprites/554-Galar.png',
        tips: 'Forestry around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Goomy',
        location: 'Route 212',
        image: '/pokepedia-pages/sprites/704.png',
        tip: 'Between Hearthome & Pastoria',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Kecleon',
        location: 'Long Forest',
        image: '/pokepedia-pages/sprites/352.png',
        tip: 'South West of Route 212',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Litleo',
        location: 'Sinnoh Grand Forest',
        image: '/pokepedia-pages/sprites/667.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Mawile',
        location: 'Wayward Cave',
        image: '/pokepedia-pages/sprites/303.png',
        tip: 'Along R206, South of Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Wayward_Cave',
      },
      {
        name: 'Minun',
        location: 'Veilstone Wood',
        image: '/pokepedia-pages/sprites/312.png',
        tip: 'Forestry around Veilstone City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Veilstone_City',
      },
      {
        name: 'Oshawott',
        location: 'Majolica Lake',
        image: '/pokepedia-pages/sprites/501.png',
        tip: 'Surrounding Majolica Town, South West of Hearthome',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Majolica_Town',
      },
      {
        name: 'Pikipek',
        location: 'Sunyshore Wood',
        image: '/pokepedia-pages/sprites/731.png',
        tip: 'Forestry around Sunyshore City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sunyshore_City',
      },
      {
        name: 'Riolu',
        location: 'Iron Island',
        image: '/pokepedia-pages/sprites/447.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Iron_Island',
      },
      {
        name: 'Rolycoly',
        location: 'Coal Valley',
        image: '/pokepedia-pages/sprites/837.png',
        tip: 'Caverns and Caves around Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_City',
      },
      {
        name: 'Sandile',
        location: 'Long Beach',
        image: '/pokepedia-pages/sprites/551.png',
        tip: 'Beach South of Sunyshore City',
      },
      {
        name: 'Yamper',
        location: 'Valley Wind Works',
        image: '/pokepedia-pages/sprites/835.png',
        tip: 'East of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valley_Windworks',
      },
      {
        name: 'Wooloo',
        location: 'Route 210',
        image: '/pokepedia-pages/sprites/831.png',
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
        image: '/pokepedia-pages/sprites/069.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Blipbug',
        location: 'Bewilder Forest',
        image: '/pokepedia-pages/sprites/824.png',
        tip: 'Between Sandgem & Jubilife City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Bewilder_Forest',
      },
      {
        name: 'Buizel',
        location: 'Route 205',
        image: '/pokepedia-pages/sprites/418.png',
        tip: 'Between Floaroma & Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_205',
      },
      {
        name: 'Chikorita',
        location: 'Great Floaroma Flower Meadow',
        image: '/pokepedia-pages/sprites/152.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Floaroma_Meadow',
      },
      {
        name: 'Clamperl',
        location: 'Remembrance Bay',
        image: '/pokepedia-pages/sprites/366.png',
        tip: 'Bay Area between Sandgem & Pal Park',
      },
      {
        name: 'Clauncher',
        location: 'Lake Verity',
        image: '/pokepedia-pages/sprites/692.png',
        tip: 'North of Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Verity',
      },
      {
        name: 'Cyndaquil',
        location: 'Pal Wood',
        image: '/pokepedia-pages/sprites/155.png',
        tip: 'South East of Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Pal_Park',
      },
      {
        name: 'Elgyem',
        location: 'Dandelion Island',
        image: '/pokepedia-pages/sprites/605.png',
        tip: 'Around Lily of the Valley Island',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Dandelion_Island',
      },
      {
        name: 'Lunatone',
        location: 'Mt. Coronet',
        image: '/pokepedia-pages/sprites/337.png',
        tip: 'Celestic Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Oricorio',
        location: 'Trophy Garden',
        image: '/pokepedia-pages/sprites/741.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Trophy_Garden',
      },
      {
        name: 'Plusle',
        location: 'Veilstone Wood',
        image: '/pokepedia-pages/sprites/311.png',
        tip: 'Forestry around Veilstone City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Veilstone_City',
      },
      {
        name: 'Sableye',
        location: 'Wayward Cave',
        image: '/pokepedia-pages/sprites/302.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
      {
        name: 'Sizzlipede',
        location: 'Route 206',
        image: '/pokepedia-pages/sprites/850.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
      {
        name: 'Slakoth',
        location: 'Finit Forest',
        image: '/pokepedia-pages/sprites/287.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Snom',
        location: 'Snow-White Woodland',
        image: '/pokepedia-pages/sprites/872.png',
        tips: 'Forestry around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Toxel',
        location: 'Heart Forest',
        image: '/pokepedia-pages/sprites/848.png',
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
        image: '/pokepedia-pages/sprites/846.png',
        tip: 'Between Floaroma & Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_205',
      },
      {
        name: 'Cherubi',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/420.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Chinchou',
        location: 'Sunyshore Lake',
        image: '/pokepedia-pages/sprites/170.png',
        tip: 'North of Arrowroot Town, between Lake Valor & Sunyshore City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Arrowroot_Town',
      },
      {
        name: 'Darumaka',
        location: 'Ravaged Path',
        image: '/pokepedia-pages/sprites/554.png',
        tip: 'Between Jubilife & Floaroma',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Ravaged_Path',
      },
      {
        name: 'Dewpider',
        location: 'Old Basin',
        image: '/pokepedia-pages/sprites/751.png',
        tip: 'Lake on Route 210, between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Durant',
        location: 'Fuego Ironworks',
        image: '/pokepedia-pages/sprites/632.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Fuego_Ironworks',
      },
      {
        name: 'Larvitar',
        location: 'Mt. Shady',
        image: '/pokepedia-pages/sprites/246.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Meditite',
        location: 'Mt. Coronet',
        image: '/pokepedia-pages/sprites/307.png',
        tip: 'Eterna Entrance',

        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Meowth-Galarian',
        location: 'Iron Island',
        image: '/pokepedia-pages/sprites/052-Galar.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Iron_Island',
      },
      {
        name: 'Patrat',
        location: 'Finit Forest',
        image: '/pokepedia-pages/sprites/504.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Shuppet',
        location: 'Valor Forest',
        image: '/pokepedia-pages/sprites/353.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Yanma',
        location: 'Great Marsh',
        image: '/pokepedia-pages/sprites/193.png',
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
        image: '/pokepedia-pages/sprites/746.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Dratini',
        location: 'Mt. Coronet',
        image: '/pokepedia-pages/sprites/147.png',
        tip: 'Underground Lake',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Mudkip',
        location: 'Lake Valor (Cave)',
        image: '/pokepedia-pages/sprites/258.png',
        tip: 'Between Pastoria, Veilstone, & Sunyshore',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Valor',
      },
      {
        name: 'Totodile',
        location: 'Lake Verity (Cave)',
        image: '/pokepedia-pages/sprites/158.png',
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
        image: '/pokepedia-pages/sprites/359.png',
        tip: 'Between Veilstone & Pastoria',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sendoff_Spring',
      },
      {
        name: 'Archen',
        location: 'Oreburgh Mining Complex',
        image: '/pokepedia-pages/sprites/566.png',
        tip: 'South of Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_Mine',
      },
      {
        name: 'Bulbasaur',
        location: 'Sinnoh Grand Forest',
        image: '/pokepedia-pages/sprites/001.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Deerling',
        location: 'Valor Forest',
        image: '/pokepedia-pages/sprites/585.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Elekid',
        location: 'Fuego Ironworks',
        image: '/pokepedia-pages/sprites/239.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Fuego_Ironworks',
      },
      {
        name: 'Fletchling',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/661.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Indeedee',
        location: 'Route 212 (Northern)',
        image: '/pokepedia-pages/sprites/876.png',
        tip: 'Between Hearthome & Pastoria',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Mime Jr.',
        location: 'Route 209',
        image: '/pokepedia-pages/sprites/439.png',
        tip: 'Between Hearthome & Solaceon',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_209',
      },
      {
        name: 'Munchlax',
        location: 'Valor Forest',
        image: '/pokepedia-pages/sprites/446.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Petilil',
        location: 'Route 229',
        image: '/pokepedia-pages/sprites/548.png',
        tip: 'North of Resort Area',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_229',
      },
      {
        name: 'Poochyena',
        location: 'Celestic Wood',
        image: '/pokepedia-pages/sprites/261.png',
        tip: 'Forests around Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Celestic_Town',
      },
      {
        name: 'Rockruff',
        location: 'Ravaged Path',
        image: '/pokepedia-pages/sprites/744.png',
        tip: 'Between Jubilife & Floaroma',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Ravaged_Path',
      },
      {
        name: 'Salandit',
        location: 'Survival Area',
        image: '/pokepedia-pages/sprites/757.png',
        tip: '',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Survival_Area',
      },
      {
        name: 'Swinub',
        location: 'Mt. Coronet',
        image: '/pokepedia-pages/sprites/220.png',
        tip: 'Snowpoint Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Turtwig',
        location: 'Finit Forest',
        image: '/pokepedia-pages/sprites/387.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Wingull',
        location: 'Remembrance Bay',
        image: '/pokepedia-pages/sprites/278.png',
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
        image: '/pokepedia-pages/sprites/688.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Diablo%27s_Bay',
      },
      {
        name: 'Budew',
        location: 'Sinnoh Grand Forest',
        image: '/pokepedia-pages/sprites/406.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Buneary',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/427.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Caterpie',
        location: 'Finit Forest',
        image: '/pokepedia-pages/sprites/010.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Cleffa',
        location: 'Mt. Coronet',
        image: '/pokepedia-pages/sprites/173.png',
        tip: 'Hearthome Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Dreepy',
        location: 'Mt. Shady',
        image: '/pokepedia-pages/sprites/885.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Goldeen',
        location: 'Pastoria Bay',
        image: '/pokepedia-pages/sprites/118.png',
        tip: "Bay Area on Pastoria's East",
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Pastoria_City',
      },
      {
        name: 'Growlithe',
        location: 'Valor Forest',
        image: '/pokepedia-pages/sprites/058.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Kricketot',
        location: 'Finit Forest',
        image: '/pokepedia-pages/sprites/401.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Litwick',
        location: 'Lost Tower',
        image: '/pokepedia-pages/sprites/607.png',
        tip: 'South of Solaceon Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lost_Tower',
      },
      {
        name: 'Magnemite',
        location: 'Valley Wind Works',
        image: '/pokepedia-pages/sprites/081.png',
        tip: 'East of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valley_Windworks',
      },
      {
        name: 'Numel',
        location: 'Route 228',
        image: '/pokepedia-pages/sprites/322.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Route_228',
      },
      {
        name: 'Popplio',
        location: 'Lake Acuity',
        image: '/pokepedia-pages/sprites/728.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Scraggy',
        location: 'Route 225',
        image: '/pokepedia-pages/sprites/559.png',
        tip: 'Between Fight & Survival Area',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_225',
      },
      {
        name: 'Shieldon',
        location: 'Oreburgh Mining Complex',
        image: '/pokepedia-pages/sprites/410.png',
        tip: 'South of Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_Mine',
      },
      {
        name: 'Sobble',
        location: 'Sendoff Spring',
        image: '/pokepedia-pages/sprites/816.png',
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
        image: '/pokepedia-pages/sprites/374.png',
        tip: 'South of Snowpoint City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Metagross_Mountain',
      },
      {
        name: 'Bergmite',
        location: 'Lake Acuity (Banks)',
        image: '/pokepedia-pages/sprites/712.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Cottonee',
        location: 'Great Floaroma Flower Meadow',
        image: '/pokepedia-pages/sprites/546.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Floaroma_Meadow',
      },
      {
        name: 'Exeggcute',
        location: 'Heart Forest',
        image: '/pokepedia-pages/sprites/102.png',
        tip: 'South West of Pastoria',
      },
      {
        name: 'Fomantis',
        location: 'Sunyshore Wood',
        image: '/pokepedia-pages/sprites/753.png',
        tip: 'Forestry between Lake Valor & Sunyshore City',
      },
      {
        name: 'Froakie',
        location: 'Lake Verity',
        image: '/pokepedia-pages/sprites/656.png',
        tip: 'North of Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Verity',
      },
      {
        name: 'Helioptile',
        location: 'Valley Wind Works',
        image: '/pokepedia-pages/sprites/694.png',
        tip: 'East of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valley_Windworks',
      },
      {
        name: 'Magby',
        location: 'Fuego Iron Works',
        image: '/pokepedia-pages/sprites/240.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Fuego_Ironworks',
      },
      {
        name: 'Pawniard',
        location: 'Iron Island',
        image: '/pokepedia-pages/sprites/624.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Iron_Island',
      },
      {
        name: 'Rowlet',
        location: 'Sinnoh Grand Forest',
        image: '/pokepedia-pages/sprites/722.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Sandshrew-Alolan',
        location: 'Mt. Coronet',
        image: '/pokepedia-pages/sprites/027-Alola.png',
        tip: 'Snowpoint Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Snowpoint_Entrance',
      },
      {
        name: 'Shelmet',
        location: 'Celestic Wood',
        image: '/pokepedia-pages/sprites/616.png',
        tip: 'Forests around Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Celestic_Town',
      },
      {
        name: 'Sinistea',
        location: 'Lost Tower (Top Floor)',
        image: '/pokepedia-pages/sprites/854.png',
        tip: 'South of Solaceon Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lost_Tower',
      },
      {
        name: 'Snorunt',
        location: 'Snow-White Woodland (North)',
        image: '/pokepedia-pages/sprites/361.png',
        tips: 'Forestry around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Snover',
        location: 'Snow-White Woodland (South)',
        image: '/pokepedia-pages/sprites/459.png',
        tips: 'Forestry around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Solosis',
        location: "Xatu's Forest",
        image: '/pokepedia-pages/sprites/577.png',
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
        image: '/pokepedia-pages/sprites/063.png',
        tip: 'Between Sandgem & Jubilife City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Bewilder_Forest',
      },
      {
        name: 'Aron',
        location: 'Coal Valley',
        image: '/pokepedia-pages/sprites/304.png',
        tip: 'Caverns and Caves around Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_City',
      },
      {
        name: 'Axew',
        location: 'Mt. Shady',
        image: '/pokepedia-pages/sprites/610.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Bronzor',
        location: 'Mt. Coronet ',
        image: '/pokepedia-pages/sprites/436.png',
        tip: 'Eterna Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Crabrawler',
        location: 'Long Forest',
        image: '/pokepedia-pages/sprites/739.png',
        tip: 'South West of Route 212',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Deino',
        location: 'Mt. Shady',
        image: '/pokepedia-pages/sprites/633.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Dwebble',
        location: 'Oreburgh Mining Complex',
        image: '/pokepedia-pages/sprites/557.png',
        tip: 'South of Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_Mine',
      },
      {
        name: 'Eevee',
        location: 'Finit Forest',
        image: '/pokepedia-pages/sprites/133.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Geodude-Alolan',
        location: 'Mt. Coronet (Hearthome Entrance)',
        image: '/pokepedia-pages/sprites/074-Alola.png',
        tip: 'Hearthome Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Lickitung',
        location: 'Route 214',
        image: '/pokepedia-pages/sprites/108.png',
        tip: 'South of Veilstone',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_214',
      },
      {
        name: 'Nidoran-F',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/029.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Pansear',
        location: 'Veilstone Wood',
        image: '/pokepedia-pages/sprites/513.png',
        tip: 'Forestry around Veilstone City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Veilstone_City',
      },
      {
        name: 'Pinsir',
        location: 'Route 210',
        image: '/pokepedia-pages/sprites/127.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Ponyta',
        location: 'Route 206',
        image: '/pokepedia-pages/sprites/077.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
      {
        name: 'Roggenrola',
        location: 'Wayward Cave',
        image: '/pokepedia-pages/sprites/524.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
      {
        name: 'Zorua',
        location: 'Route 208',
        image: '/pokepedia-pages/sprites/570.png',
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
        image: '/pokepedia-pages/sprites/522.png',
        tip: 'East of Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_207',
      },
      {
        name: 'Croagunk',
        location: 'Great Marsh',
        image: '/pokepedia-pages/sprites/453.png',
        tip: 'Pastoria Great Marsh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Great_Marsh',
      },
      {
        name: 'Frillish',
        location: 'Pastoria Bay',
        image: '/pokepedia-pages/sprites/592.png',
        tip: "Bay Area on Pastoria's East",
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Pastoria_City',
      },
      {
        name: 'Grubbin',
        location: 'Heart Forest',
        image: '/pokepedia-pages/sprites/736.png',
        tip: 'South West of Pastoria',
      },
      {
        name: 'Inkay',
        location: "Xatu's Forest",
        image: '/pokepedia-pages/sprites/686.png',
        tip: 'Near Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Xatu%27s_Forest',
      },
      {
        name: 'Miltank',
        location: 'Route 210',
        image: '/pokepedia-pages/sprites/241.png',
        tip: 'Between Solaceon & Celestic Town - Southern Half',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Oddish',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/043.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Paras',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/046.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Pichu',
        location: 'Lily Valley Wood',
        image: '/pokepedia-pages/sprites/172.png',
        tip: 'Lily of the Valley Island',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lily_of_the_Valley_Island',
      },
      {
        name: 'Pidove',
        location: 'Route 204',
        image: '/pokepedia-pages/sprites/519.png',
        tip: 'Between Floaroma & Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_204',
      },
      {
        name: 'Qwilfish',
        location: 'Old Basin',
        image: '/pokepedia-pages/sprites/211.png',
        tip: 'Lake on Route 210, between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Shroomish',
        location: 'Sinnoh Grand Forest',
        image: '/pokepedia-pages/sprites/285.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Skrelp',
        location: 'Heart Forest (Lake)',
        image: '/pokepedia-pages/sprites/690.png',
        tip: 'South West of Pastoria',
      },
      {
        name: 'Swablu',
        location: 'Route 210 ',
        image: '/pokepedia-pages/sprites/333.png',
        tip: 'Between Solaceon & Celestic Town - Northern Half',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Treecko',
        location: 'Sunyshore Forest',
        image: '/pokepedia-pages/sprites/252.png',
        tip: 'Forestry between Lake Valor & Sunyshore City',
      },
      {
        name: 'Venonat',
        location: 'Route 215',
        image: '/pokepedia-pages/sprites/048.png',
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
        image: '/pokepedia-pages/sprites/399.png',
        tip: 'Between Sandgem & Jubilife',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_202',
      },
      {
        name: 'Dunsparce',
        location: 'Wayward Cave',
        image: '/pokepedia-pages/sprites/206.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
      {
        name: 'Houndour',
        location: 'Valor Forest',
        image: '/pokepedia-pages/sprites/228.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Horsea',
        location: 'Lake Acuity',
        image: '/pokepedia-pages/sprites/116.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Illumise',
        location: 'Long Forest',
        image: '/pokepedia-pages/sprites/314.png',
        tip: 'South West of Route 212',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Joltik',
        location: 'Finit Forest',
        image: '/pokepedia-pages/sprites/595.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Litten',
        location: 'Sunyshore Wood',
        image: '/pokepedia-pages/sprites/725.png',
        tip: 'Forestry between Lake Valor & Sunyshore City',
      },
      {
        name: 'Munna',
        location: 'Bewilder Forest',
        image: '/pokepedia-pages/sprites/517.png',
        tip: 'Between Sandgem & Jubilife City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Bewilder_Forest',
      },
      {
        name: 'Pansage',
        location: 'Finit Forest',
        image: '/pokepedia-pages/sprites/511.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Rookidee',
        location: 'Iron Island',
        image: '/pokepedia-pages/sprites/821.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Iron_Island',
      },
      {
        name: 'Sewaddle',
        location: 'Celestic Wood',
        image: '/pokepedia-pages/sprites/540.png',
        tip: 'Forests around Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Celestic_Town',
      },
      {
        name: 'Solrock',
        location: 'Mt. Coronet',
        image: '/pokepedia-pages/sprites/338.png',
        tip: 'Eterna Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Stufful',
        location: 'Pal Wood',
        image: '/pokepedia-pages/sprites/759.png',
        tip: 'South East of Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Pal_Park',
      },
      {
        name: 'Vanillite',
        location: 'Snow-White Woodland',
        image: '/pokepedia-pages/sprites/582.png',
        tips: 'Forestry around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Wynaut',
        location: 'Route 210',
        image: '/pokepedia-pages/sprites/360.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Zigzagoon-Galarian',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/263-Galar.png',
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
        image: '/pokepedia-pages/sprites/659.png',
        tip: 'Between Hearthome & Mt Coronet',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_208',
      },
      {
        name: 'Emolga',
        location: 'Sunyshore Wood',
        image: '/pokepedia-pages/sprites/587.png',
        tip: 'Forestry between Lake Valor & Sunyshore City',
      },
      {
        name: 'Glameow',
        location: 'Valor Forest',
        image: '/pokepedia-pages/sprites/431.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Happiny',
        location: 'Route 210',
        image: '/pokepedia-pages/sprites/440.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Heracross',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/214.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Hoothoot',
        location: 'Finit Wood',
        image: '/pokepedia-pages/sprites/163.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Jangmo-o',
        location: 'Mt. Shady',
        image: '/pokepedia-pages/sprites/782.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Lapras',
        location: 'Remembrance Bay',
        image: '/pokepedia-pages/sprites/131.png',
        tip: 'Bay Area between Sandgem & Palpark',
      },
      {
        name: 'Nincada',
        location: 'Sinnoh Grand Forest',
        image: '/pokepedia-pages/sprites/290.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Panpour',
        location: 'Celestic Wood',
        image: '/pokepedia-pages/sprites/515.png',
        tip: 'Forests around Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Celestic_Town',
      },
      {
        name: 'Poliwag',
        location: 'Psyduck Lake',
        image: '/pokepedia-pages/sprites/060.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Psyduck',
      },
      {
        name: 'Pyukumuku',
        location: 'Long Beach',
        image: '/pokepedia-pages/sprites/771.png',
        tip: 'Beach South of Sunyshore City',
      },
      {
        name: 'Remoraid',
        location: 'Pastoria Bay',
        image: '/pokepedia-pages/sprites/223.png',
        tip: "Bay Area on Pastoria's East",
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Pastoria_City',
      },
      {
        name: 'Shellos',
        location: 'Route 213',
        image: '/pokepedia-pages/sprites/422.png',
        tip: 'East of Pastoria',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_213',
      },
      {
        name: 'Skitty',
        location: 'Veilstone Wood',
        image: '/pokepedia-pages/sprites/300.png',
        tip: 'Forestry around Veilstone City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Veilstone_City',
      },
      {
        name: 'Wurmple',
        location: 'Long Forest',
        image: '/pokepedia-pages/sprites/265.png',
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
        image: '/pokepedia-pages/sprites/347.png',
        tip: 'Bay Area between Sandgem & Palpark',
      },
      {
        name: 'Bounsweet',
        location: 'Long Forest',
        image: '/pokepedia-pages/sprites/761.png',
        tip: 'South West of Route 212',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212',
      },
      {
        name: 'Cramorant',
        location: 'Pastoria Bay',
        image: '/pokepedia-pages/sprites/845.png',
        tip: "Bay Area on Pastoria's East",
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Pastoria_City',
      },
      {
        name: 'Flabébé',
        location: 'Great Floaroma Flower Field',
        image: '/pokepedia-pages/sprites/669.png',
        tip: 'North of Floaroma Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Floaroma_Meadow',
      },
      {
        name: 'Gothita',
        location: 'Finit Forest',
        image: '/pokepedia-pages/sprites/574.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Minccino',
        location: 'Sinnoh Grand Forest',
        image: '/pokepedia-pages/sprites/572.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Nuzleaf',
        location: 'Heart Forest',
        image: '/pokepedia-pages/sprites/274.png',
        tip: 'South West of Pastoria',
      },
      {
        name: 'Onix',
        location: 'Coal Valley',
        image: '/pokepedia-pages/sprites/095.png',
        tip: 'Caverns and Caves around Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_City',
      },
      {
        name: 'Pineco',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/204.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Snubbull',
        location: 'Valor Forest',
        image: '/pokepedia-pages/sprites/209.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Stunfisk',
        location: 'Long Beach',
        image: '/pokepedia-pages/sprites/618.png',
        tip: 'Beach South of Sunyshore City',
      },
      {
        name: 'Tepig',
        location: 'Pal Wood',
        image: '/pokepedia-pages/sprites/498.png',
        tip: 'South East of Sandgem',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Pal_Park',
      },
      {
        name: 'Tropius',
        location: 'Veilstone Wood',
        image: '/pokepedia-pages/sprites/357.png',
        tip: 'Forestry around Veilstone City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Veilstone_City',
      },
      {
        name: 'Turtonator',
        location: 'Mt. Stark',
        image: '/pokepedia-pages/sprites/776.png',
        tip: 'Battle Zone',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Stark_Mountain',
      },
      {
        name: 'Tyrogue',
        location: 'Mt. Shady',
        image: '/pokepedia-pages/sprites/236.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Tynamo',
        location: 'Mt. Coronet',
        image: '/pokepedia-pages/sprites/602.png',
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
        image: '/pokepedia-pages/sprites/441.png',
        tip: 'Forestry between Lake Valor & Sunyshore City',
      },
      {
        name: 'Duraludon',
        location: 'Iron Island',
        image: '/pokepedia-pages/sprites/884.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Iron_Island',
      },
      {
        name: "Farfetch'd-Galarian",
        location: 'Valor Forest',
        image: '/pokepedia-pages/sprites/083-Galar.png',
        tip: 'Forestry around Lake Valor',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Valor_Lakefront',
      },
      {
        name: 'Gastly',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/092.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Hippopotas',
        location: 'Route 214',
        image: '/pokepedia-pages/sprites/449.png',
        tip: 'South of Veilstone',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_214',
      },
      {
        name: 'Larvesta',
        location: 'Route 227',
        image: '/pokepedia-pages/sprites/636.png',
        tip: 'Battle Zone - South of Mt. Stark',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_227',
      },
      {
        name: 'Pidgey',
        location: 'Route 202',
        image: '/pokepedia-pages/sprites/016.png',
        tip: 'Between Sandgem & Jubilife',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_202',
      },
      {
        name: 'Rattata-Alolan',
        location: 'Route 202',
        image: '/pokepedia-pages/sprites/019-Alola.png',
        tip: 'Between Sandgem & Jubilife',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_202',
      },
      {
        name: 'Scyther',
        location: 'Route 210',
        image: '/pokepedia-pages/sprites/123.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210',
      },
      {
        name: 'Shellder',
        location: 'Snowpoint Bay',
        image: '/pokepedia-pages/sprites/090.png',
        tip: 'Water-body South of Snowpoint',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Snowpoint_City',
      },
      {
        name: 'Shinx',
        location: 'Route 204',
        image: '/pokepedia-pages/sprites/403.png',
        tip: 'Between Floaroma & Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_204',
      },
      {
        name: 'Swirlix',
        location: 'Route 205',
        image: '/pokepedia-pages/sprites/684.png',
        tip: 'Between Floaroma & Eterna',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_205',
      },
      {
        name: 'Taillow',
        location: 'Route 203',
        image: '/pokepedia-pages/sprites/276.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_203',
      },
      {
        name: 'Throh',
        location: 'Veilstone Wood',
        image: '/pokepedia-pages/sprites/538.png',
        tip: 'Forestry around Veilstone City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Veilstone_City',
      },
      {
        name: 'Tyrunt',
        location: 'Mt. Shady',
        image: '/pokepedia-pages/sprites/696.png',
        tip: 'South of Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Shady',
      },
      {
        name: 'Vulpix',
        location: 'Route 206',
        image: '/pokepedia-pages/sprites/037.png',
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
        image: '/pokepedia-pages/sprites/343.png',
        tip: 'Around Lily of the Valley Island',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Dandelion_Island',
      },
      {
        name: 'Chewtle',
        location: 'Ravaged Path',
        image: '/pokepedia-pages/sprites/833.png',
        tip: 'Between Jubilife & Floaroma',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Ravaged_Path',
      },
      {
        name: 'Cubone',
        location: 'Coal Valley',
        image: '/pokepedia-pages/sprites/104.png',
        tip: 'Caverns and Caves around Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Oreburgh_City',
      },
      {
        name: 'Drilbur',
        location: 'Mt. Coronet',
        image: '/pokepedia-pages/sprites/529.png',
        tip: 'Hearthome Entrance',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet',
      },
      {
        name: 'Ekans',
        location: 'Celestic Wood',
        image: '/pokepedia-pages/sprites/023.png',
        tip: 'Forests around Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Celestic_Town',
      },
      {
        name: 'Finneon',
        location: 'Lake Valor',
        image: '/pokepedia-pages/sprites/456.png',
        tip: 'Between Pastoria, Veilstone, & Sunyshore',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Valor',
      },
      {
        name: 'Gligar',
        location: 'Route 206',
        image: '/pokepedia-pages/sprites/207.png',
        tip: 'Between Eterna & Oreburgh',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206',
      },
      {
        name: 'Grookey',
        location: 'Finit Forest',
        image: '/pokepedia-pages/sprites/810.png',
        tip: 'South East of Eterna',
      },
      {
        name: 'Natu',
        location: "Xatu's Forest",
        image: '/pokepedia-pages/sprites/177.png',
        tip: 'Near Twinleaf Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Xatu%27s_Forest',
      },
      {
        name: 'Nidoran-M',
        location: 'Eterna Forest',
        image: '/pokepedia-pages/sprites/032.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest',
      },
      {
        name: 'Purrloin',
        location: 'Sinnoh Grand Forest',
        image: '/pokepedia-pages/sprites/509.png',
        tip: 'Between Sandgem & Jubilife',
      },
      {
        name: 'Seel',
        location: 'Lake Acuity',
        image: '/pokepedia-pages/sprites/086.png',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Skarmory',
        location: 'Iron Island',
        image: '/pokepedia-pages/sprites/227.png',
        tip: 'North of Canalave City',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Iron_Island',
      },
      {
        name: 'Smoochum',
        location: 'Snow-White Woodland',
        image: '/pokepedia-pages/sprites/238.png',
        tips: 'Forestry around Lake Acuity',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Acuity',
      },
      {
        name: 'Surskit',
        location: 'Lake Psyduck',
        image: '/pokepedia-pages/sprites/283.png',
        tip: 'Between Solaceon & Celestic Town',
        bulbapedia: 'https://bulbapedia.bulbagarden.net/wiki/Lake_Psyduck',
      },
      {
        name: 'Vulpix-Alolan',
        location: 'Acuity Lakefront',
        image: '/pokepedia-pages/sprites/037-Alola.png',
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
                        :src="encounter.image"
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
