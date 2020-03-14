export const parseLLZ = dataLLZ => {
  const [lat, lng, z] = dataLLZ.split(';').map(s => +s)
  return {lat, lng, z}
}
