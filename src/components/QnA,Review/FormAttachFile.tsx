import { useForm } from '@/store/useForm';
import { ChangeEvent } from 'react';

function FormAttachFile() {
  const { attachFile, setAttachFile } = useForm();

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
      </td>
      <td className="p-3">
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/webp,image/avif"
          name="photo"
          id="inputPhoto"
          onChange={handleUploadPhoto}
        />
        {attachFile && (
          <img
            className="w-32 h-auto pt-5"
            src={attachFile}
            alt="첨부파일 업로드 완료"
            aria-hidden
          />
        )}
      </td>
    </tr>
  );
}

export default FormAttachFile;
