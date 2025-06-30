import { useFieldArray, useFormContext } from "react-hook-form";

export function Question() {
  const { control, register } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <>
      <p>Questions component:</p>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center mb mt-2 add">
            <input
              {...register(`questions.${index}.text`)}
              type="text"
              className="border border-gray-300 rounded p-2"
              placeholder={`Questions ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-2 bg-red-500 text-white rounded px-2 py-1"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ text: "" })}
          className="mt-2 bg-blue-500 text-white rounded px-4 py-2"
        >
          Add Question
        </button>
      </div>
    </>
  );
}
