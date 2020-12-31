import React from 'react'



const TagItem = ({ tag, index, removeTag, optionIdx }) => {

    return ( 
        <li data-idx={index} data-optionidx={optionIdx}>
            <span onClick={removeTag} >X</span>
            {tag}
        </li>

    )

}



export default TagItem