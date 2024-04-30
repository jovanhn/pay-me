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
import {useEffect, useReducer, useState} from "react";
import {StandardFieldProps} from "../../interfaces/properties.tsx";
import {UserProfile} from "../../interfaces/entities.tsx";
import {UserInfoReducerParams} from "../../interfaces/parameters.tsx";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {useCurrentUser} from "../../auth/AuthProvider.tsx";
import {db} from "../../firebase.tsx";

const StandardField = ({editMode, value, inputType = InputType.Text, onInput, ...rest}: StandardFieldProps) => {
    if (editMode) {
        return <Input value={value} style={{width: '100%'}} type={inputType} onInput={onInput} {...rest} />;
    }
    return <Text {...rest}>{value}</Text>;
};


const updateState = (state: UserProfile, {group, field, value}: UserInfoReducerParams): UserProfile => {
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
    const [form, setForm] = useState<UserProfile>(sampleUser);
    const {generalInfo, bankInfo} = form;
    const {user} = useCurrentUser()

    const handleInput = (e: Ui5CustomEvent<InputDomRef> | Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        setForm(updateState(form, {
            group: Object.keys(e.target.dataset)[0],
            field: Object.keys(e.target.dataset)[1],
            value: e.target.value
        }))
    }

    const fetchUserInfo = async () => {

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data() as UserProfile);
            setForm(docSnap.data() as UserProfile)
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    const updateUserInfo = async () => {
        try {
            await setDoc(doc(db, "users", user.uid), form);
            console.log("Document written with ID: ");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

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
            {editMode ?
                (
                    <>
                        <Button
                            onClick={() => {
                                toggleEditMode()
                                updateUserInfo().then(() => {
                                    console.log("User info updated")
                                }).catch((e) => console.log(e)).finally(() => console.log('Finally'))
                            }}
                            design="Emphasized">
                            Save
                        </Button>
                        <Button onClick={toggleEditMode} disabled={!editMode}>
                            Cancel
                        </Button>
                    </>
                ) :
                <Button onClick={toggleEditMode} design="Default">
                    Edit User Info
                </Button>}
        </>
    );
};

export default UserProfileDetailsForm