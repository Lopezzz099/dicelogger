-- Datos base del sistema D&D 5e (contenido abierto del SRD) para que la
-- app tenga algo con qué poblar los selectores de crear personaje.
-- Corré esto DESPUÉS de schema.sql, una sola vez.
-- Cubre: razas, clases, trasfondos, habilidades y sus relaciones.
-- Todavía faltan armas/armaduras/objetos/hechizos — se agregan aparte
-- más adelante si el flujo de creación de personaje los llega a pedir.

-- ============ Habilidades (skills) ============

INSERT INTO skill (name, stat) VALUES
('Acrobacias', 'dex'),
('Trato con Animales', 'wiz'),
('Arcanos', 'int'),
('Atletismo', 'str'),
('Engaño', 'cha'),
('Historia', 'int'),
('Perspicacia', 'wiz'),
('Intimidación', 'cha'),
('Investigación', 'int'),
('Medicina', 'wiz'),
('Naturaleza', 'int'),
('Percepción', 'wiz'),
('Interpretación', 'cha'),
('Persuasión', 'cha'),
('Religión', 'int'),
('Juego de Manos', 'dex'),
('Sigilo', 'dex'),
('Supervivencia', 'wiz');

-- ============ Proficiencias (armadura / armas / herramientas, no habilidades) ============

INSERT INTO proficiency (name, type) VALUES
('Armadura Ligera', 'armor'),
('Armadura Media', 'armor'),
('Armadura Pesada', 'armor'),
('Escudos', 'armor'),
('Armas Simples', 'weapon'),
('Armas Marciales', 'weapon'),
('Herramientas de Ladrón', 'tool'),
('Instrumento Musical', 'tool'),
('Set de Juego', 'tool'),
('Kit de Herbolario', 'tool'),
('Herramientas de Falsificador', 'tool'),
('Espada Larga', 'weapon'),
('Espada Corta', 'weapon'),
('Hacha de Batalla', 'weapon'),
('Hacha de Mano', 'weapon'),
('Martillo Ligero', 'weapon'),
('Martillo de Guerra', 'weapon'),
('Ballesta de Mano', 'weapon'),
('Estoque', 'weapon'),
('Arco Corto', 'weapon'),
('Arco Largo', 'weapon');

-- ============ Razas ============
-- Los valores de str/dex/int/con/wiz/cha son los bonos de característica
-- que otorga la raza (no stats absolutos).

INSERT INTO race (name, description, speed, str, dex, `int`, con, wiz, cha) VALUES
('Humano', 'Versátiles y ambiciosos, los humanos son la raza más común y adaptable.', 30, 1,1,1,1,1,1),
('Elfo', 'Gráciles y longevos, con sentidos agudos y una conexión innata con la magia.', 30, 0,2,1,0,0,0),
('Enano', 'Robustos y resistentes, herederos de una larga tradición de forja y guerra.', 25, 2,0,0,2,0,0),
('Mediano', 'Pequeños y sigilosos, sorprendentemente valientes para su tamaño.', 25, 0,2,0,0,0,1),
('Dracónido', 'Descendientes de dragones, con aliento elemental y orgullo ancestral.', 30, 2,0,0,0,0,1),
('Gnomo', 'Curiosos e ingeniosos, con un talento natural para la magia y la invención.', 25, 0,1,2,0,0,0),
('Semielfo', 'Herederos de dos mundos, combinan la versatilidad humana con la gracia élfica.', 30, 0,1,0,0,1,2),
('Semiorco', 'Fuertes y resilientes, forjados por un mundo que rara vez les da tregua.', 30, 2,0,0,1,0,0),
('Tiefling', 'Marcados por un pacto infernal ancestral en su linaje, astutos y carismáticos.', 30, 0,0,1,0,0,2);

-- Proficiencias de arma que otorgan algunas razas
INSERT INTO race_proficiency (race_id, proficiency_id)
SELECT r.race_id, p.proficiency_id FROM race r, proficiency p
WHERE (r.name='Enano' AND p.name IN ('Hacha de Batalla','Hacha de Mano','Martillo Ligero','Martillo de Guerra'))
   OR (r.name='Elfo' AND p.name IN ('Espada Larga','Espada Corta','Arco Corto','Arco Largo'));

-- ============ Clases ============

INSERT INTO class (name, description, proficiency_bonus, hit_dice, armor_proficiencies, weapon_proficiencies, tool_proficiencies, spellcasting_ability) VALUES
('Bárbaro', 'Guerrero primitivo que canaliza una furia incontrolable en combate.', 2, '1d12', 'Ligera, Media, Escudos', 'Simples, Marciales', 'Ninguna', NULL),
('Bardo', 'Artista mágico que teje hechizos con música e historias.', 2, '1d8', 'Ligera', 'Simples, Ballesta de mano, Espada larga, Estoque, Espada corta', 'Tres instrumentos musicales', 'cha'),
('Clérigo', 'Sirviente de un poder divino, sana y castiga en nombre de su deidad.', 2, '1d8', 'Ligera, Media, Escudos', 'Simples', 'Ninguna', 'wiz'),
('Druida', 'Guardián de la naturaleza con el poder de transformarse en bestia.', 2, '1d8', 'Ligera, Media (no metálica), Escudos (no metálicos)', 'Simples (no metálicas)', 'Kit de Herbolario', 'wiz'),
('Guerrero', 'Maestro del combate marcial, versátil con cualquier arma o armadura.', 2, '1d10', 'Ligera, Media, Pesada, Escudos', 'Simples, Marciales', 'Ninguna', NULL),
('Monje', 'Artista marcial que canaliza energía interior en golpes precisos.', 2, '1d8', 'Ninguna', 'Simples, Espada corta', 'Un instrumento musical o set de herramientas de artesano', NULL),
('Paladín', 'Guerrero sagrado unido por un juramento a una causa superior.', 2, '1d10', 'Ligera, Media, Pesada, Escudos', 'Simples, Marciales', 'Ninguna', 'cha'),
('Explorador', 'Cazador y rastreador experto en tierras salvajes.', 2, '1d10', 'Ligera, Media, Escudos', 'Simples, Marciales', 'Ninguna', 'wiz'),
('Pícaro', 'Experto en sigilo, trampas y golpes certeros por la espalda.', 2, '1d8', 'Ligera', 'Simples, Ballesta de mano, Espada larga, Estoque, Espada corta', 'Herramientas de Ladrón', NULL),
('Hechicero', 'Lanzador de conjuros cuyo poder mágico nace de su propia sangre.', 2, '1d6', 'Ninguna', 'Dagas, Dardos, Honda, Bastón, Ballesta ligera', 'Ninguna', 'cha'),
('Brujo', 'Lanzador de conjuros que obtiene su poder de un pacto con una entidad.', 2, '1d8', 'Ligera', 'Simples', 'Ninguna', 'cha'),
('Mago', 'Erudito arcano que da forma a la realidad mediante el estudio de la magia.', 2, '1d6', 'Ninguna', 'Dagas, Dardos, Honda, Bastón, Ballesta ligera', 'Ninguna', 'int');

INSERT INTO class_proficiency (class_id, proficiency_id)
SELECT c.class_id, p.proficiency_id FROM class c, proficiency p WHERE
  (c.name='Bárbaro' AND p.name IN ('Armadura Ligera','Armadura Media','Escudos','Armas Simples','Armas Marciales')) OR
  (c.name='Bardo' AND p.name IN ('Armadura Ligera','Armas Simples','Ballesta de Mano','Espada Larga','Estoque','Espada Corta','Instrumento Musical')) OR
  (c.name='Clérigo' AND p.name IN ('Armadura Ligera','Armadura Media','Escudos','Armas Simples')) OR
  (c.name='Druida' AND p.name IN ('Armadura Ligera','Armadura Media','Escudos','Armas Simples','Kit de Herbolario')) OR
  (c.name='Guerrero' AND p.name IN ('Armadura Ligera','Armadura Media','Armadura Pesada','Escudos','Armas Simples','Armas Marciales')) OR
  (c.name='Monje' AND p.name IN ('Armas Simples','Espada Corta')) OR
  (c.name='Paladín' AND p.name IN ('Armadura Ligera','Armadura Media','Armadura Pesada','Escudos','Armas Simples','Armas Marciales')) OR
  (c.name='Explorador' AND p.name IN ('Armadura Ligera','Armadura Media','Escudos','Armas Simples','Armas Marciales')) OR
  (c.name='Pícaro' AND p.name IN ('Armadura Ligera','Armas Simples','Ballesta de Mano','Espada Larga','Estoque','Espada Corta','Herramientas de Ladrón')) OR
  (c.name='Hechicero' AND p.name IN ('Espada Corta')) OR
  (c.name='Brujo' AND p.name IN ('Armadura Ligera','Armas Simples')) OR
  (c.name='Mago' AND p.name IN ('Espada Corta'));

-- ============ Tiradas de salvación por clase ============

INSERT INTO saving_throws (class_id, str, dex, `int`, con, wiz, cha)
SELECT class_id,
  CASE name WHEN 'Bárbaro' THEN 1 WHEN 'Guerrero' THEN 1 WHEN 'Monje' THEN 1 WHEN 'Explorador' THEN 1 ELSE 0 END,
  CASE name WHEN 'Bardo' THEN 1 WHEN 'Monje' THEN 1 WHEN 'Explorador' THEN 1 WHEN 'Pícaro' THEN 1 ELSE 0 END,
  CASE name WHEN 'Druida' THEN 1 WHEN 'Pícaro' THEN 1 WHEN 'Mago' THEN 1 ELSE 0 END,
  CASE name WHEN 'Bárbaro' THEN 1 WHEN 'Guerrero' THEN 1 WHEN 'Hechicero' THEN 1 ELSE 0 END,
  CASE name WHEN 'Clérigo' THEN 1 WHEN 'Druida' THEN 1 WHEN 'Paladín' THEN 1 WHEN 'Brujo' THEN 1 WHEN 'Mago' THEN 1 ELSE 0 END,
  CASE name WHEN 'Bardo' THEN 1 WHEN 'Clérigo' THEN 1 WHEN 'Paladín' THEN 1 WHEN 'Hechicero' THEN 1 WHEN 'Brujo' THEN 1 ELSE 0 END
FROM class;

-- ============ Trasfondos ============

INSERT INTO background (name, languages, personality_traits, ideals, bond, flaws, trait, tool_proficiencies) VALUES
('Acólito', 'Dos idiomas a elección', 'Cito escrituras sagradas en cualquier ocasión, incluso inoportuna.', 'Fe: Confío en que mi deidad guiará mis acciones.', 'Todo lo que hago es por el templo que me crió.', 'Sospecho de quienes no comparten mi fe.', 'Refugio del templo: los templos de mi fe me dan techo y comida.', 'Ninguna'),
('Criminal', 'Ninguno adicional', 'Siempre tengo un plan de escape para cualquier situación.', 'Libertad: las cadenas están hechas para romperse.', 'Le debo todo a mi mentor del bajo mundo.', 'Cuando alguien me demuestra amabilidad, sospecho de una trampa.', 'Contacto criminal: tengo un contacto fiable en el bajo mundo.', 'Herramientas de Ladrón, Set de Juego'),
('Héroe del Pueblo', 'Un idioma a elección', 'Juzgo a la gente por sus actos, no por su cuna.', 'Destino: nada puede desviarme de mi propósito.', 'Protejo a quienes no pueden protegerse a sí mismos.', 'La gente que teme al mal a menudo termina haciéndolo ella misma.', 'Hospitalidad rústica: la gente común me esconde de la ley.', 'Herramientas de Artesano'),
('Noble', 'Un idioma a elección', 'Espero que la gente haga lo que le pido sin cuestionarlo.', 'Nobleza obliga: mi estatus me exige actuar con generosidad.', 'Todo lo que hago es por el nombre de mi familia.', 'Uso mi título para intimidar a quienes están por debajo de mí.', 'Posición privilegiada: soy bien recibido en la alta sociedad.', 'Set de Juego'),
('Sabio', 'Dos idiomas a elección', 'Uso palabras rebuscadas para parecer más culto de lo que soy.', 'Conocimiento: el camino al poder pasa por el saber.', 'Mi vida se dedica a completar un gran tratado teórico.', 'Ignoro las convenciones sociales cuando estoy investigando algo.', 'Investigador: sé dónde buscar información que otros no encuentran.', 'Ninguna'),
('Soldado', 'Ninguno adicional', 'Puedo calcular a simple vista distancias y cantidades.', 'Vivo por y para mi compañía militar.', 'Le debo la vida al soldado que me salvó en batalla.', 'Tengo pesadillas frecuentes con la guerra que me cuesta ocultar.', 'Rango militar: soldados de mi antiguo ejército me respetan.', 'Set de Juego, Vehículos (terrestres)'),
('Charlatán', 'Ninguno adicional', 'Puedo mentir sin que se me note, aunque nunca engaño a un amigo.', 'Libertad: nada me ata a un lugar o persona.', 'Alguien me salvó de la ruina y le debo todo.', 'No puedo evitar aprovechar una marca fácil.', 'Identidad falsa: tengo una segunda identidad completa y documentada.', 'Herramientas de Falsificador, Set de Juego'),
('Ermitaño', 'Un idioma a elección', 'Hablo poco, salvo del tema que estudié en mi aislamiento.', 'Autoconocimiento: si te conoces a vos mismo, no hay nada más que saber.', 'Mi soledad me dio una revelación que debo compartir con el mundo.', 'No sé cómo relacionarme con la gente después de tanto aislamiento.', 'Descubrimiento: hice un hallazgo único durante mi retiro.', 'Kit de Herbolario');

INSERT INTO background_skills (background_id, skill_id)
SELECT b.background_id, s.skill_id FROM background b, skill s WHERE
  (b.name='Acólito' AND s.name IN ('Perspicacia','Religión')) OR
  (b.name='Criminal' AND s.name IN ('Engaño','Sigilo')) OR
  (b.name='Héroe del Pueblo' AND s.name IN ('Trato con Animales','Supervivencia')) OR
  (b.name='Noble' AND s.name IN ('Historia','Persuasión')) OR
  (b.name='Sabio' AND s.name IN ('Arcanos','Historia')) OR
  (b.name='Soldado' AND s.name IN ('Atletismo','Intimidación')) OR
  (b.name='Charlatán' AND s.name IN ('Engaño','Juego de Manos')) OR
  (b.name='Ermitaño' AND s.name IN ('Medicina','Religión'));

INSERT INTO background_proficiency (background_id, proficiency_id)
SELECT b.background_id, p.proficiency_id FROM background b, proficiency p WHERE
  (b.name='Criminal' AND p.name IN ('Herramientas de Ladrón','Set de Juego')) OR
  (b.name='Noble' AND p.name = 'Set de Juego') OR
  (b.name='Soldado' AND p.name = 'Set de Juego') OR
  (b.name='Charlatán' AND p.name IN ('Herramientas de Falsificador','Set de Juego')) OR
  (b.name='Ermitaño' AND p.name = 'Kit de Herbolario');
