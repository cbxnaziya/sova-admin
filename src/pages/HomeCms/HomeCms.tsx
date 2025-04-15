import React, { useEffect, useState } from 'react';
import axios from 'axios';



// Type for section content map
type SectionMap = {
  [key: string]: string;
};

// API Response shape
interface CMSSection {
  section: string;
  content: string;
}

const HomeCMS: React.FC = () => {
  const [sections, setSections] = useState<SectionMap>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [editorData, setEditorData] = useState('');


  const handleSave = async (section: string): Promise<void> => {
    try {
      await axios.post('/api/cms/section', {
        section,
        content: sections[section],
      });
      alert(`${section} updated!`);
    } catch (err) {
      console.error(`Failed to save ${section}:`, err);
    }
  };

  const fetchData = async (): Promise<void> => {
    try {
      const res = await axios.get<CMSSection[]>('/api/cms/sections');
      const data: SectionMap = {};
      res.data.forEach((item) => {
        data[item.section] = item.content;
      });
      setSections(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching CMS sections:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // if (loading) return <p>Loading...</p>;
  return (
    <div className="p-4">
      {['hero', 'about', 'features', 'cta'].map((section) => (
        <div key={section} className="mb-8">
          <h2 className="text-xl font-bold capitalize">{section} Section</h2>

{/* 
<CKEditor
  editor={CustomEditor}
  data={sections[section] || ''}
  onChange={(_, editor) => {
    const data = editor.getData();
    setSections(prev => ({ ...prev, [section]: data }));
  }}
/> */}

{/* <CKEditor
  editor={ClassicEditor as unknown as { create(...args: any): Promise<Editor> }}
  data="<p>Type something here...</p>"
  onReady={(editor) => {
    console.log('Editor is ready to use!', editor);
  }}
  onChange={(event, editor) => {
    const data = editor.getData();
    console.log({ data });
  }}
/> */}
          <button
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
            onClick={() => handleSave(section)}
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
};

export default HomeCMS;
