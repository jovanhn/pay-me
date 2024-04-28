import {
    Button,
    Form,
    FormGroup,
    FormItem,
    Input,
    InputType,
    Select,
    Option,
    Text,
    Ui5CustomEvent, InputDomRef, SelectDomRef
} from "@ui5/webcomponents-react";
import {SelectChangeEventDetail} from "@ui5/webcomponents/dist/Select.js";
import {useReducer} from "react";
import {StandardFieldProps} from "../../interfaces/properties.tsx";
import {UserProfile} from "../../interfaces/entities.tsx";
import {UserInfoReducerParams} from "../../interfaces/parameters.tsx";


const StandardField = ({editMode, value, inputType = InputType.Text, onInput, ...rest}: StandardFieldProps) => {
    if (editMode) {
        return <Input value={value} style={{width: '100%'}} type={inputType} onInput={onInput} {...rest} />;
    }
    return <Text {...rest}>{value}</Text>;
};


const reducer = (state: UserProfile, {group, field, value}: UserInfoReducerParams): UserProfile => {
    let updatedState = {...state}
    switch (group) {
        case 'general':
            updatedState = {...state, generalInfo: {...state.generalInfo, [field]: value}}
            break
        case 'bank':
            updatedState = {...state, bankInfo: {...state.bankInfo, [field]: value}}

    }
    return updatedState
};

const sampleUser: UserProfile = {
    generalInfo: {
        name: 'John Doe',
        country: 'Serbia',
        city: 'Belgrade',
        street: 'Bul. Kralja Aleksandra 18',
        mail: 'john.doe@gmail.com',
    },
    bankInfo: {
        name: 'Mobi',
        account_number: '160-12387812325456-12',
    }
}

const supportedBanks: string[] = ['None', 'Mobi', 'Intesa', 'NLB']

const UserProfileDetailsForm = () => {
    const [editMode, toggleEditMode] = useReducer((prev) => !prev, false, undefined);
    const [formState, dispatch] = useReducer(
        reducer,
        sampleUser,
        undefined
    );
    const {generalInfo, bankInfo} = formState;

    const handleInput = (e: Ui5CustomEvent<InputDomRef> | Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        dispatch({
            group: Object.keys(e.target.dataset)[0],
            field: Object.keys(e.target.dataset)[1],
            value: e.target.value
        });
    };

    return (
        <>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <FormGroup titleText="General Info">
                    <FormItem label="Name">
                        <StandardField editMode={editMode} value={generalInfo.name} onInput={handleInput} data-general
                                       data-name/>
                    </FormItem>
                    <FormItem label="Country">
                        <StandardField editMode={editMode} value={generalInfo.country} onInput={handleInput}
                                       data-general data-country/>
                    </FormItem>
                    <FormItem label="City">
                        <StandardField editMode={editMode} value={generalInfo.city} onInput={handleInput} data-general
                                       data-city/>
                    </FormItem>
                    <FormItem label="Street">
                        <StandardField editMode={editMode} value={generalInfo.street} onInput={handleInput} data-general
                                       data-street/>
                    </FormItem>

                    <FormItem label="Email">
                        <StandardField
                            editMode={editMode}
                            value={generalInfo.mail}
                            inputType={InputType.Email}
                            onInput={handleInput}
                            data-email
                        />
                    </FormItem>
                </FormGroup>
                <FormGroup titleText="Bank Info">
                    <FormItem label="Bank Name">
                        {editMode ? (<Select onChange={handleInput} data-bank data-name value={bankInfo.name}>
                            {supportedBanks.map((bankName) =>
                                <Option key={bankName} selected={bankName === bankInfo.name}>
                                    {bankName}
                                </Option>)}
                        </Select>) : <Text>{bankInfo.name}</Text>}
                    </FormItem>
                    <FormItem label="Account Number">
                        <StandardField editMode={editMode} value={bankInfo.account_number} onInput={handleInput}
                                       data-bank data-account_number/>
                    </FormItem>
                </FormGroup>
            </Form>
            <Button onClick={toggleEditMode}
                    design={editMode ? "Emphasized" : "Default"}>{editMode ? 'Save Changes' : 'Edit User Info'}</Button>
            {editMode ?
                (<Button onClick={toggleEditMode} disabled={!editMode}>Cancel</Button>) : null}
        </>
    );
};

export default UserProfileDetailsForm