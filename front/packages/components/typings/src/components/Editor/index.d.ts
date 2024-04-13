import { IDomEditor } from '@wangeditor/editor';
import Editor from './src/Editor.vue';
export interface EditorExpose {
    getEditorRef: () => Promise<IDomEditor>;
}
export { Editor };
