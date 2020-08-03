import React, { useState } from 'react'
import { gql} from '@apollo/client'
import { cloneDeep } from '@apollo/client/utilities'
import {client} from '../../../utils/networking'


const CategoriesTable = (props : {initialData : {[key : string] : string[]}}) => {
    
    const [data , setData] = useState(props.initialData)
    const [addCategoryVisible, setAddCategoryVisible] = useState(false)
    const [newCategoryValue, setNewCategoryValue] = useState('')

    const [addKeywordVisible, setAddKeywordVisible] = useState('')
    const [newKeywordValue, setNewKeywordValue] = useState('')

    const addCategory = (e : React.FormEvent<EventTarget>) => {
        e.preventDefault()
        client.query({
            query: gql`
                query($category : String) {
                    keywords(category : $category)
                }`, variables : {category : newCategoryValue}
            }).then(response => {
                let dataBuffer = cloneDeep(data)
                dataBuffer[newCategoryValue] = response.data.keywords
                setData(dataBuffer)
                setAddCategoryVisible(false)
                setNewCategoryValue('')
            })
    }

    const removeCategory = (category : string) => {
        let dataBuffer = cloneDeep(data)
        delete dataBuffer[category]
        setData(dataBuffer)
    }

    const addKeyword = (e : React.FormEvent<EventTarget>) => {
        e.preventDefault()
        let dataBuffer = cloneDeep(data)
        dataBuffer[addKeywordVisible].push(newKeywordValue)
        setNewKeywordValue('')
        setAddKeywordVisible('')
        setData(dataBuffer)
    }

    const deleteKeyword = (category : string, index : number) => {
        let dataBuffer = cloneDeep(data)
        dataBuffer[category].splice(index , 1)
        setData(dataBuffer)
    }

    return(
        <div className='CategoriesTable'>
            <table>
				<thead>
					<tr className='CategoriesTable--HeadingRow'>
						<td><p>Categories</p></td>
						<td><p>Keywords</p></td>
					</tr>
				</thead>
				
                {
                    <tbody>
                        {Object.keys(data).map((category : string, index : number) => 
                            <tr key={index}>
                                <td className='CategoriesTable--CategoryCells'>
                                    <p className='CategoriesTable--RemoveCategory' onClick={()=>removeCategory(category)}>-</p>
                                    {category.toUpperCase()}
                                </td>
                                <td className='CategoriesTable--KeywordCells'>
                                    {
                                        data[category].map((keyword : string, index : number) => 
                                        <div key={index}>
                                            <p>{keyword}</p>
                                            <p className='DeleteIndicator' onClick={()=>deleteKeyword(category, index)}> - </p>
                                            <p>{(index + 1 !== data[category].length) && ', '}</p>
                                        </div>)
                                    }
                                </td>
                                <td>
                                    {
                                        addKeywordVisible !== category ? 
                                        <p className='CategoriesTable--AddButton' onClick={()=>setAddKeywordVisible(category)}>+ Add keyword</p> :
                                        <form
                                            className='CategoriesTable--AddCategoryForm' 
                                            onSubmit={addKeyword}>
                                            <input autoFocus
                                                type="text" 
                                                value={newKeywordValue}
                                                onBlur={()=>setAddKeywordVisible('')}
                                                onChange={(e)=>setNewKeywordValue(e.target.value)}/>
                                        </form>
                                    }
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan={2}>
                                {
                                    !addCategoryVisible ? <p className='CategoriesTable--AddButton' onClick={()=>setAddCategoryVisible(true)}>+ Add category</p> :
                                    <form
                                        className='CategoriesTable--AddCategoryForm' 
                                        onSubmit={addCategory}>
                                        <input autoFocus
                                            type="text" 
                                            value={newCategoryValue}
                                            onBlur={()=>setAddCategoryVisible(false)}
                                            onChange={(e)=>setNewCategoryValue(e.target.value)}/>
                                    </form>
                                    
                                }
                            </td>
                        </tr>
                    </tbody>
                }
				
			</table>
        </div>
    )
}

export {CategoriesTable}