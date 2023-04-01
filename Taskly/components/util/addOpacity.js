export function addOpacity(rgbString, opacity) {
  if (rgbString) {
    return rgbString.split(", 1)")[0] + "," + opacity + ")";
  }
}
