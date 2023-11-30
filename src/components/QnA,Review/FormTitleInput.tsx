import React from 'react';

function FormTitleInput({
  titleRef,
}: {
  titleRef: React.ForwardedRef<HTMLInputElement | null>;
}) {
  return (
    <tr className="border-b border-gray-300">
      <td className="bg-gray-50 w-20 p-3">
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
          ref={titleRef}
          required
        />
      </td>
    </tr>
  );
}

export default FormTitleInput;
