import parse from 'html-react-parser';
import { isValidElement } from 'react'

const MultiLineText = (({text}) => {
    if (isValidElement(text)) return <p>{text}</p>
    if (!text) return <p></p>

    text = text.replaceAll("\n", '<br>')
    return <p>{parse(`${text}`)}</p>
})

export default MultiLineText