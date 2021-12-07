import React from 'react';
import ReactQuill from 'react-quill';

const Quill =({body,setBody}) =>{
    const modules = {
		toolbar: [
            [ { header: [ 1, 2, false ] } ],           
            [ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
            [{ 'script': 'sub'}, { 'script': 'super' }],
			[ { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' } ],
            [ 'link' ],
            [ 'image' ],
			[ 'clean' ],
			[ 'code' ],
        ],
       
    };
    const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
        'blockquote',
        'script',
		'list',
		'bullet',
		'indent',
        'link',
        'image',
		'code'
    ];
    return (
		<ReactQuill
			value={body}
			onChange={newBody => {
				setBody(newBody);
			}}
			modules={modules}
			formats={formats}			
            preserveWhitespace={true}
            bounds={'.ql-editor'}
			placeholder="Add post content"
		/>
	);
}
export default Quill;