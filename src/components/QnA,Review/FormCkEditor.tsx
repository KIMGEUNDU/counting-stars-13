import { useForm } from '@/store/useForm';
import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import 'tui-color-picker/dist/tui-color-picker.css';

function FormCkEditor() {
  const { content, setContent, setAttachFile } = useForm();
  const editorRef = useRef<Editor | null>(null);
  const { userInfo, setUserInfo } = useUserInfo();

  const onChange = () => {
    if (editorRef && editorRef.current) {
      const content = editorRef.current.getInstance().getHTML();
      const removeImgTag = content.replace(/<img[^>]*>/g, '');

      setContent(removeImgTag);
    }
  };

  // 로그인유저정보 받아오기
  useEffect(() => {
    async function getUsers() {
      const res = await axios.get(`https://localhost/api/users/${AUTH_ID()}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      setUserInfo(res.data.item);
    }

    if (AUTH_ID()) {
      getUsers();
    }
  }, [setUserInfo]);

  return (
    <tr className="border-b border-gray-300">
      <td colSpan={2} className="edit_wrap bg-gray-50 py-5 w-full">
        <Editor
          initialValue={
            userInfo?.type === 'admin'
              ? '마크다운 문법으로 작성해주세요 : )'
              : content
          }
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          hideModeSwitch={true}
          plugins={[colorSyntax]}
          language="ko-KR"
          ref={editorRef}
          onChange={onChange}
          hooks={{
            addImageBlobHook(
              blob: Blob | File,
              callback: (url: string, alt: string) => void
            ) {
              const postImage = async () => {
                try {
                  const formData = new FormData();
                  formData.append('attach', blob);

                  const res = await axios.post(
                    `https://localhost/api/files`,
                    formData
                  );

                  const imageName = res.data.file.name;
                  const imagePath = res.data.file.path;
                  const imageUrl = `https://localhost:443${imagePath}`;

                  callback(imageUrl, imageName);
                  setAttachFile(imageUrl);
                } catch (error) {
                  console.error('이미지 업로드 중 오류 발생:', error);
                }
              };
              postImage();
            },
          }}
        />
      </td>
    </tr>
  );
}

export default FormCkEditor;
