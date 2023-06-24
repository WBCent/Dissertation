import {useState} from "react";

const useInputValidation = (validateValue, message) => {
    console.log("useInputValidation for", message);
    const [userInputValue, setUserInputValue] = useState('');
    const [clicked, setClicked] = useState(false);
    const inputValueIsValid = validateValue(userInputValue)
    const error = !inputValueIsValid && clicked;

    const userInputValueChange = (event) => {
        console.log("setUserInputValue",setUserInputValue);
        setUserInputValue(event.target.value)
    }

    const clickedChange = (Event) => {
        setClicked(Event);
    }

    const reset = () => {
        setUserInputValue('');
        setClicked(false);
    }

    const result = {
        value: inputValueIsValid, 
        valid: inputValueIsValid, 
        error: error, 
        userInputChange: userInputValueChange, 
        clickedChange:clickedChange, 
        reset: reset
    }
    console.log("useInputValidation", result);
    return result;
}

export default useInputValidation;