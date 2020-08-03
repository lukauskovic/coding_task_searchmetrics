import React from 'react'
import { CategoriesTable } from 'UI/components/CategoriesTable/CategoriesTable'
import { gql, useQuery } from '@apollo/client'
import { LoadingOverlay } from 'UI/components/LoadingOverlay/LoadingOverlay'

const AppFrame = () => {

	const INIT_CATEGORIES = gql`
    query {
        initKeywords
	}`
	
	const { loading, error, data } = useQuery(INIT_CATEGORIES)

    if(error) return (
        <div>error</div>
    )
    else if (loading) return(
		<div>
			<LoadingOverlay/>
		</div>
        
    )

	return (
		<div className='AppFrame'>
			<p className='AppFrame--Title'>Keyword Manager</p>
			<CategoriesTable initialData={data.initKeywords}/>
		</div>
	)
}

export { AppFrame }
