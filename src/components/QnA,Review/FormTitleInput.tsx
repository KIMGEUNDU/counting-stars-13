import { useForm } from '@/store/useForm';
import { ChangeEvent } from 'react';

function FormTitleInput() {
  const { setTitle } = useForm();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="bg-gray-50 w-40 p-3">
        <label htmlFor="inputId">제목</label>
        <span className="text-starRed font-extrabold text-xl align-middle pl-1">
          *
        </span>
      </td>
      <td className="flex flex-row p-3">
        <input
          type="text"
          className="border border-gray-300 rounded w-60 mr-1"
          id="inputId"
          onChange={handleChangeTitle}
          required
        />
      </td>
    </tr>
  );
}

export default FormTitleInput;
