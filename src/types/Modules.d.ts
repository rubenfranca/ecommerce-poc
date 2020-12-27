declare module 'ckeditor4-react' {
  import * as React from 'react';

  export interface CKEditorProps {
    data?: string;
    onChange: (e) => void;
  }

  export default class CKEditor extends React.Component<CKEditorProps, any> {}
}
