-- Esquema de DiceLogger, reconstruido a partir del código del backend
-- (structs de internal/domain + columnas reales usadas en internal/*/sqlQuer*.go).
-- Nunca había estado versionado; la base original se armó a mano y se perdió.
-- Corré esto UNA sola vez contra una base MySQL vacía antes de usar la app.

SET FOREIGN_KEY_CHECKS = 0;

-- ============ Catálogos (sin dependencias) ============

CREATE TABLE IF NOT EXISTS race (
  race_id     INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  description TEXT,
  speed       INT,
  str         INT,
  dex         INT,
  `int`       INT,
  con         INT,
  wiz         INT,
  cha         INT
);

CREATE TABLE IF NOT EXISTS class (
  class_id             INT AUTO_INCREMENT PRIMARY KEY,
  name                 VARCHAR(255) NOT NULL,
  description          TEXT,
  proficiency_bonus    INT,
  hit_dice             VARCHAR(50),
  armor_proficiencies  VARCHAR(255),
  weapon_proficiencies VARCHAR(255),
  tool_proficiencies   VARCHAR(255),
  spellcasting_ability VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS background (
  background_id       INT AUTO_INCREMENT PRIMARY KEY,
  name                VARCHAR(255) NOT NULL,
  languages           VARCHAR(255),
  personality_traits  TEXT,
  ideals              TEXT,
  bond                TEXT,
  flaws               TEXT,
  trait               TEXT,
  tool_proficiencies  VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS proficiency (
  proficiency_id INT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(255) NOT NULL,
  type           VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS skill (
  skill_id INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(255) NOT NULL,
  stat     VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS spell (
  spell_id         INT AUTO_INCREMENT PRIMARY KEY,
  name             VARCHAR(255) NOT NULL,
  description      TEXT,
  `range`          INT,
  ritual           BOOLEAN DEFAULT FALSE,
  duration         VARCHAR(100),
  concentration    BOOLEAN DEFAULT FALSE,
  casting_time     VARCHAR(100),
  level            INT,
  damage_type      VARCHAR(100),
  difficulty_class INT,
  aoe              INT,
  school           VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS feature (
  feature_id  INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  description TEXT
);

-- Tabla sin uso en el código actual (ningún handler la consulta), se deja
-- por si algún flujo del frontend la necesita más adelante.
CREATE TABLE IF NOT EXISTS event_type (
  event_type_id INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS saving_throws (
  saving_throw_id INT AUTO_INCREMENT PRIMARY KEY,
  class_id        INT,
  str             BOOLEAN DEFAULT FALSE,
  dex             BOOLEAN DEFAULT FALSE,
  `int`           BOOLEAN DEFAULT FALSE,
  con             BOOLEAN DEFAULT FALSE,
  wiz             BOOLEAN DEFAULT FALSE,
  cha             BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE
);

-- ============ Usuarios ============

CREATE TABLE IF NOT EXISTS user (
  uid            VARCHAR(128) PRIMARY KEY, -- UID de Firebase Auth
  name           VARCHAR(255),
  email          VARCHAR(255),
  password       VARCHAR(255),
  display_name   VARCHAR(255),
  image          VARCHAR(500),
  sub_expiration VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS friend_list (
  user1_id VARCHAR(128) NOT NULL,
  user2_id VARCHAR(128) NOT NULL,
  PRIMARY KEY (user1_id, user2_id),
  FOREIGN KEY (user1_id) REFERENCES user(uid) ON DELETE CASCADE,
  FOREIGN KEY (user2_id) REFERENCES user(uid) ON DELETE CASCADE
);

-- ============ Campañas y sesiones ============

CREATE TABLE IF NOT EXISTS campaign (
  campaign_id    INT AUTO_INCREMENT PRIMARY KEY,
  dungeon_master VARCHAR(255),
  name           VARCHAR(255) NOT NULL,
  description    TEXT,
  image          VARCHAR(500),
  notes          TEXT,
  status         VARCHAR(50),
  images         TEXT
);

CREATE TABLE IF NOT EXISTS session (
  session_id           INT AUTO_INCREMENT PRIMARY KEY,
  start                DATETIME,
  end                  DATETIME,
  description          TEXT,
  campaign_id          INT,
  current_environment  VARCHAR(255),
  FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id) ON DELETE CASCADE
);

-- ============ Objetos / equipo (opcionalmente ligados a una campaña) ============

CREATE TABLE IF NOT EXISTS weapon (
  weapon_id         INT AUTO_INCREMENT PRIMARY KEY,
  weapon_type       VARCHAR(100),
  name              VARCHAR(255) NOT NULL,
  weight            INT,
  price             INT,
  category          VARCHAR(100),
  reach             VARCHAR(50),
  description       TEXT,
  damage            VARCHAR(50),
  versatile_damage  VARCHAR(50),
  ammunition        INT,
  damage_type       VARCHAR(50),
  campaign_id       INT,
  FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS armor (
  armor_id         INT AUTO_INCREMENT PRIMARY KEY,
  material         VARCHAR(100),
  name             VARCHAR(255) NOT NULL,
  weight           INT,
  price            INT,
  category         VARCHAR(100),
  protection_type  VARCHAR(100),
  description      TEXT,
  penalty          VARCHAR(100),
  strength         INT,
  armor_class      INT,
  dex_bonus        VARCHAR(50),
  campaign_id      INT,
  FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS item (
  item_id     INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  weight      INT,
  price       INT,
  description TEXT,
  campaign_id INT,
  FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id) ON DELETE SET NULL
);

-- ============ Personajes ============

CREATE TABLE IF NOT EXISTS character_data (
  character_id   INT AUTO_INCREMENT PRIMARY KEY,
  user_id        VARCHAR(128),
  campaign_id    INT,
  race_id        INT,
  class_id       INT,
  background_id  INT,
  name           VARCHAR(255) NOT NULL,
  story          TEXT,
  alignment      VARCHAR(100),
  age            INT,
  hair           VARCHAR(100),
  eyes           VARCHAR(100),
  skin           VARCHAR(100),
  height         INT,
  weight         INT,
  img_url        VARCHAR(500),
  str            INT,
  dex            INT,
  `int`          INT,
  con            INT,
  wiz            INT,
  cha            INT,
  hitpoints      INT,
  hit_dice       VARCHAR(50),
  speed          INT,
  armor_class    INT,
  level          INT,
  exp            INT,
  FOREIGN KEY (user_id) REFERENCES user(uid) ON DELETE SET NULL,
  FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id) ON DELETE SET NULL,
  FOREIGN KEY (race_id) REFERENCES race(race_id) ON DELETE SET NULL,
  FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE SET NULL,
  FOREIGN KEY (background_id) REFERENCES background(background_id) ON DELETE SET NULL
);

-- ============ Tablas de relación (equipo / progresión del personaje) ============

CREATE TABLE IF NOT EXISTS character_armor (
  character_armor_id INT AUTO_INCREMENT PRIMARY KEY,
  character_id        INT NOT NULL,
  armor_id             INT NOT NULL,
  equipped             BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (character_id) REFERENCES character_data(character_id) ON DELETE CASCADE,
  FOREIGN KEY (armor_id) REFERENCES armor(armor_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS character_weapon (
  character_weapon_id INT AUTO_INCREMENT PRIMARY KEY,
  character_id          INT NOT NULL,
  weapon_id              INT NOT NULL,
  equipped               BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (character_id) REFERENCES character_data(character_id) ON DELETE CASCADE,
  FOREIGN KEY (weapon_id) REFERENCES weapon(weapon_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS character_item (
  character_item_id INT AUTO_INCREMENT PRIMARY KEY,
  character_id        INT NOT NULL,
  item_id              INT NOT NULL,
  quantity             INT DEFAULT 1,
  FOREIGN KEY (character_id) REFERENCES character_data(character_id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES item(item_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS character_proficiency (
  character_proficiency_id INT AUTO_INCREMENT PRIMARY KEY,
  character_id               INT NOT NULL,
  proficiency_id             INT NOT NULL,
  FOREIGN KEY (character_id) REFERENCES character_data(character_id) ON DELETE CASCADE,
  FOREIGN KEY (proficiency_id) REFERENCES proficiency(proficiency_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS character_skill (
  character_id INT NOT NULL,
  skill_id      INT NOT NULL,
  PRIMARY KEY (character_id, skill_id),
  FOREIGN KEY (character_id) REFERENCES character_data(character_id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skill(skill_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS character_spell (
  character_spell_id INT AUTO_INCREMENT PRIMARY KEY,
  character_id          INT NOT NULL,
  spell_id               INT NOT NULL,
  FOREIGN KEY (character_id) REFERENCES character_data(character_id) ON DELETE CASCADE,
  FOREIGN KEY (spell_id) REFERENCES spell(spell_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS character_feature (
  feature_id   INT NOT NULL,
  character_id INT NOT NULL,
  PRIMARY KEY (feature_id, character_id),
  FOREIGN KEY (feature_id) REFERENCES feature(feature_id) ON DELETE CASCADE,
  FOREIGN KEY (character_id) REFERENCES character_data(character_id) ON DELETE CASCADE
);

-- ============ Tablas de relación (catálogos entre sí) ============

CREATE TABLE IF NOT EXISTS background_proficiency (
  background_id  INT NOT NULL,
  proficiency_id INT NOT NULL,
  PRIMARY KEY (background_id, proficiency_id),
  FOREIGN KEY (background_id) REFERENCES background(background_id) ON DELETE CASCADE,
  FOREIGN KEY (proficiency_id) REFERENCES proficiency(proficiency_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS background_skills (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  background_id  INT NOT NULL,
  skill_id       INT NOT NULL,
  FOREIGN KEY (background_id) REFERENCES background(background_id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skill(skill_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS class_proficiency (
  class_id       INT NOT NULL,
  proficiency_id INT NOT NULL,
  PRIMARY KEY (class_id, proficiency_id),
  FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE,
  FOREIGN KEY (proficiency_id) REFERENCES proficiency(proficiency_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS class_spell (
  class_id INT NOT NULL,
  spell_id INT NOT NULL,
  PRIMARY KEY (class_id, spell_id),
  FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE,
  FOREIGN KEY (spell_id) REFERENCES spell(spell_id) ON DELETE CASCADE
);

-- Se lee por JOIN (internal/skill) pero ningún handler inserta filas todavía;
-- se crea igual para que esa consulta no rompa.
CREATE TABLE IF NOT EXISTS class_skill (
  class_id INT NOT NULL,
  skill_id INT NOT NULL,
  PRIMARY KEY (class_id, skill_id),
  FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skill(skill_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS race_proficiency (
  race_id        INT NOT NULL,
  proficiency_id INT NOT NULL,
  PRIMARY KEY (race_id, proficiency_id),
  FOREIGN KEY (race_id) REFERENCES race(race_id) ON DELETE CASCADE,
  FOREIGN KEY (proficiency_id) REFERENCES proficiency(proficiency_id) ON DELETE CASCADE
);

-- ============ Usuario <-> campaña <-> personaje ============
-- OJO: la columna PK se llama literalmente "user_campaign" (no
-- "user_campaign_id") porque así la consulta el código existente
-- (internal/user_campaign/sqlQuerys.go). Es una inconsistencia real del
-- proyecto original, no un error de este esquema.

CREATE TABLE IF NOT EXISTS user_campaign (
  user_campaign INT AUTO_INCREMENT PRIMARY KEY,
  campaign_id    INT NOT NULL,
  user_id        VARCHAR(128) NOT NULL,
  character_id   INT,
  is_owner       INT DEFAULT 0,
  FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(uid) ON DELETE CASCADE,
  FOREIGN KEY (character_id) REFERENCES character_data(character_id) ON DELETE SET NULL
);

-- ============ Eventos de juego (combate, dados, comercio) ============

CREATE TABLE IF NOT EXISTS attack_event (
  event_id              INT AUTO_INCREMENT PRIMARY KEY,
  type                  VARCHAR(100),
  environment           VARCHAR(100),
  session_id            INT,
  event_protagonist_id  INT,
  event_resolution      VARCHAR(255),
  weapon                INT,
  spell                 INT,
  dmg_type              VARCHAR(100),
  description           TEXT,
  timestamp             DATETIME NULL,
  FOREIGN KEY (session_id) REFERENCES session(session_id) ON DELETE CASCADE,
  FOREIGN KEY (event_protagonist_id) REFERENCES character_data(character_id) ON DELETE CASCADE
);

-- OJO: misma inconsistencia que user_campaign — la PK se llama
-- "character_event", no "character_event_id" (así la consulta el código).
CREATE TABLE IF NOT EXISTS character_attack_event (
  character_event INT AUTO_INCREMENT PRIMARY KEY,
  event_id          INT NOT NULL,
  character_id      INT NOT NULL,
  dmg               INT,
  dmg_roll          VARCHAR(50),
  attack_result     INT,
  attack_roll       VARCHAR(50),
  armor_class       INT,
  FOREIGN KEY (event_id) REFERENCES attack_event(event_id) ON DELETE CASCADE,
  FOREIGN KEY (character_id) REFERENCES character_data(character_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dice_event (
  dice_event_id      INT AUTO_INCREMENT PRIMARY KEY,
  stat                VARCHAR(50),
  difficulty          INT,
  dice_rolled         VARCHAR(50),
  dice_result         INT,
  event_protagonist   INT,
  description         TEXT,
  session_id          INT,
  timestamp           DATETIME,
  FOREIGN KEY (event_protagonist) REFERENCES character_data(character_id) ON DELETE CASCADE,
  FOREIGN KEY (session_id) REFERENCES session(session_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS trade_event (
  trade_event_id INT AUTO_INCREMENT PRIMARY KEY,
  session_id      INT,
  sender          INT,
  receiver        INT,
  description     TEXT,
  timestamp       DATETIME NULL,
  FOREIGN KEY (session_id) REFERENCES session(session_id) ON DELETE CASCADE,
  FOREIGN KEY (sender) REFERENCES character_data(character_id) ON DELETE CASCADE,
  FOREIGN KEY (receiver) REFERENCES character_data(character_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS character_trade (
  character_trade_id INT AUTO_INCREMENT PRIMARY KEY,
  trade_event_id        INT NOT NULL,
  weapon_id              INT,
  item_id                INT,
  armor_id               INT,
  item_owner             INT,
  item_receiver          INT,
  quantity               INT,
  item_name              VARCHAR(255),
  item_type              VARCHAR(100),
  FOREIGN KEY (trade_event_id) REFERENCES trade_event(trade_event_id) ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS = 1;
