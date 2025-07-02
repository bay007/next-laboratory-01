import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
// Asegúrate de instalar la biblioteca: npm install uuid
import { v4 as uuidv4 } from "uuid";
import { OptionData, QuestionData } from "../types";

/**
 * Sub-componente interno para gestionar las opciones de una pregunta.
 * @param {{ questionIndex: number }} props
 */
function Options({ questionIndex }: { questionIndex: number }) {
  const {
    control: OControl,
    register: oRegister,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();

  const {
    fields: oFields,
    append: oAppend,
    remove: oRemove,
  } = useFieldArray<OptionData, `questions.${number}.options`, "fieldId">({
    control: OControl,
    name: `questions.${questionIndex}.options`,
    keyName: "fieldId", // Usamos un nombre de clave personalizado para evitar conflictos con nuestro campo 'id'
  });

  // Función mejorada para borrar una opción
  const handleRemoveOption = (optionIndex: number, optionId: number) => {
    // Revisa si la opción a borrar es la que está marcada como correcta
    const currentCorrectOption = getValues(
      `questions.${questionIndex}.correctOption`
    );
    if (currentCorrectOption === optionId) {
      // Si es la correcta, limpia el valor para evitar referencias a un ID inválido
      setValue(`questions.${questionIndex}.correctOption`, "", {
        shouldValidate: true,
      });
    }
    oRemove(optionIndex);
  };

  return (
    <div className="pl-6 border-l-2 border-gray-200 mt-4 ml-4">
      <h4 className="text-sm font-semibold mb-3 text-gray-600">Opciones:</h4>

      {/* El Controller gestiona el valor del grupo de radio buttons */}
      <Controller
        name={`questions.${questionIndex}.correctOption`}
        control={OControl}
        rules={{ required: "Debes seleccionar una opción como correcta" }}
        render={({ field: OField, fieldState }) => (
          <div className="space-y-3">
            {oFields.map((option, optionIndex: number) => (
              <div key={option.fieldId} className="flex items-center gap-3">
                {/* 1. REGISTRO DEL ID DE LA OPCIÓN (OCULTO) */}
                <input
                  type="hidden"
                  {...oRegister(
                    `questions.${questionIndex}.options.${optionIndex}.id`
                  )}
                />

                <input
                  type="radio"
                  name={OField.name}
                  ref={OField.ref}
                  onChange={() => OField.onChange(option.id)}
                  onBlur={OField.onBlur}
                  checked={OField.value === option.id}
                  disabled={OField.disabled}
                  className="h-5 w-5 cursor-pointer flex-shrink-0"
                />

                <Input
                  {...oRegister(
                    `questions.${questionIndex}.options.${optionIndex}.text`,
                    { required: "La opción no puede estar vacía" }
                  )}
                  placeholder={`Texto de la Opción ${optionIndex + 1}`}
                  className="flex-grow"
                  autoComplete="off"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveOption(optionIndex, option.id)}
                >
                  Borrar Opción
                </Button>
              </div>
            ))}
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">
                {fieldState.error?.message ||
                  "Todas las opciones deben tener un texto."}
              </p>
            )}
          </div>
        )}
      />

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3"
        onClick={() => {
          // 2. AÑADIR OPCIÓN CON UUID
          oAppend({ id: uuidv4(), text: "" });
        }}
      >
        Añadir Opción
      </Button>
    </div>
  );
}

/**
 * Componente principal para gestionar la lista de preguntas y sus opciones.
 * Debe usarse dentro de un <FormProvider>.
 */
export function Questions() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const {
    fields: qFields,
    append: qAppend,
    remove: qRemove,
  } = useFieldArray<QuestionData, "questions", "fieldId">({
    control,
    name: "questions",
    keyName: "fieldId", // Usamos un nombre de clave personalizado
  });

  return (
    <div className="space-y-6 rounded-lg bg-slate-50 p-5 border">
      <h3 className="text-xl font-bold text-gray-800">Editor de Preguntas</h3>

      {qFields.map((qField, qIndex) => (
        <div
          key={qField.fieldId}
          className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
        >
          {/* 3. REGISTRO DEL ID DE LA PREGUNTA (OCULTO) */}
          <input type="hidden" {...register(`questions.${qIndex}.id`)} />

          <div className="flex items-center gap-4">
            <Input
              {...register(`questions.${qIndex}.text`, {
                required: "El texto de la pregunta es obligatorio",
              })}
              type="text"
              autoComplete="off"
              className="flex-grow font-semibold"
              placeholder={`Pregunta ${qIndex + 1}`}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => qRemove(qIndex)}
            >
              Borrar Pregunta
            </Button>
          </div>
          {errors.questions?.[qIndex]?.text && (
            <p className="text-red-500 text-xs mt-1">
              {errors.questions[qIndex].text.message}
            </p>
          )}

          <Options questionIndex={qIndex} />
        </div>
      ))}

      <Button
        type="button"
        className="w-full mt-2"
        size="lg"
        onClick={() => {
          // 4. AÑADIR PREGUNTA CON UUID Y ESTRUCTURA COMPLETA
          qAppend({
            id: uuidv4(),
            text: "",
            options: [],
            correctOption: "",
          });
        }}
      >
        + Añadir Nueva Pregunta
      </Button>
    </div>
  );
}
