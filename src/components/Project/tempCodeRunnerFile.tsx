<div className=' flex flex-col gap-4 w-1/2 p-4 m-2  rounded-2xl h-full '>
    <div className='shadow-md shadow-[#5D3871]/80 p-4 rounded-2xl'>
        <h1>Basic Details</h1>
        <input type="text" placeholder='Project Name' className='w-full rounded-2xl p-2 my-2 border-2 border-[#5D3871]/80' />
        <textarea placeholder='Project Short Description' className='w-full rounded-2xl p-2 my-2 border-2 border-[#5D3871]/80' />
        <input type="text" placeholder='Tags/Skills Used eg. if you are a web developer then you can write React, Nextjs, Tailwindcss' className='w-full rounded-2xl p-2 my-2 border-2 border-[#5D3871]/80' />
    </div>
    <div className='shadow-sm shadow-slate-800 p-4 rounded-2xl'>
        <h1>Content Uploads:</h1>
        <input type="file" placeholder='File Upload' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
        {/* <input type="file" placeholder='Image Upload' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' /> */}
        <input type="text" placeholder='Video/demo link' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
        <input type="text" placeholder='Github/Repo Link' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
        <input type="text" placeholder='Live Project Url' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
        <input type="text" placeholder='Blog/Article Link' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
    </div>

    <div>
        <h1>Optional Details</h1>
        <input type="text" placeholder='Team Members/Collaborators (name + role)' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
        <input type="date" placeholder='date' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
        <input type="text" placeholder='Tech Stack' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />

    </div>
</div>