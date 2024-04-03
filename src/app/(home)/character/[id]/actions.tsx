export const getCharacter = async (characterId: string) => {
  const data = {
    character: {},
    info: ''
  };

  try {
    const response = await fetch(`${process.env.URL}/api/characters/${characterId}`);

    if (response.ok) {
      data.character = await response.json();
      data.info = 'Success';
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error: any) {
    data.info = error.message;
  }

  return data;
};