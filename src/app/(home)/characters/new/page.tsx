"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Select from "@/components/common/inputs/Select";
import {
  alignments,
  backgrounds,
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

const NewCharacter = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    hair: "",
    eyes: "",
    skin: "",
    height: "",
    weight: "",
    selectedRace: "",
    selectedAlignment: "",
    selectedClass: "",
    selectedSkills: [],
    selectedEquipment: [],
    selectedLanguages: [],
    selectedBackground: "",
    description: "",
    features: "",
    personality: "",
    ideals: "",
    bonds: "",
    flaws: "",
    stats: [
      { name: "strength", label: "Fuerza", base: 10, extra: 0 },
      { name: "dexterity", label: "Destreza", base: 10, extra: 0 },
      { name: "constitution", label: "Constitución", base: 10, extra: 0 },
      { name: "intelligence", label: "Inteligencia", base: 10, extra: 0 },
      { name: "wisdom", label: "Sabiduría", base: 10, extra: 0 },
      { name: "charisma", label: "Carisma", base: 10, extra: 0 },
    ],
  });

  const router = useRouter();
  const [selectedName, setSelectedName] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedAlignment, setSelectedAlignment] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedHair, setSelectedHair] = useState("");
  const [selectedEyes, setSelectedEyes] = useState("");
  const [selectedSkin, setSelectedSkin] = useState("");
  const [selectedHeight, setSelectedHeight] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedDescription, setSelectedDescription] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<string>("");
  const [selectedPersonality, setSelectedPersonality] = useState<string>("");
  const [selectedIdeals, setSelectedIdeals] = useState<string>("");
  const [selectedBonds, setSelectedBonds] = useState<string>("");
  const [selectedFlaws, setSelectedFlaws] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<string>("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(e.target.value);
  };

  const handleRace = (value: string) => {
    setSelectedRace(value);
  };

  const handleAlignment = (value: string) => {
    setSelectedAlignment(value);
  };

  const handleClass = (value: string) => {
    setSelectedClass(value);
  };

  const handleAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAge(e.target.value);
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
    setSelectedHeight(e.target.value);
  };

  const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWeight(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedDescription(e.target.value);
  };

  const handleFeatures = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedFeatures(e.target.value);
  };

  const handlePersonality = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedPersonality(e.target.value);
  };

  const handleIdeals = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedIdeals(e.target.value);
  };

  const handleBonds = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedBonds(e.target.value);
  };

  const handleFlaws = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedFlaws(e.target.value);
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

  const handleLanguage = (value: string) => {
    if (selectedLanguages.includes(value)) {
      setSelectedLanguages(
        selectedLanguages.filter((language) => language !== value)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, value]);
    }
  };

  const handleBackground = (value: string) => {
    setSelectedBackground(value);
  };

  const [image, setImage] = React.useState<string>();
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivoImagen = e.target.files?.[0];
    if (archivoImagen) {
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result as string);
      };

      await new Promise((resolve) => reader.readAsDataURL(archivoImagen));
    }
  };

  type Stat = {
    name: string;
    label: string;
    base: number;
    extra: number;
  };

  const defaultStats: Stat[] = [
    { name: "strength", label: "Fuerza", base: 10, extra: 0 },
    { name: "dexterity", label: "Destreza", base: 10, extra: 0 },
    { name: "constitution", label: "Constitución", base: 10, extra: 0 },
    { name: "intelligence", label: "Inteligencia", base: 10, extra: 0 },
    { name: "wisdom", label: "Sabiduría", base: 10, extra: 0 },
    { name: "charisma", label: "Carisma", base: 10, extra: 0 },
  ];

  const [stats, setStats] = React.useState<Stat[]>(defaultStats);

  const handleModifier = (name: string, value: number) => {
    // if value + stat.base > 20 or less than 1 return
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e);
    const characterData = {
      name: selectedName,
      age: selectedAge,
      hair: selectedHair,
      eyes: selectedEyes,
      skin: selectedSkin,
      height: selectedHeight,
      weight: selectedWeight,
      selectedRace,
      selectedAlignment,
      selectedClass,
      selectedSkills,
      selectedEquipment,
      selectedLanguages,
      selectedBackground,
      description: selectedDescription,
      features: selectedFeatures, 
      personality: selectedPersonality, 
      ideals: selectedIdeals,
      bonds: selectedBonds, 
      flaws: selectedFlaws, 
      stats, 
    };
    console.log(characterData);
    // navigate to characters
    // router.push('/characters')
  };

  return (
    <NewLayout
      onSubmit={handleSubmit}
      title="Crear personaje"
      slug={[
        { label: "Personajes", href: "/characters" },
        { label: "Plantillas", href: "/characters/templates" },
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
                type="text"
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
                type="text"
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
                type="text"
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
              options={backgrounds}
              value={selectedBackground}
              onChange={handleBackground}
            />
          </FormGroup>
          <FormGroup>
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
          </FormGroup>
        </section>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="features">
            Rasgos
          </label>
          <TextArea
            height="5rem"
            className={formStyles.textarea}
            name="features"
            placeholder="Escribe aquí..."
            required
            value={selectedFeatures}
            onChange={handleFeatures}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="personality">
            Rasgos de personalidad
          </label>
          <TextArea
            height="5rem"
            className={formStyles.textarea}
            name="personality"
            placeholder="Escribe aquí..."
            required
            value={selectedPersonality}
            onChange={handlePersonality}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="ideals">
            Ideales
          </label>
          <TextArea
            height="5rem"
            className={formStyles.textarea}
            name="ideals"
            placeholder="Escribe aquí..."
            required
            value={selectedIdeals}
            onChange={handleIdeals}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="bonds">
            Vínculos
          </label>
          <TextArea
            height="5rem"
            className={formStyles.textarea}
            name="bonds"
            placeholder="Escribe aquí..."
            required
            value={selectedBonds}
            onChange={handleBonds}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="flaws">
            Defectos
          </label>
          <TextArea
            height="5rem"
            className={formStyles.textarea}
            name="flaws"
            placeholder="Escribe aquí..."
            required
            value={selectedFlaws}
            onChange={handleFlaws}
          />
        </FormGroup>
      </FormCard>
      <Button type="submit">Crear personaje</Button>
    </NewLayout>
  );
};

export default NewCharacter;
