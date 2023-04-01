import { useState } from "react";
import { useSelector } from "react-redux";
import { GlobalColors } from "../../GlobalColors";

// function CustomColors() {
//   const user = useSelector((store) => store.auth.user);
//   if (user) {
//     const color = user.color;
//     const [colorTheme, setColorTheme] = useState(GlobalColors.user.blue);
//     if (color === GlobalColors.user.teal) {
//       setColorTheme(GlobalColors.teal);
//     } else {
//       setColorTheme(GlobalColors.colors);
//     }
//     console.log(colorTheme);
//     return colorTheme;
//   }
//   // else {
//   //   return null;
//   // }
// }

// export const customColors = CustomColors();
