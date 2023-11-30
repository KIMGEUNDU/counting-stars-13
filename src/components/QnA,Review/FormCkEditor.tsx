import { useForm } from '@/store/useForm';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

function FormCkEditor() {
  const { setContent } = useForm();

  return (
    <tr className="border-b border-gray-300">
      <td colSpan={2} className="bg-gray-50 p-3 w-full">
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: '내용을 입력하세요.',
          }}
          onChange={(_, editor) => {
            const text = editor.getData();
            const data = text.replace(/(<([^>]+)>)/gi, '');
            setContent(data);
          }}
        />
      </td>
    </tr>
  );
}

export default FormCkEditor;
