import { useForm } from '@/store/useForm';
import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import axiosInstance, { axiosBase } from '@/utils/axiosInstance';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import 'tui-color-picker/dist/tui-color-picker.css';

function FormCkEditor({ type }: { type?: string }) {
  const { content, setContent, setAttachFile } = useForm();
  const editorRef = useRef<Editor | null>(null);
  const { userInfo, setUserInfo } = useUserInfo();
  const [view, setView] = useState(false);

  // 사진은 한개만 업로드된다는 안내문
  const noticeImageUpload = () => {
    toast('사진은 최대 1개만 업로드 가능합니다 : )', {
      icon: '📷',
      duration: 2000,
    });
  };

  // 사진 변경
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
      const res = await axiosInstance.get(`/users/${AUTH_ID()}`);

      setUserInfo(res.data.item);
    }

    if (AUTH_ID()) {
      getUsers();
    }
  }, [setUserInfo]);

  // 수정페이지 콘텐츠 가져오기
  useEffect(() => {
    if (type === '수정') {
      editorRef.current?.getInstance().setMarkdown(content);
      setView(true);
    }
  }, [content, type]);

  // 이미지버튼 가져오기
  useEffect(() => {
    const imageUploadButton = document.querySelector(
      '.image.toastui-editor-toolbar-icons'
    );

    imageUploadButton?.addEventListener('click', noticeImageUpload);
  }, []);

  return (
    <tr className="border-b border-gray-300">
      <td colSpan={2} className="edit_wrap bg-gray-50 py-5 w-full">
        {!type && (
          <Editor
            placeholder={
              userInfo?.type === 'admin'
                ? '마크다운 문법으로 작성해주세요 : )'
                : location.href.includes('review')
                ? '⚠️ 리뷰 작성 후 수정 및 삭제가 불가능합니다'
                : '내용을 적어주세요 ☺️'
            }
            initialValue=" "
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

                    const res = await axiosBase.post(`/files`, formData);

                    const imageName = res.data.file.name;
                    const imagePath = res.data.file.path;

                    const imageUrl = `https://snack-for-your-pet-counting-stars.koyeb.app/api/${imagePath}`;

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
        )}
        {view && (
          <Editor
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

                    const res = await axiosBase.post(`/files`, formData);

                    const imageName = res.data.file.name;
                    const imagePath = res.data.file.path;
                    // TODO: 이건 확인해봐야함
                    const imageUrl = `https://snack-for-your-pet-counting-stars.koyeb.app/${imagePath}`;

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
        )}
      </td>
    </tr>
  );
}

export default FormCkEditor;
