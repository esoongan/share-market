export const getLabel = (constant, value) =>{
  const filtered = constant.filter(x => x.value === value);
  return filtered[0].label;
}