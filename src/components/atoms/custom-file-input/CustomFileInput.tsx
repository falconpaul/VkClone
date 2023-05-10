import React from "react"
import { useRef } from "react"

type Props = {
    onChange: (file: File) => void
    children: JSX.Element
}

const CustomFileInput: React.FC<Props> = ({ onChange, children }) => {
    const fileRef = useRef<HTMLInputElement | null>(null)
    return <>
        <input
            ref={fileRef}
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
                if (e.currentTarget.files) {
                    onChange(e.currentTarget.files[0])
                }
                if (!fileRef.current) return
                fileRef.current.value = ''
            }}
        />
        {React.cloneElement(
            children,
            { onClick: () => fileRef.current?.click() }
        )}
    </>
}
export default CustomFileInput
