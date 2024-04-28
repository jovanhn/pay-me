import {InputDomRef, InputType, Ui5CustomEvent} from "@ui5/webcomponents-react";

export interface StandardFieldProps {
    editMode: boolean,
    value: string,
    inputType?: InputType,
    onInput: (e:Ui5CustomEvent<InputDomRef>)=> void
}