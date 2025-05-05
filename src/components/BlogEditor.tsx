import { useRef, useState, useEffect } from "react";
import TurndownService from "turndown";
import ReactMarkdown from "react-markdown";
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header';
// import LinkTool from '@editorjs/link';
import EditorjsList from '@editorjs/list';
// import SimpleImage from "@editorjs/simple-image";
import Quote from '@editorjs/quote';


export default function BlogEditor({ col_id }) {

    const ejInstance = useRef()
    useEffect(() => {
        ejInstance.current = new EditorJS({
            tools: {
                header: {
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                },
                // linkTool: {
                //     class: LinkTool,
                //     shortcut:'CMD+SHIFT+L',
                // },
                list: {
                    class: EditorjsList,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                // image: SimpleImage,
                // quote: {
                //     class: Quote,
                //     inlineToolbar: true,
                //     shortcut: 'CMD+SHIFT+O',
                //     config: {
                //         quotePlaceholder: 'Enter a quote',
                //         captionPlaceholder: 'Quote\'s author',
                //     },
                // }
            },
            placeholder: "Start writing your blog post...."
        });


    }, [])

    const handleSave = async (e) => {
        const token = localStorage.getItem('token')
        const outputData = await ejInstance.current.save()
        const title = document.getElementById("title").value
        const description = document.getElementById("description").value
        const buttonType = e.target.innerText
        let payload
        if (buttonType === 'Publish') {
            payload = {
                title,
                description,
                content: outputData,
                status: 'Publish'
            }
        } else if (buttonType === 'Save as Draft') {
            payload = {
                title,
                description,
                content: outputData,
                status: 'Draft'
            }
        }
        console.log("payload: ", payload)
        const res = await fetch(`http://localhost:8000/blog/createBlog/${col_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        })

        // const res = await axios.post(`http://localhost:8000/blog/createBlog/${col_id}`, {
        //     "Title" : payload.title,
        //     "Descrition":payload.descrition,
        //     "Content":payload.content,
        //     "Status":payload.status
        // }, {
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     }
        // })
        const blogData = await res.json()
        console.log("blogData: ", blogData)
    }


    // const editor = new EditorJS({
    //     tools: {
    //         header: {
    //             class: Header,
    //             shortcut: 'CMD+SHIFT+H',
    //         },
    //         // linkTool: {
    //         //     class: LinkTool,
    //         //     shortcut:'CMD+SHIFT+L',
    //         // },
    //         list: {
    //             class: EditorjsList,
    //             inlineToolbar: true,
    //             config: {
    //                 defaultStyle: 'unordered'
    //             }
    //         },
    //         // image: SimpleImage,
    //         quote: {
    //             class: Quote,
    //             inlineToolbar: true,
    //             shortcut: 'CMD+SHIFT+O',
    //             config: {
    //                 quotePlaceholder: 'Enter a quote',
    //                 captionPlaceholder: 'Quote\'s author',
    //             },
    //         }
    //     }
    // });
    // const editorRef = useRef(null);
    // const [markdown, setMarkdown] = useState("");
    // const [showPreview, setShowPreview] = useState(false);

    // const formatText = (command) => {
    //     document.execCommand(command, false, null);
    //     editorRef.current.focus();
    // };

    // const handleAction = (type) => {
    //     const titleInput = document.getElementById("title") as HTMLInputElement;
    //     const title = titleInput.value;
    //     const descInput = document.getElementById("description") as HTMLInputElement;
    //     const description = descInput.value;
    //     const content = editorRef.current.innerHTML;

    //     if (type === "markdown") {
    //         const turndownService = new TurndownService();
    //         const md = turndownService.turndown(content);
    //         setMarkdown(`# ${title}\n\n${description}\n\n${md}`);
    //         setShowPreview(true);
    //     } else {
    //         console.log({ type, title, description, content });
    //         setShowPreview(false);
    //     }
    // };

    return (
        <div className="max-w-3xl mx-auto p-6 text-black bg-white shadow rounded-xl mt-10">
            <h1 className="text-2xl font-bold mb-4">Blog Post Title</h1>
            <input
                id="title"
                type="text"
                placeholder="Enter blog title..."
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="font-medium">Description</label>
            <textarea
                id="description"
                placeholder="Write a short description..."
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <div id="editorjs" className="border min-h-[200px] p-4 mb-4"></div>
            <button
                onClick={handleSave}
                className="px-4 py-2 mr-2 bg-blue-600 text-white rounded"
            >
                Publish
            </button>
            <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Save as Draft
            </button>


            {/* <div className="mb-2 space-x-2">
                <button onClick={() => formatText("bold")} className=" hover:cursor-pointer font-bold px-2">B</button>
                <button onClick={() => formatText("italic")} className="hover:cursor-pointer italic px-2">I</button>
                <button onClick={() => formatText("underline")} className=" hover:cursor-pointer underline px-2">U</button>
                <button onClick={() => formatText("insertUnorderedList")} className="hover:cursor-pointer px-2">• List</button>
                <button onClick={() => formatText("justifyLeft")} className="hover:cursor-pointer px-2">Left</button>
            </div> */}

            {/* <div
                ref={editorRef}
                contentEditable
                className="w-full min-h-[150px] border border-gray-300 p-3 rounded mb-4 focus:outline-none"
            >
                Start writing your blog post here...
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
                <button onClick={() => handleAction("draft")} className="px-4 py-2 border rounded hover:bg-gray-100">
                    Save as Draft
                </button>
                <button onClick={() => handleAction("publish")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Publish
                </button>
                <button onClick={() => handleAction("discard")} className="px-4 py-2 border rounded hover:bg-gray-100">
                    Discard
                </button>
                <button onClick={() => handleAction("markdown")} className="px-4 py-2 border border-green-500 text-green-600 rounded hover:bg-green-50">
                    Export as Markdown
                </button>
            </div> */}

            {/* {showPreview && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Markdown Preview</h2>
                    <div className="prose border border-gray-200 rounded p-4 bg-gray-50">
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </div>
                </div>
            )} */}
        </div>
    );
}
