// F_Edicion_Creacion / Categorias / OT105 - 28;
export const emailRegex =
  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
export const isEmptyList = (list) => list?.length === 0;
export const listHasValues = (list) => list?.length > 0;

export const dropzoneConfig = {
  multipleFiles: false,
  maxFiles: 1,
  validImages: 'image/jpeg, image/png',
};

export const sliceDate = (fullDate) => {
  const tobeSliced = new Date(fullDate);
  const day = tobeSliced.getDate();
  const month = tobeSliced.getMonth() + 1;
  const year = tobeSliced.getFullYear();

  return `${day}-${month}-${year}`;
};

export const getItemName = (id, list) => {
  const item = list.filter((item) => item.id === id);

  return item[0].name;
};
