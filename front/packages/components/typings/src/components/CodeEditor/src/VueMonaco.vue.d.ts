declare const _default: import("vue").DefineComponent<{
    original: {
        type: StringConstructor;
    };
    value: {
        type: StringConstructor;
        required: true;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    language: {
        type: StringConstructor;
    };
    options: {
        type: ObjectConstructor;
    };
    amdRequire: {
        type: FunctionConstructor;
    };
    diffEditor: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    getMonaco: () => null;
    getEditor: () => null;
    getModifiedEditor: () => any;
    getOriginalEditor: () => any;
    initMonaco: (monaco: any) => void;
    focus: () => null;
    monacoRef: import("vue").Ref<null>;
    getModelMarkers: () => any;
}, any, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "editorWillMount" | "editorDidMount")[], "change" | "editorWillMount" | "editorDidMount", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    original: {
        type: StringConstructor;
    };
    value: {
        type: StringConstructor;
        required: true;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    language: {
        type: StringConstructor;
    };
    options: {
        type: ObjectConstructor;
    };
    amdRequire: {
        type: FunctionConstructor;
    };
    diffEditor: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onEditorWillMount?: ((...args: any[]) => any) | undefined;
    onEditorDidMount?: ((...args: any[]) => any) | undefined;
}, {
    theme: string;
    diffEditor: boolean;
}, {}>;
export default _default;
