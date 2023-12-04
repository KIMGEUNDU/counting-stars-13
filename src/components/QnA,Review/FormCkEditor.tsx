import { useForm } from '@/store/useForm';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import { useRef } from 'react';

function FormCkEditor() {
  const { content, setContent, setAttachFile } = useForm();
  const editorRef = useRef<Editor | null>(null);

  const onChange = () => {
    const src = content.match(/src="([^"]+)"/);

    if (editorRef && editorRef.current) {
      const content = editorRef.current.getInstance().getHTML();
      const addClass = '300px';

      if (src) {
        setContent(content.replace('<img', `<img width="${addClass}"`));
        setAttachFile(src[1]);
      } else {
        setContent(content);
      }
    }
  };

  return (
    <tr className="border-b border-gray-300">
      <td colSpan={2} className="edit_wrap bg-gray-50 py-5 w-full">
        <Editor
          initialValue=" "
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          hideModeSwitch={true}
          plugins={[colorSyntax]}
          language="ko-KR"
          ref={editorRef}
          onChange={onChange}
        />
      </td>
    </tr>
  );
}

export default FormCkEditor;
