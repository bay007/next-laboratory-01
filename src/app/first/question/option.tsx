import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";

{
  /* <div key={field.id} className="flex items-center mb mt-2 add">
          <input
            {...register(`options.${index}.file`)}
            type="email"
            className="border border-gray-300 rounded p-2 cursor-pointer"
            accept=".jpg, .jpeg, .png, .gif"
          />
          </div> */
}

export function Options({ qIndex }: { qIndex: number }) {
  const { control, register } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: `questions.${qIndex}.options`,
    }
  );

  return (
    <>
      <p>Opciones;</p>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center mb mt-2 add">
            <label className="mr-2">Option {index + 1}:</label>
            <Input
              {...register(`questions.${qIndex}.options.${index}.option`)}
              defaultValue={field.option}
              className="border border-gray-300 rounded p-2 h-5"
              placeholder={`Option ${index + 1}`}
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
          onClick={() => append({ option: "" })}
          className="mt-2 bg-blue-500 text-white rounded px-4 py-2"
        >
          Add Option
        </button>
      </div>
    </>
  );
}
