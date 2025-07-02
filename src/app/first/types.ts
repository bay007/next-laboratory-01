export type OptionData = {
  id: string; // Tu lógica y resultado esperado usan 'id'
  text: string; // El campo de texto para la opción
};

export type QuestionData = {
  id: string;
  text: string;
  options: OptionData[];
  correctOption: string; // Almacenará el 'id' de la opción correcta
};

// El tipo principal del formulario
export type Inputs = {
  name: string;
  email: string;
  files: { file: File }[];
  questions: QuestionData[]; // 'questions' es ahora un arreglo de QuestionData
};
