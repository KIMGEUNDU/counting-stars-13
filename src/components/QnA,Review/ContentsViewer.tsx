import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

function ContentsViewer({ contents }: { contents: string | undefined }) {
  return <Viewer key={contents} initialValue={contents} />;
}

export default ContentsViewer;
