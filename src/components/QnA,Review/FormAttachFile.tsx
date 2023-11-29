import { useForm } from '@/store/useForm';
import { ChangeEvent } from 'react';

function FormAttachFile() {
  const { setAttachFile } = useForm();

  const handleUploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const photoFile = e.target?.files && e.target.files[0];
    if (photoFile) {
      const photoUrl = URL.createObjectURL(photoFile);
      setAttachFile(photoUrl);
    }
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="bg-gray-50 p-3">
        <label htmlFor="inputPhoto">첨부파일</label>
        <span className="text-starRed font-extrabold text-xl align-middle pl-1">
          *
        </span>
      </td>
      <td className="p-3">
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/webp,image/avif"
          name="photo"
          id="inputPhoto"
          required
          onChange={handleUploadPhoto}
        />
      </td>
    </tr>
  );
}

export default FormAttachFile;
