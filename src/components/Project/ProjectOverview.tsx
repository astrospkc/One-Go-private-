import React from 'react'
import ProjectUsage from './ProjectUsage'
import ProjectActivity from './ProjectActivity'

const ProjectOverview = () => {
    return (
        <div>
            <div className='flex flex-row'>
                <div className='flex-1'><ProjectUsage /></div>
                <div className='flex-1'><ProjectActivity /></div>
            </div>
        </div>
    )
}

export default ProjectOverview
