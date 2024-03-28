import { useRouter } from "next/navigation";

export type CharacterData = {
  name: string;
  age: string;
  hair: string;
  eyes: string;
  skin: string;
  height: string;
  weight: string;
  selectedRaceId: number;
  selectedAlignment: string;
  selectedClassId: number;
  selectedSkills: string[];
  selectedEquipment: string[];
  selectedLanguages: string[];
  selectedBackground: string;
  description: string;
  features: string;
  personality: string;
  ideals: string;
  bonds: string;
  flaws: string;
  stats: {
    name: string;
    label: string;
    base: number;
    extra: number;
  }[];
};

export default function useCreateCharacter() {
  const router = useRouter();

  const handleCreateCharacter = ({
    name,
    age,
    hair,
    eyes,
    skin,
    height,
    weight,
    selectedRaceId,
    selectedAlignment,
    selectedClassId,
    selectedSkills,
    selectedEquipment,
    selectedLanguages,
    selectedBackground,
    description,
    features,
    personality,
    ideals,
    bonds,
    flaws,
    stats,
  }: CharacterData) => {
    fetch("/api/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        age,
        hair,
        eyes,
        skin,
        height,
        weight,
        selectedRaceId,
        selectedAlignment,
        selectedClassId,
        selectedSkills,
        selectedEquipment,
        selectedLanguages,
        selectedBackground,
        description,
        features,
        personality,
        ideals,
        bonds,
        flaws,
        stats,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // window.localStorage.setItem("user", data.data.username);
        router.push(`/characters/${data.character_id}`);
      })
      .catch((err) => console.error(err));
  };

  return handleCreateCharacter;
}
