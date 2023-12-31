import React from 'react';

function FormTitleInput({
  titleRef,
}: {
  titleRef: React.ForwardedRef<HTMLInputElement | null>;
}) {
  return (
    <tr className="border-b border-gray-300">
      <td className="bg-gray-50 w-10 p-3">
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
          maxLength={100}
          placeholder="제목을 적어주세요(100자 이내)"
          required
        />
      </td>
    </tr>
  );
}

export default FormTitleInput;
