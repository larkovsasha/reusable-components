import React from 'react';
import {TagsInput} from "./Components/TagsInput/TagsInput";
const tags = ['1','2']
function App() {
    return <div>
        <TagsInput initialTags={tags}/>
    </div>;
}

export default App;
