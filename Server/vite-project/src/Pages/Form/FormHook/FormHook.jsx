import {useState} from "react";

const useInputValidation = (validateValue) => {
    const [userInputValue, setUserInputValue] = useState();
    const [clicked, setClicked] = useState(false);
    const inputValueIsValid = validatevalue(userInputValue)
    const error = !inputValueIsValid && clicked;

    const userInputValueChange = (event) => {
        setUserInputValue(event.target.value)
    }

    const clickedChange = (Event) => {
        setClicked(Event);
    }

    const reset = () => {
        setUserInputValue('');
        setClicked(false);
    }

    return {
        value: inputValueIsValid, valid: inputValueIsValid, error, userInputChange: userInputValueChange, clickedChange, reset
    }
}

export default useInputValidation;