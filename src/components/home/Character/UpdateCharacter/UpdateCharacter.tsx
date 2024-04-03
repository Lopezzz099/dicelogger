"use client";

import React, { useState } from "react";
import styles from "./UpdateCharacter.module.css";
import Select from "@/components/common/inputs/Select";
import {
  alignments,
  // backgrounds,
  classesArray,
  equipmentCompetencies,
  languages,
  races,
  skillCompetencies,
} from "@/services/hardcoded";
import Input from "@/components/common/inputs/Input";
import MultiSelect from "@/components/common/inputs/MultiSelect";
import TextArea from "@/components/common/inputs/TextArea";
import Button from "@/components/common/buttons/Button";
import StatInput from "@/components/home/Stat/StatInput";
import NewLayout from "@/components/home/NewLayout/NewLayout";
import FormCard from "@/components/home/NewLayout/FormCard";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import formStyles from "@/components/home/NewLayout/Extra.module.css";
import ImageInput from "@/components/common/inputs/ImageInput/ImageInput";
import { useRouter } from "next/navigation";
import { uploadFileToS3 } from "@/services/s3Upload";
import { Character } from "../Character";
import { editCharacter } from "../actions";

export type Race = {
  race_id: number;
  name: string;
  description: string;
  speed: number;
  str: number;
  dex: number;
  int: number;
  con: number;
  wiz: number;
  cha: number;
};

export type Clase = {
  class_id: number;
  name: string;
  description: string;
  proficiency_bonus: number;
  hit_dice: string;
  armor_proficiencies: string;
  weapon_proficiencies: string;
  tool_proficiencies: string;
  spellcasting_ability: string;
};

export type Background = {
  background_id: number;
  name: string;
  languages: string;
  personality_traits: string;
  ideals: string;
  bond: string;
  flaws: string;
  trait: string;
  tool_proficiencies: string;
};

type UpdateCharacterProps = {
  racesBack: Race[];
  clasessBack: Clase[];
  user: string;
  backgroundsBack: Background[];
  characterBack: Character;
};

const UpdateCharacter = ({
  racesBack,
  clasessBack,
  user,
  backgroundsBack,
  characterBack,
}: UpdateCharacterProps) => {
  // console.log("characterBack: ", characterBack);
  const router = useRouter();
  const [selectedName, setSelectedName] = useState(characterBack.name);
  const [selectedRace, setSelectedRace] = useState(characterBack.race.name);
  const [selectedRaceid, setSelectedRaceid] = useState<number>(
    characterBack.race.race_id
  );
  const [selectedAlignment, setSelectedAlignment] = useState(
    characterBack.alignment
  );
  const [selectedClass, setSelectedClass] = useState(characterBack.class.name);
  const [selectedClassId, setSelectedClassId] = useState<number>(
    characterBack.class.class_id
  );
  const [selectedAge, setSelectedAge] = useState<number>(characterBack.age);
  const [selectedHair, setSelectedHair] = useState(characterBack.hair);
  const [selectedEyes, setSelectedEyes] = useState(characterBack.eyes);
  const [selectedSkin, setSelectedSkin] = useState(characterBack.skin);
  const [selectedHeight, setSelectedHeight] = useState<number>(
    characterBack.height
  );
  const [selectedWeight, setSelectedWeight] = useState<number>(
    characterBack.weight
  );
  const [selectedDescription, setSelectedDescription] = useState<string>(
    characterBack.story
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedBackground, setSelectedBackground] = useState(
    (characterBack.background.background_id).toString()
  );
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<number>(
    characterBack.background.background_id
  );
  const [selectedBackgroundInfo, setSelectedBackgroundInfo] =
    useState<Background | undefined>(characterBack.background);
  const [selectedHitDice, setSelectedHitDice] = useState<string>(
    characterBack.hitdice
  );
  const [selectedHitPoints, setSelectedHitPoints] = useState<number>(
    characterBack.hitpoints
  );
  const [selectedSpeed, setSelectedSpeed] = useState<number>(
    characterBack.speed
  );
  const [s3Image, setS3Image] = useState<File>();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(e.target.value);
  };

  const handleAlignment = (value: string) => {
    setSelectedAlignment(value);
  };

  const handleClass = (value: string) => {
    clasessBack.forEach((clase) => {
      if (clase.name === value) {
        setSelectedClassId(clase.class_id);
        setSelectedHitDice(clase.hit_dice);
        setSelectedHitPoints(parseInt(clase.hit_dice.split("d")[1]));
      }
    });
    setSelectedClass(value);
  };

  const handleAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAge(Number(e.target.value));
  };

  const handleHair = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHair(e.target.value);
  };

  const handleEyes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEyes(e.target.value);
  };

  const handleSkin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSkin(e.target.value);
  };

  const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHeight(Number(e.target.value));
  };

  const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWeight(Number(e.target.value));
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedDescription(e.target.value);
  };

  const handleSkills = (value: string) => {
    if (selectedSkills.includes(value)) {
      setSelectedSkills(selectedSkills.filter((skill) => skill !== value));
    } else {
      setSelectedSkills([...selectedSkills, value]);
    }
  };

  const handleEquipment = (value: string) => {
    if (selectedEquipment.includes(value)) {
      setSelectedEquipment(
        selectedEquipment.filter((equipment) => equipment !== value)
      );
    } else {
      setSelectedEquipment([...selectedEquipment, value]);
    }
  };

  const handleBackground = (value: string) => {
    setSelectedBackgroundId(Number(value));
    setSelectedBackgroundInfo(backgroundsBack.find((bg) => bg.background_id === Number(value)));
    setSelectedBackground(value);
  };
  // console.log(selectedBackground)

  const [image, setImage] = React.useState<string | undefined>(
    characterBack.img
  );

  const [image1, setImage1] = React.useState<string>(characterBack.img);
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setS3Image(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    } else {
      setImage(undefined);
    }
  };

  type Stat = {
    name: string;
    label: string;
    base: number;
    extra: number;
  };

  const defaultStats: Stat[] = [
    { name: "str", label: "Fuerza", base: characterBack.str, extra: 0 },
    { name: "dex", label: "Destreza", base: characterBack.dex, extra: 0 },
    { name: "con", label: "Constitución", base: characterBack.con, extra: 0 },
    { name: "int", label: "Inteligencia", base: characterBack.int, extra: 0 },
    { name: "wis", label: "Sabiduría", base: characterBack.wiz, extra: 0 },
    { name: "cha", label: "Carisma", base: characterBack.cha, extra: 0 },
  ];

  const [stats, setStats] = React.useState<Stat[]>(defaultStats);

  const handleModifier = (name: string, value: number, race?: boolean) => {
    if (
      value + stats.find((stat) => stat.name === name)?.base! > 20 ||
      value + stats.find((stat) => stat.name === name)?.base! < 1
    ) {
      return;
    }

    const newStats = stats.map((stat) => {
      if (stat.name === name) {
        return {
          ...stat,
          extra: value,
        };
      }
      return stat;
    });
    setStats(newStats);
  };

  const handleRace = (value: string) => {
    racesBack.forEach((race) => {
      if (race.name === value) {
        setSelectedSpeed(race.speed);
        setStats([
          { name: "str", label: "Fuerza", base: 10 + race.str, extra: 0 },
          { name: "dex", label: "Destreza", base: 10 + race.dex, extra: 0 },
          { name: "con", label: "Constitución", base: 10 + race.con, extra: 0 },
          { name: "int", label: "Inteligencia", base: 10 + race.int, extra: 0 },
          { name: "wis", label: "Sabiduría", base: 10 + race.wiz, extra: 0 },
          { name: "cha", label: "Carisma", base: 10 + race.cha, extra: 0 },
        ]);
        setSelectedRaceid(race.race_id);
      }
    });
    setSelectedRace(value);
  };

  const backgroundOptions = backgroundsBack.map((background) => ({
    value: background.background_id.toString(),
    label: background.name,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(s3Image);
    if (s3Image) {
      const characterImage = await uploadFileToS3(s3Image);
      if (characterImage) {
        const armorClass = 10 + Math.floor((stats[1].base - 10) / 2);
        const characterData = {
          user_id: user,
          campaign_id: 1,
          name: selectedName,
          age: selectedAge,
          hair: selectedHair,
          eyes: selectedEyes,
          skin: selectedSkin,
          height: selectedHeight,
          weight: selectedWeight,
          race_id: selectedRaceid,
          alignment: selectedAlignment,
          class_id: selectedClassId,
          background_id: selectedBackgroundId,
          story: selectedDescription,
          img: characterImage,
          str: stats[0].base + stats[0].extra,
          dex: stats[1].base + stats[1].extra,
          int: stats[3].base + stats[3].extra,
          con: stats[2].base + stats[2].extra,
          wiz: stats[4].base + stats[4].extra,
          cha: stats[5].base + stats[5].extra,
          hitpoints: selectedHitPoints,
          hit_dice: selectedHitDice,
          speed: selectedSpeed,
          armorclass: armorClass,
          level: 1,
          exp: 0,
          items: null,
          weapons: null,
          armor: null,
          skills: null,
          features: null,
          spells: null,
          proficiencies: null,
        };
        // console.log("edit",characterData);
        // navigate to characters
        // router.push('/characters')
        try {
          await editCharacter(characterBack.characterid, characterData);
          router.push("/characters");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      const armorClass = 10 + Math.floor((stats[1].base - 10) / 2);
      const characterData = {
        user_id: user,
        campaign_id: 1,
        name: selectedName,
        age: selectedAge,
        hair: selectedHair,
        eyes: selectedEyes,
        skin: selectedSkin,
        height: selectedHeight,
        weight: selectedWeight,
        race_id: selectedRaceid,
        alignment: selectedAlignment,
        class_id: selectedClassId,
        background_id: selectedBackgroundId,
        story: selectedDescription,
        img: image1,
        str: stats[0].base + stats[0].extra,
        dex: stats[1].base + stats[1].extra,
        int: stats[3].base + stats[3].extra,
        con: stats[2].base + stats[2].extra,
        wiz: stats[4].base + stats[4].extra,
        cha: stats[5].base + stats[5].extra,
        hitpoints: selectedHitPoints,
        hit_dice: selectedHitDice,
        speed: selectedSpeed,
        armorclass: armorClass,
        level: 1,
        exp: 0,
        items: null,
        weapons: null,
        armor: null,
        skills: null,
        features: null,
        spells: null,
        proficiencies: null,
      };
      // console.log("edit",characterData);
      // navigate to characters
      // router.push('/characters')
      try {
        await editCharacter(characterBack.characterid, characterData);
        router.push("/characters");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log(selectedBackground)
  return (
    <NewLayout
      onSubmit={handleSubmit}
      title="Editar personaje"
      slug={[
        { label: "Personaje", href: `/character/${characterBack.characterid}` },
        { label: "Formulario" },
      ]}
    >
      <FormCard>
        <h3>Información del personaje</h3>
        <section className={styles.section1}>
          <div className={styles.miniSection1}>
            <FormGroup>
              <label className={formStyles.requiredLabel} htmlFor="name">
                Nombre del personaje
              </label>
              <Input
                type="text"
                name="name"
                placeholder="Escribe aquí..."
                required
                value={selectedName}
                onChange={handleName}
              />
            </FormGroup>
            <FormGroup>
              <label className={formStyles.requiredLabel} htmlFor="alignment">
                Alienamiento
              </label>
              <Select
                placeholder="Selecciona un alienamiento"
                options={alignments}
                value={selectedAlignment}
                onChange={handleAlignment}
              />
            </FormGroup>
            <FormGroup>
              <label className={formStyles.requiredLabel} htmlFor="race">
                Raza
              </label>
              <Select
                placeholder="Selecciona una raza"
                options={races}
                value={selectedRace}
                onChange={handleRace}
              />
            </FormGroup>
            <FormGroup>
              <label className={formStyles.requiredLabel} htmlFor="class">
                Clase Nivel 1
              </label>
              <Select
                placeholder="Selecciona una clase"
                options={classesArray}
                value={selectedClass}
                onChange={handleClass}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="age">Edad</label>
              <Input
                type="number"
                name="age"
                placeholder="Escribe aquí..."
                required
                value={selectedAge}
                onChange={handleAge}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="hair">Pelo</label>
              <Input
                type="text"
                name="hair"
                placeholder="Escribe aquí..."
                required
                value={selectedHair}
                onChange={handleHair}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="eyes">Ojos</label>
              <Input
                type="text"
                name="eyes"
                placeholder="Escribe aquí..."
                required
                value={selectedEyes}
                onChange={handleEyes}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="skin">Piel</label>
              <Input
                type="text"
                name="skin"
                placeholder="Escribe aquí..."
                required
                value={selectedSkin}
                onChange={handleSkin}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="height">Altura</label>
              <Input
                type="number"
                name="height"
                placeholder="Escribe aquí..."
                required
                value={selectedHeight}
                onChange={handleHeight}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="weight">Peso</label>
              <Input
                type="number"
                name="weight"
                placeholder="Escribe aquí..."
                required
                value={selectedWeight}
                onChange={handleWeight}
              />
            </FormGroup>
          </div>
          <div className={styles.miniSection2}>
            {stats.map((stat: Stat, index) => (
              <StatInput
                key={index}
                name={stat.name}
                label={stat.label}
                total={stat.base + stat.extra}
                extra={stat.extra}
                onChange={handleModifier}
              />
            ))}
          </div>
        </section>
        <section className={styles.section2}>
          <FormGroup>
            <label htmlFor="skills">Competencia con habilidades</label>
            <MultiSelect
              onChange={handleSkills}
              options={skillCompetencies}
              selectedOptions={selectedSkills}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="equipment">Competencia con equipo</label>
            <MultiSelect
              onChange={handleEquipment}
              options={equipmentCompetencies}
              selectedOptions={selectedEquipment}
            />
          </FormGroup>
        </section>
        <section className={styles.section3}>
          <FormGroup>
            <label htmlFor="image">Imagen del personaje</label>
            <ImageInput name="image" onChange={handleImage} image={image} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="lore">Historia del personaje</label>
            <TextArea
              className={`${styles.textarea} ${formStyles.textarea}`}
              name="description"
              placeholder="Escribe aquí..."
              required
              value={selectedDescription}
              onChange={handleDescription}
            />
          </FormGroup>
        </section>
      </FormCard>
      <FormCard>
        <h3>Transfondo del personaje</h3>
        <section className={styles.section4}>
          <FormGroup>
            <label className={formStyles.requiredLabel} htmlFor="arquetype">
              Trasfondo
            </label>
            <Select
              placeholder="Selecciona un trasfondo"
              options={backgroundOptions}
              value={selectedBackground}
              onChange={handleBackground}
            />
          </FormGroup>
          {/* <FormGroup>
            <label htmlFor="arquetypeName">Nombre del trasfondo</label>
            <Input disabled type="text" name="arquetypeName" placeholder="-" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="skills">Competencia con habilidades</label>
            <MultiSelect
              onChange={handleSkills}
              options={skillCompetencies}
              selectedOptions={selectedSkills}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="equipment">Competencia con equipo</label>
            <MultiSelect
              onChange={handleEquipment}
              options={equipmentCompetencies}
              selectedOptions={selectedEquipment}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="languages">Idiomas</label>
            <MultiSelect
              onChange={handleLanguage}
              options={languages}
              selectedOptions={selectedLanguages}
            />
          </FormGroup> */}
        </section>
        <FormGroup>
          <label htmlFor="features">Rasgos</label>
          <TextArea
            height="5rem"
            className={formStyles.textarea}
            name="features"
            placeholder="Rasgos..."
            value={selectedBackgroundInfo ? selectedBackgroundInfo.trait : ""}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="personality">Rasgos de personalidad</label>
          <TextArea
            height="5rem"
            className={formStyles.textarea}
            name="personality"
            placeholder="Rasgos de personalidad..."
            value={
              selectedBackgroundInfo
                ? selectedBackgroundInfo.personality_traits
                : ""
            }
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="ideals">Ideales</label>
          <TextArea
            height="5rem"
            className={formStyles.textarea}
            name="ideals"
            placeholder="Ideales..."
            value={selectedBackgroundInfo ? selectedBackgroundInfo.ideals : ""}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="bonds">Vínculos</label>
          <TextArea
            height="5rem"
            className={formStyles.textarea}
            name="bonds"
            placeholder="Vínculos..."
            value={selectedBackgroundInfo ? selectedBackgroundInfo.bond : ""}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="flaws">Defectos</label>
          <TextArea
            height="5rem"
            className={formStyles.textarea}
            name="flaws"
            placeholder="Defectos..."
            value={selectedBackgroundInfo ? selectedBackgroundInfo.flaws : ""}
            readOnly
          />
        </FormGroup>
      </FormCard>
      <Button type="submit">Editar personaje</Button>
    </NewLayout>
  );
};

export default UpdateCharacter;
