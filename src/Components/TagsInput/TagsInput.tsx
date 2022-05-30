import React, {FunctionComponent, useState} from "react";
import './TagsInput.scss'
import {write} from "fs";

interface TagsInputProps {
    initialTags: string[];
}

export const TagsInput: FunctionComponent<TagsInputProps> = ({initialTags}) => {
    const [value, setValue] = useState<string>('')
    const [tags, setTags] = useState<Array<string>>(initialTags)
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value
        if (!value.includes(',')) {
            setValue(value)
            return
        }
        const values = value.split(',')
        const lastValue = values.pop()

        setValue(lastValue || '')
        setTags(prevState => [...prevState, ...values.filter(tag => prevState.includes(tag))])
    }

    const handleDelete = (tagToDelete: string) => {
        setTags(prevState => prevState.filter(tag => tag !== tagToDelete))
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const isEnter = event.key === 'Enter'

        if (!isEnter || value === '') return
        setTags(prevState => prevState.includes(value) ? [...prevState] : [...prevState, value])
        setValue('')
    }

    return <div className='tags-input'>
        {
            tags.map(tag => {
                return (
                    <div className='tags-input__item'>
                        {tag}

                        <span onClick={() => handleDelete(tag)}>&#215;</span>
                    </div>
                )

            })
        }
        <div className='tags-input__input-wrapper'>
            <input className='tags-input__input' type="text"
                   value={!isFocused && !value ? 'write some tags' : value}
                   onChange={handleChange}
                   onKeyDown={handleKeyDown}
                   onFocus={() => setIsFocused(true)}
                   onBlur={() => setIsFocused(false)}
            />
        </div>
    </div>
}