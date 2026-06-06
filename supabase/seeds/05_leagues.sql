insert into leagues (id, name, type, region_id)
values
('kanto-league', 'Kanto League', 'regional_league', 'kanto'),
('johto-league', 'Johto League', 'regional_league', 'johto'),
('indigo-league', 'Indigo League', 'federation_league', 'kanto');

insert into league_dependencies values
('indigo-kanto', 'indigo-league', 'kanto-league', 'badge_requirement',
 'Must obtain 8 Kanto badges'),

('indigo-johto', 'indigo-league', 'johto-league', 'badge_requirement',
 'Must obtain 8 Johto badges');


insert into leagues (id, name, type, region_id)
values (
  'hoenn-league',
  'Hoenn League',
  'regional_league',
  'hoenn'
);

insert into leagues (id, name, type, region_id)
values (
  'sinnoh-league',
  'Sinnoh League',
  'regional_league',
  'sinnoh'
);

insert into leagues (id, name, type, region_id)
values (
  'unova-league',
  'Unova League',
  'regional_league',
  'unova'
);

insert into leagues (id, name, type, region_id)
values (
  'kalos-league',
  'Kalos League',
  'regional_league',
  'kalos'
);

insert into leagues (id, name, type, region_id)
values (
  'alola-league',
  'Alola League',
  'regional_league',
  'alola'
);

insert into leagues (id, name, type, region_id)
values (
  'galar-league',
  'Galar League',
  'sporting_league',
  'galar'
);

insert into leagues (id, name, type, region_id)
values (
  'paldea-league',
  'Paldea League',
  'assessment_system',
  'paldea'
);