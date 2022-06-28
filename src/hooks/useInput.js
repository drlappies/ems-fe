import { useState } from 'react'

function useInput(initialValue = "") {
    const [value, setValue] = useState(initialValue)

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const resetValue = (value = "") => {
        setValue(value)
    }

    return [value, handleChange, resetValue]
}

export default useInput