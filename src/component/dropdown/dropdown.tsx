import React, { ChangeEventHandler } from 'react'
import { firstLetterUpperCase } from '../../helper/helper'

const Dropdown = ({ option, onchange, defaultOption }: { option: string[], onchange: ChangeEventHandler<HTMLSelectElement>, defaultOption: string }) => {
    return (
        <select
            onChange={onchange}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
            <option value="">{defaultOption}</option>
            {option.map((e) => <><option value={e}>{firstLetterUpperCase(e)}</option></>)}
        </select>
    )
}

export default Dropdown
