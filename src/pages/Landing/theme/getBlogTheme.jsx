import { dataDisplayCustomizations } from './customizations/dataDisplayCustomizations';
import { feedbackCustomizations } from './customizations/feedbackCustomizations';
import { inputsCustomizations } from './customizations/inputsCustomizations';
import { navigationCustomizations } from './customizations/navigationCustomizations';
import { surfacesCustomizations } from './customizations/surfacesCustomizations';
import { getDesignTokens } from './themePrimitives';
// import {
//   inputsCustomizations,
//   dataDisplayCustomizations,
//   feedbackCustomizations,
//   navigationCustomizations,
//   surfacesCustomizations,
// } from './customizations';

export default function getBlogTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
    },
  };
}