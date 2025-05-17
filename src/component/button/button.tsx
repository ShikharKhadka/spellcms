import React from 'react'

const Button = ({ title }: { title: string }) => {
    return (
        <button
            type="submit"
            className="mt-3 px-4 py-2 rounded w-full"
        >
            {title}
        </button>
    )
}

export default Button
